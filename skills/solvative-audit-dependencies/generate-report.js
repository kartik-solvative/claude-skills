#!/usr/bin/env node
/**
 * Dependency Security Audit Report Generator
 * Parses npm/pnpm/yarn/bun audit output and generates a shareable PDF report.
 *
 * Usage:
 *   node generate-report.js --input <file> --format <npm|pnpm|yarn-v1|yarn-berry|bun> \
 *                           [--project "My App"] [--output ./report.pdf]
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// ─── CLI Args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const inputFile  = get('--input');
const format     = get('--format') || 'npm';
const projectName = get('--project') || path.basename(process.cwd());
const outputPath = get('--output') || './security-audit-report.pdf';

if (!inputFile || !fs.existsSync(inputFile)) {
  console.error('Error: --input <file> is required and must exist.');
  process.exit(1);
}

const rawContent = fs.readFileSync(inputFile, 'utf8').trim();

// ─── Severity Order ───────────────────────────────────────────────────────────

const SEVERITY_ORDER = ['critical', 'high', 'moderate', 'low', 'info'];
const SEVERITY_COLORS = {
  critical: { bg: '#fee2e2', border: '#dc2626', badge: '#dc2626', text: '#7f1d1d' },
  high:     { bg: '#ffedd5', border: '#ea580c', badge: '#ea580c', text: '#7c2d12' },
  moderate: { bg: '#fef9c3', border: '#ca8a04', badge: '#ca8a04', text: '#713f12' },
  low:      { bg: '#dbeafe', border: '#2563eb', badge: '#2563eb', text: '#1e3a8a' },
  info:     { bg: '#f3f4f6', border: '#6b7280', badge: '#6b7280', text: '#1f2937' },
};

// ─── Parsers ──────────────────────────────────────────────────────────────────

/** Normalize a vulnerability to a common shape */
function makeVuln({ id, pkg, severity, title, description, recommendation, fixAvailable, url, affectedVersions, cves, cvss }) {
  return {
    id: id || '',
    pkg: pkg || 'unknown',
    severity: (severity || 'info').toLowerCase(),
    title: title || 'Untitled',
    description: description || '',
    recommendation: recommendation || 'Update to a non-vulnerable version.',
    fixAvailable: fixAvailable ?? false,
    url: url || '',
    affectedVersions: affectedVersions || '',
    cves: Array.isArray(cves) ? cves : [],
    cvss: typeof cvss === 'number' ? cvss : null,
  };
}

function parseNpm(raw) {
  const data = JSON.parse(raw);
  const vulns = [];

  // npm v7+ format: data.vulnerabilities is a map of pkg → advisory details
  if (data.vulnerabilities) {
    for (const [pkg, info] of Object.entries(data.vulnerabilities)) {
      // Each pkg entry may have multiple "via" advisories
      const advisories = Array.isArray(info.via)
        ? info.via.filter(v => typeof v === 'object')
        : [];

      if (advisories.length === 0) {
        vulns.push(makeVuln({
          pkg,
          severity: info.severity,
          title: `Vulnerability in ${pkg}`,
          fixAvailable: !!info.fixAvailable,
          affectedVersions: info.range,
        }));
      } else {
        for (const adv of advisories) {
          vulns.push(makeVuln({
            id: adv.source ? String(adv.source) : '',
            pkg: adv.name || pkg,
            severity: adv.severity || info.severity,
            title: adv.title || `Vulnerability in ${pkg}`,
            description: adv.overview || '',
            recommendation: adv.recommendation || '',
            fixAvailable: !!info.fixAvailable,
            url: adv.url || '',
            affectedVersions: adv.vulnerable_versions || info.range || '',
            cves: adv.cves || [],
            cvss: adv.cvss ? adv.cvss.score : null,
          }));
        }
      }
    }
  }

  // npm v6 format: data.advisories is a map of id → advisory
  if (data.advisories) {
    for (const [id, adv] of Object.entries(data.advisories)) {
      vulns.push(makeVuln({
        id: String(id),
        pkg: adv.module_name,
        severity: adv.severity,
        title: adv.title,
        description: adv.overview,
        recommendation: adv.recommendation,
        fixAvailable: adv.patched_versions !== '<0.0.0',
        url: adv.url,
        affectedVersions: adv.vulnerable_versions,
        cves: adv.cves || [],
        cvss: adv.cvss_score || null,
      }));
    }
  }

  const meta = data.metadata || {};
  const counts = meta.vulnerabilities || {};
  return { vulns, counts };
}

function parsePnpm(raw) {
  // pnpm uses same JSON shape as npm
  return parseNpm(raw);
}

function parseYarnV1(raw) {
  // yarn v1 outputs NDJSON — one JSON object per line
  const lines = raw.split('\n').filter(Boolean);
  const vulns = [];
  let counts = {};

  for (const line of lines) {
    let obj;
    try { obj = JSON.parse(line); } catch { continue; }

    if (obj.type === 'auditAdvisory') {
      const adv = obj.data.advisory;
      vulns.push(makeVuln({
        id: String(adv.id),
        pkg: adv.module_name,
        severity: adv.severity,
        title: adv.title,
        description: adv.overview,
        recommendation: adv.recommendation,
        fixAvailable: adv.patched_versions !== '<0.0.0',
        url: adv.url,
        affectedVersions: adv.vulnerable_versions,
        cves: adv.cves || [],
        cvss: adv.cvss ? adv.cvss.score : null,
      }));
    }

    if (obj.type === 'auditSummary') {
      counts = obj.data.vulnerabilities || {};
    }
  }

  return { vulns, counts };
}

function parseYarnBerry(raw) {
  // yarn v2+ --json outputs a single JSON object
  const data = JSON.parse(raw);
  // Shape is similar to npm v7
  return parseNpm(JSON.stringify(data));
}

function parseBun(raw) {
  // bun audit has no JSON support — parse text output
  const vulns = [];
  const lines = raw.split('\n');
  let current = null;

  for (const line of lines) {
    const sevMatch = line.match(/^(critical|high|moderate|low|info)\s+(.+)/i);
    if (sevMatch) {
      if (current) vulns.push(makeVuln(current));
      current = { severity: sevMatch[1].toLowerCase(), pkg: sevMatch[2].trim(), title: sevMatch[2].trim() };
    } else if (current && line.trim()) {
      current.description = (current.description || '') + ' ' + line.trim();
    }
  }
  if (current) vulns.push(makeVuln(current));

  const counts = {};
  for (const v of vulns) counts[v.severity] = (counts[v.severity] || 0) + 1;
  return { vulns, counts };
}

// ─── Parse Based on Format ────────────────────────────────────────────────────

let parsed;
try {
  switch (format) {
    case 'yarn-v1':   parsed = parseYarnV1(rawContent); break;
    case 'yarn-berry': parsed = parseYarnBerry(rawContent); break;
    case 'pnpm':      parsed = parsePnpm(rawContent); break;
    case 'bun':       parsed = parseBun(rawContent); break;
    default:          parsed = parseNpm(rawContent);
  }
} catch (e) {
  console.error('Failed to parse audit output:', e.message);
  process.exit(1);
}

const { vulns, counts } = parsed;

// Deduplicate by (pkg + title)
const seen = new Set();
const uniqueVulns = vulns.filter(v => {
  const key = `${v.pkg}::${v.title}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// Group by severity
const grouped = {};
for (const sev of SEVERITY_ORDER) grouped[sev] = [];
for (const v of uniqueVulns) {
  const sev = SEVERITY_ORDER.includes(v.severity) ? v.severity : 'info';
  grouped[sev].push(v);
}

const totalCount = uniqueVulns.length;

// ─── HTML Generation ──────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function severityBadge(sev) {
  const c = SEVERITY_COLORS[sev] || SEVERITY_COLORS.info;
  return `<span style="background:${c.badge};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">${escapeHtml(sev)}</span>`;
}

function vulnCard(v) {
  const c = SEVERITY_COLORS[v.severity] || SEVERITY_COLORS.info;
  const cveList = v.cves.length ? `<div style="margin-top:6px;font-size:12px;color:#6b7280">CVE: ${v.cves.map(escapeHtml).join(', ')}</div>` : '';
  const cvssStr = v.cvss != null ? `<span style="margin-left:12px;font-size:12px;color:#6b7280">CVSS: <strong>${v.cvss}</strong></span>` : '';
  const fixStr = v.fixAvailable
    ? `<span style="color:#16a34a;font-weight:600">✓ Auto-fix available</span>`
    : `<span style="color:#dc2626;font-weight:600">✗ Manual fix required</span>`;
  const urlStr = v.url ? `<a href="${escapeHtml(v.url)}" style="font-size:12px;color:#2563eb">${escapeHtml(v.url)}</a>` : '';

  return `
    <div style="background:${c.bg};border-left:4px solid ${c.border};border-radius:6px;padding:16px;margin-bottom:12px;page-break-inside:avoid">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
        ${severityBadge(v.severity)}
        <strong style="font-size:15px;color:#111">${escapeHtml(v.pkg)}</strong>
        ${cvssStr}
      </div>
      <div style="font-size:14px;font-weight:600;color:${c.text};margin-bottom:6px">${escapeHtml(v.title)}</div>
      ${v.description ? `<div style="font-size:13px;color:#374151;margin-bottom:8px;line-height:1.5">${escapeHtml(v.description)}</div>` : ''}
      ${v.affectedVersions ? `<div style="font-size:12px;color:#6b7280;margin-bottom:4px">Affected versions: <code>${escapeHtml(v.affectedVersions)}</code></div>` : ''}
      ${v.recommendation ? `<div style="font-size:13px;margin-bottom:6px"><strong>Fix:</strong> ${escapeHtml(v.recommendation)}</div>` : ''}
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:8px">
        ${fixStr}
        ${urlStr}
      </div>
      ${cveList}
    </div>`;
}

function generateHtml() {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const summaryRows = SEVERITY_ORDER.map(sev => {
    const c = SEVERITY_COLORS[sev];
    const count = grouped[sev].length;
    return `<tr>
      <td style="padding:10px 16px">${severityBadge(sev)}</td>
      <td style="padding:10px 16px;text-align:center;font-size:20px;font-weight:700;color:${c.border}">${count}</td>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280">${
        sev === 'critical' ? 'Fix immediately — active exploit risk' :
        sev === 'high'     ? 'Fix this sprint' :
        sev === 'moderate' ? 'Fix within 30 days' :
        sev === 'low'      ? 'Fix at next opportunity' : 'Review, no direct exploit'
      }</td>
    </tr>`;
  }).join('');

  const sections = SEVERITY_ORDER.filter(sev => grouped[sev].length > 0).map(sev => {
    const c = SEVERITY_COLORS[sev];
    const cards = grouped[sev].map(vulnCard).join('');
    return `
      <div style="margin-bottom:32px">
        <h2 style="color:${c.border};border-bottom:2px solid ${c.border};padding-bottom:8px;margin-bottom:16px;text-transform:capitalize">
          ${sev} (${grouped[sev].length})
        </h2>
        ${cards}
      </div>`;
  }).join('');

  const noVulns = totalCount === 0
    ? `<div style="text-align:center;padding:48px;color:#16a34a;font-size:18px;font-weight:600">✓ No vulnerabilities found</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Audit Report — ${escapeHtml(projectName)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; background: #fff; padding: 40px; max-width: 960px; margin: 0 auto; }
    @media print { body { padding: 20px; } }
    code { font-family: 'SF Mono', Consolas, monospace; background: #f3f4f6; padding: 1px 4px; border-radius: 3px; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; }
    tr:nth-child(even) { background: #f9fafb; }
  </style>
</head>
<body>
  <div style="margin-bottom:32px;padding-bottom:24px;border-bottom:3px solid #111">
    <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Security Audit Report</div>
    <h1 style="font-size:28px;margin-bottom:4px">${escapeHtml(projectName)}</h1>
    <div style="color:#6b7280;font-size:14px">Generated on ${date} · ${totalCount} ${totalCount === 1 ? 'vulnerability' : 'vulnerabilities'} found</div>
  </div>

  <div style="margin-bottom:32px">
    <h2 style="margin-bottom:16px">Summary</h2>
    <table style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
      <thead style="background:#f9fafb">
        <tr>
          <th style="padding:10px 16px;text-align:left;font-size:13px;color:#6b7280;font-weight:600">Severity</th>
          <th style="padding:10px 16px;text-align:center;font-size:13px;color:#6b7280;font-weight:600">Count</th>
          <th style="padding:10px 16px;text-align:left;font-size:13px;color:#6b7280;font-weight:600">Recommended Action</th>
        </tr>
      </thead>
      <tbody>${summaryRows}</tbody>
    </table>
  </div>

  ${noVulns}
  ${sections}

  <div style="margin-top:48px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center">
    Generated by audit-dependencies Claude skill · ${date}
  </div>
</body>
</html>`;
}

// ─── PDF Generation ───────────────────────────────────────────────────────────

const htmlContent = generateHtml();
const htmlPath = path.join(os.tmpdir(), `audit-report-${Date.now()}.html`);
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

const pdfPath = outputPath.replace(/\.html$/, '') + (outputPath.endsWith('.pdf') ? '' : '.pdf');
const htmlOutputPath = pdfPath.replace(/\.pdf$/, '.html');

async function generatePdf() {
  // Try local puppeteer first, then global npx
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    try {
      // Try to use puppeteer via npx (downloads on first run)
      console.log('puppeteer not found locally — attempting via npx...');
      execSync('npx --yes puppeteer browsers install chrome', { stdio: 'inherit' });
      puppeteer = require(execSync('npx --yes --print puppeteer', { encoding: 'utf8' }).trim());
    } catch {
      puppeteer = null;
    }
  }

  if (puppeteer) {
    try {
      const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
      });
      await browser.close();
      fs.unlinkSync(htmlPath);
      return { type: 'pdf', path: pdfPath };
    } catch (e) {
      console.warn('PDF generation failed:', e.message);
    }
  }

  // Fallback: save HTML (user can print to PDF from browser)
  fs.copyFileSync(htmlPath, htmlOutputPath);
  fs.unlinkSync(htmlPath);
  return { type: 'html', path: htmlOutputPath };
}

(async () => {
  const result = await generatePdf();

  console.log('\n' + '─'.repeat(60));
  console.log('  DEPENDENCY SECURITY AUDIT REPORT');
  console.log('─'.repeat(60));
  console.log(`  Project : ${projectName}`);
  console.log(`  Total   : ${totalCount} vulnerabilities`);
  for (const sev of SEVERITY_ORDER) {
    const count = grouped[sev].length;
    if (count > 0) console.log(`  ${sev.padEnd(10)}: ${count}`);
  }
  console.log('─'.repeat(60));
  if (result.type === 'pdf') {
    console.log(`  PDF saved to: ${result.path}`);
  } else {
    console.log(`  HTML saved to: ${result.path}`);
    console.log('  Open in browser → File → Print → Save as PDF');
    console.log('  (Install puppeteer for automatic PDF: npm i -g puppeteer)');
  }
  console.log('─'.repeat(60) + '\n');
})();
