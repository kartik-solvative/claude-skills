// ══════════════════════════════════════════════════════════════════
// SOLVATIVE SOW TEMPLATE — Reference Implementation
// ══════════════════════════════════════════════════════════════════
// This is a complete working SOW generator. To create a new SOW:
// 1. Copy this file to /home/claude/generate-sow.js
// 2. Update all content sections with actual project data
// 3. Run: node /home/claude/generate-sow.js
// 4. Validate: python scripts/office/validate.py <output>.docx
//
// Key sections to customize:
// - Cover page metadata (client name, proposal ID, date)
// - Executive Summary paragraphs
// - EPICs table data
// - Sprint plan data (phases, weeks, EPIC groupings, tasks)
// - Gantt chart phases and week count
// - Resource allocation table
// - Prerequisites table
// - Pricing amounts (original, discount, total)
// - Payment schedule milestones
// - Out-of-scope items
// - Assumptions list
//
// DO NOT CHANGE: Color constants, helper functions, design layout,
// logo paths, table styling, header/footer structure.
// ══════════════════════════════════════════════════════════════════

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, ImageRun,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, TabStopType, TabStopPosition
} = require("docx");

// ── Load logos ──
// When using this template, update the path if the skill is installed elsewhere
const LOGO_PATH = "/mnt/skills/organization/create-solvative-sow/assets/solvative-logo.png";
const logoData = fs.readFileSync(LOGO_PATH);

// ── Solvative Brand Colors ──
const TEAL = "006D77";
const TEAL_DK = "015C65";
const DARK = "001D23";
const YELLOW = "FFC400";
const INK = "101828";
const GRAY = "344054";
const MUTED = "4B5563";
const TEAL_TINT = "E1F0F0";
const YELLOW_TINT = "FFF3CD";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F2F4F7";
const BORDER_GRAY = "D0D5DD";

// ── Reusable helpers ──
const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
};
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const headerCellMargins = { top: 80, bottom: 80, left: 100, right: 100 };

const PAGE_WIDTH = 12240; // US Letter
const PAGE_HEIGHT = 15840;
const MARGIN = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN; // 9360

function headerCell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: DARK, type: ShadingType.CLEAR },
    margins: headerCellMargins,
    verticalAlign: VerticalAlign.CENTER,
    ...opts,
    children: [new Paragraph({
      alignment: opts.alignment || AlignmentType.LEFT,
      children: [new TextRun({ text, bold: true, font: "Arial", size: 18, color: WHITE })]
    })]
  });
}

function bodyCell(text, width, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, font: "Arial", size: 18, color: opts.color || GRAY })];
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.shading || { fill: WHITE, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: VerticalAlign.CENTER,
    columnSpan: opts.columnSpan,
    children: [new Paragraph({
      alignment: opts.alignment || AlignmentType.LEFT,
      spacing: opts.spacing,
      children: runs
    })]
  });
}

function altRow(i) {
  return i % 2 === 0 ? { fill: WHITE, type: ShadingType.CLEAR } : { fill: LIGHT_GRAY, type: ShadingType.CLEAR };
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 28, color: DARK })]
  });
}

function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, font: "Arial", size: 24, color: TEAL })]
  });
}

function bodyPara(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, font: "Arial", size: 20, color: GRAY })];
  return new Paragraph({
    spacing: { after: 120, ...(opts.spacing || {}) },
    alignment: opts.alignment !== undefined ? opts.alignment : AlignmentType.BOTH,
    children: runs
  });
}

function tealDivider() {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: TEAL, space: 1 } },
    children: []
  });
}

// ══════════════════════════════════════════
// COVER PAGE
// ══════════════════════════════════════════
const coverPage = {
  properties: {
    page: {
      size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
      margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
    }
  },
  children: [
    new Paragraph({ spacing: { before: 600 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 80 },
      children: [new ImageRun({
        type: "jpg",
        data: logoData,
        transformation: { width: 220, height: 38 },
        altText: { title: "Solvative", description: "Solvative Logo", name: "solvative-logo" }
      })]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 20 },
      children: [new TextRun({ text: "5752 Grandscape Blvd, Suite 225, The Colony, TX 75056", font: "Arial", size: 16, color: MUTED })]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "(PH) 913.871.5154  |  contact@solvative.com  |  solvative.com", font: "Arial", size: 16, color: MUTED })
      ]
    }),
    tealDivider(),
    new Paragraph({ spacing: { before: 1200 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 40 },
      children: [new TextRun({ text: "STATEMENT OF WORK", bold: true, font: "Arial", size: 20, color: TEAL, allCaps: true })]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 },
      children: [new TextRun({ text: "EA+ Admin Portal Rewrite", bold: true, font: "Arial", size: 52, color: DARK })]
    }),
    new Paragraph({
      spacing: { after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL_TINT, space: 1 } },
      children: []
    }),
    new Paragraph({ spacing: { before: 200 }, children: [] }),
    // Meta info table
    new Table({
      width: { size: 5000, type: WidthType.DXA },
      columnWidths: [2000, 3000],
      rows: [
        new TableRow({ children: [
          new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Prepared for", font: "Arial", size: 18, color: MUTED })] })] }),
          new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Karthick Palaniswamy, AGIA", bold: true, font: "Arial", size: 18, color: INK })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Prepared by", font: "Arial", size: 18, color: MUTED })] })] }),
          new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Solvative LLC", bold: true, font: "Arial", size: 18, color: INK })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Proposal ID", font: "Arial", size: 18, color: MUTED })] })] }),
          new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "[PROPOSAL-ID]", bold: true, font: "Arial", size: 18, color: INK })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Date", font: "Arial", size: 18, color: MUTED })] })] }),
          new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "[DATE]", bold: true, font: "Arial", size: 18, color: INK })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Version", font: "Arial", size: 18, color: MUTED })] })] }),
          new TableCell({ borders: noBorders, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "1.0.0", bold: true, font: "Arial", size: 18, color: INK })] })] }),
        ]}),
      ]
    }),
    new Paragraph({ spacing: { before: 1400 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: "CONFIDENTIAL", bold: true, font: "Arial", size: 16, color: TEAL, allCaps: true })]
    }),
  ]
};

// ══════════════════════════════════════════
// MAIN CONTENT SECTIONS
// ══════════════════════════════════════════

// ── Document History ──
const docHistoryRows = [
  ["[DATE]", "0.1.0", "Initial Draft"],
  ["[DATE]", "1.0.0", "Finalized SOW with scope, pricing, timeline, and resource plan"],
];
const docHistoryTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [2000, 1500, 5860],
  rows: [
    new TableRow({ children: [
      headerCell("Date", 2000),
      headerCell("Version", 1500),
      headerCell("Changes", 5860),
    ]}),
    ...docHistoryRows.map((r, i) => new TableRow({ children: [
      bodyCell(r[0], 2000, { shading: altRow(i) }),
      bodyCell(r[1], 1500, { shading: altRow(i) }),
      bodyCell(r[2], 5860, { shading: altRow(i) }),
    ]})),
  ]
});

// ── Executive Summary ──
const execSummaryParas = [
  bodyPara([
    new TextRun({ text: "AGIA", bold: true, font: "Arial", size: 20, color: DARK }),
    new TextRun({ text: " is a private insurance company serving 30+ million members. Its ", font: "Arial", size: 20, color: GRAY }),
    new TextRun({ text: "EA+", bold: true, font: "Arial", size: 20, color: DARK }),
    new TextRun({ text: " product is a medical travel insurance offering that reaches approximately 12 million consumers through B2B partnerships with organizations including AAA and United Airlines.", font: "Arial", size: 20, color: GRAY }),
  ]),
  bodyPara([
    new TextRun({ text: "The EA+ admin portal is built on AngularJS 1.4.7, which reached end-of-support in December 2021. Because AngularJS and modern Angular are architecturally incompatible, this engagement is a ", font: "Arial", size: 20, color: GRAY }),
    new TextRun({ text: "full frontend rewrite", bold: true, font: "Arial", size: 20, color: DARK }),
    new TextRun({ text: " using React and Next.js, aligning with AGIA\u2019s internal technical preferences.", font: "Arial", size: 20, color: GRAY }),
  ]),
  bodyPara([
    new TextRun({ text: "Solvative will deliver a functionally equivalent, secure, and maintainable admin interface within ", font: "Arial", size: 20, color: GRAY }),
    new TextRun({ text: "12 weeks", bold: true, font: "Arial", size: 20, color: DARK }),
    new TextRun({ text: ", followed by 2 weeks of complimentary SolverCare post-launch support, for a total investment of ", font: "Arial", size: 20, color: GRAY }),
    new TextRun({ text: "$16,440", bold: true, font: "Arial", size: 20, color: TEAL }),
    new TextRun({ text: ".", font: "Arial", size: 20, color: GRAY }),
  ]),
];

// ── Scope of Work: EPICs Table ──
const epics = [
  ["E1", "Authentication & Navigation", "Session management, login, role-based access, app layout, sidebar navigation, and routing."],
  ["E2", "Client Management", "CRUD operations for client records, client detail views, and pre-trip planning (read-only, legacy data display)."],
  ["E3", "User Administration", "User listing, add/edit user accounts, user export functionality, and role management."],
  ["E4", "Push Notifications", "Notification management, blast scheduling, iOS and Android push certificate integration."],
  ["E5", "Newsletters & Email", "Newsletter creation and distribution, email template management (forgot password, service summaries, etc.)."],
  ["E6", "Content Management", "Static content management for EA+ mobile app, FAQ content management."],
  ["E7", "System & Monitoring", "System dashboard, log viewer, system settings display."],
  ["E8", "QA, UAT & Deployment", "End-to-end integration testing, UAT with AGIA stakeholders, production deployment to Azure, handoff documentation."],
];

const epicsTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [800, 2500, 6060],
  rows: [
    new TableRow({ children: [
      headerCell("EPIC", 800),
      headerCell("Name", 2500),
      headerCell("Description", 6060),
    ]}),
    ...epics.map((e, i) => new TableRow({ children: [
      bodyCell([new TextRun({ text: e[0], bold: true, font: "Arial", size: 18, color: TEAL })], 800, { shading: altRow(i) }),
      bodyCell([new TextRun({ text: e[1], bold: true, font: "Arial", size: 18, color: INK })], 2500, { shading: altRow(i) }),
      bodyCell(e[2], 6060, { shading: altRow(i) }),
    ]})),
  ]
});

// ── Sprint Plan: Grouped by EPIC within each Sprint ──
const TEAL_LIGHT = "E6F3F4";

const sprintPlan = [
  { sprint: "Prerequisites / Kick-Off", weeks: "Week 1", epics: [
    { epic: "Kick-Off Activities", tasks: [
      "AGIA provides complete API documentation for all backend endpoints",
      "Confirm staging environment ownership and arrange Solvative access",
      "Solvative sends AGIA written list of required artifacts: API specs, environment access, feature screenshots",
      "AGIA provides screenshots or guided walkthrough of portal features as needed",
    ]},
  ]},
  { sprint: "Technical Discovery", weeks: "Week 2", epics: [
    { epic: "Discovery Activities", tasks: [
      "Architecture review and API mapping against existing portal features",
      "Component inventory and feature prioritization",
      "Technical approach documentation and sprint plan finalization",
      "Staging environment validation and access confirmation",
    ]},
  ]},
  { sprint: "Sprint 1 \u2014 Foundation", weeks: "Weeks 3\u20134", epics: [
    { epic: "E1 \u2014 Authentication & Navigation", tasks: [
      "Next.js project scaffolding, toolchain setup, and CI/CD configuration",
      "Authentication and session management",
      "Navigation, layout, and routing",
    ]},
    { epic: "E2 \u2014 Client Management", tasks: [
      "Client record management (CRUD operations)",
    ]},
    { epic: "E3 \u2014 User Administration", tasks: [
      "User account administration and user export",
    ]},
  ]},
  { sprint: "Sprint 2 \u2014 Communications", weeks: "Weeks 5\u20136", epics: [
    { epic: "E4 \u2014 Push Notifications", tasks: [
      "Push notification management and blast scheduling",
      "iOS and Android push certificate integration",
    ]},
    { epic: "E5 \u2014 Newsletters & Email", tasks: [
      "Newsletter creation and distribution",
      "Email template management (forgot password, service summaries, etc.)",
    ]},
    { epic: "E6 \u2014 Content Management", tasks: [
      "Static content management for EA+ mobile app",
    ]},
  ]},
  { sprint: "Sprint 3 \u2014 Features & Integration", weeks: "Weeks 7\u20138", epics: [
    { epic: "E6 \u2014 Content Management", tasks: [
      "FAQ content management",
    ]},
    { epic: "E7 \u2014 System & Monitoring", tasks: [
      "System dashboard and log viewer",
    ]},
    { epic: "E2 \u2014 Client Management", tasks: [
      "Pre-trip planning module (read-only, data display only)",
    ]},
    { epic: "E8 \u2014 QA, UAT & Deployment", tasks: [
      "Full end-to-end integration testing against staging backend",
      "Bug resolution from Sprint 1\u20132 regression testing",
    ]},
  ]},
  { sprint: "Sprint 4 \u2014 UAT", weeks: "Weeks 9\u201310", epics: [
    { epic: "E8 \u2014 QA, UAT & Deployment", tasks: [
      "User Acceptance Testing (UAT) with AGIA stakeholders",
      "Bug fixes for issues identified during UAT",
      "QA sign-off report",
      "Developer documentation and deployment runbook",
    ]},
  ]},
  { sprint: "Sprint 5 \u2014 Production Deployment", weeks: "Weeks 11\u201312", epics: [
    { epic: "E8 \u2014 QA, UAT & Deployment", tasks: [
      "Production deployment to AGIA\u2019s Azure tenant, coordinated with vendor as needed",
      "Production environment validation and smoke testing",
      "DNS and environment cutover",
      "Knowledge transfer session with AGIA team",
    ]},
  ]},
  { sprint: "SolverCare \u2014 Post-Launch Support", weeks: "Weeks 13\u201314", epics: [
    { epic: "Complimentary Support", tasks: [
      "Priority bug fixes for production issues",
      "Performance monitoring and optimization",
      "Knowledge transfer and documentation updates as needed",
    ]},
  ]},
];

// Build sprint elements: heading + table per sprint
const sprintElements = [];
sprintPlan.forEach((s) => {
  // Subsection heading for this sprint
  sprintElements.push(new Paragraph({
    spacing: { before: 300, after: 100 },
    children: [
      new TextRun({ text: s.sprint, bold: true, font: "Arial", size: 22, color: DARK }),
      new TextRun({ text: "  \u2014  " + s.weeks, font: "Arial", size: 20, color: MUTED }),
    ]
  }));

  // Build table rows: EPIC sub-header + task rows
  const rows = [];
  // Table column header
  rows.push(new TableRow({ children: [
    headerCell("EPIC", 3200),
    headerCell("Task", 6160),
  ]}));

  let taskIndex = 0;
  s.epics.forEach((ep) => {
    // EPIC sub-header row
    rows.push(new TableRow({ children: [
      new TableCell({
        borders,
        width: { size: 3200, type: WidthType.DXA },
        shading: { fill: TEAL_LIGHT, type: ShadingType.CLEAR },
        margins: cellMargins,
        verticalAlign: VerticalAlign.CENTER,
        columnSpan: 2,
        children: [new Paragraph({ children: [new TextRun({ text: ep.epic, bold: true, font: "Arial", size: 18, color: TEAL_DK })] })],
      }),
      // Need a second cell even with columnSpan for some renderers
    ]}));

    // Task rows under this EPIC
    ep.tasks.forEach((t) => {
      rows.push(new TableRow({ children: [
        bodyCell("", 3200, { shading: altRow(taskIndex) }),
        bodyCell(t, 6160, { shading: altRow(taskIndex) }),
      ]}));
      taskIndex++;
    });
  });

  sprintElements.push(new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [3200, 6160],
    rows: rows,
  }));
});


// ── Gantt Chart (table-based) ──
const ganttPhases = [
  { name: "Prerequisites/Kick-Off",    bars: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Technical Discovery",       bars: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Sprint 1 \u2014 Foundation",       bars: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Sprint 2 \u2014 Communications",   bars: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Sprint 3 \u2014 Features",         bars: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] },
  { name: "Sprint 4 \u2014 UAT",              bars: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0] },
  { name: "Sprint 5 \u2014 Prod Deploy",      bars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0] },
  { name: "SolverCare (complimentary)", bars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2] },
];
const WEEK_COUNT = 14;
const weekLabels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13", "W14"];

const ganttColWidth = 460;
const ganttLabelWidth = CONTENT_WIDTH - (WEEK_COUNT * ganttColWidth);

const ganttTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [ganttLabelWidth, ...Array(WEEK_COUNT).fill(ganttColWidth)],
  rows: [
    // Header row with week numbers
    new TableRow({ children: [
      headerCell("Phase", ganttLabelWidth),
      ...weekLabels.map((w) => new TableCell({
        borders,
        width: { size: ganttColWidth, type: WidthType.DXA },
        shading: { fill: DARK, type: ShadingType.CLEAR },
        margins: { top: 40, bottom: 40, left: 10, right: 10 },
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: w, bold: true, font: "Arial", size: 12, color: WHITE })] }),
        ]
      })),
    ]}),
    // Phase rows (bar value: 0=empty, 1=teal, 2=yellow/SolverCare)
    ...ganttPhases.map((p, pi) => new TableRow({ children: [
      new TableCell({
        borders,
        width: { size: ganttLabelWidth, type: WidthType.DXA },
        shading: { fill: altRow(pi).fill, type: ShadingType.CLEAR },
        margins: { top: 40, bottom: 40, left: 80, right: 40 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: p.name, font: "Arial", size: 14, color: INK })] })],
      }),
      ...p.bars.map(b => new TableCell({
        borders,
        width: { size: ganttColWidth, type: WidthType.DXA },
        shading: { fill: b === 2 ? YELLOW : (b === 1 ? TEAL : altRow(pi).fill), type: ShadingType.CLEAR },
        margins: { top: 40, bottom: 40, left: 10, right: 10 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [] })],
      })),
    ]})),
  ]
});

// ── Resource Allocation ──
const resourceTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [2600, 2200, 2200, 2360],
  rows: [
    new TableRow({ children: [
      headerCell("Role", 2600),
      headerCell("Allocation", 2200),
      headerCell("Duration", 2200),
      headerCell("Responsibilities", 2360),
    ]}),
    new TableRow({ children: [
      bodyCell([new TextRun({ text: "Full-Stack Developer", bold: true, font: "Arial", size: 18, color: INK })], 2600, { shading: altRow(0) }),
      bodyCell("Full-time", 2200, { shading: altRow(0) }),
      bodyCell("Weeks 2\u201312", 2200, { shading: altRow(0) }),
      bodyCell("Frontend build, API integration, testing", 2360, { shading: altRow(0) }),
    ]}),
    new TableRow({ children: [
      bodyCell([new TextRun({ text: "QA Engineer", bold: true, font: "Arial", size: 18, color: INK })], 2600, { shading: altRow(1) }),
      bodyCell("Full-time", 2200, { shading: altRow(1) }),
      bodyCell("Weeks 3\u201312", 2200, { shading: altRow(1) }),
      bodyCell("Test planning, regression, UAT support", 2360, { shading: altRow(1) }),
    ]}),
    new TableRow({ children: [
      bodyCell([new TextRun({ text: "Project Manager", bold: true, font: "Arial", size: 18, color: INK })], 2600, { shading: altRow(2) }),
      bodyCell("Part-time", 2200, { shading: altRow(2) }),
      bodyCell("Weeks 1\u201314", 2200, { shading: altRow(2) }),
      bodyCell("Sprint planning, standups, client sync, delivery", 2360, { shading: altRow(2) }),
    ]}),
  ]
});

// ── Prerequisites ──
const prereqItems = [
  ["API Documentation", "Complete API documentation for all backend endpoints consumed by the current admin portal."],
  ["Staging Environment Access", "Confirm ownership of the staging environment and provide Solvative with access credentials and connection details."],
  ["Feature Walkthrough", "Screenshots or a guided walkthrough of all existing portal features and screens."],
  ["Environment Details", "Azure hosting configuration details, deployment pipeline access, and any relevant infrastructure documentation."],
  ["Vendor Coordination", "If the current environment is owned by the original development vendor, AGIA will coordinate access on Solvative\u2019s behalf."],
];

const prereqTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [2800, 6560],
  rows: [
    new TableRow({ children: [
      headerCell("Artifact", 2800),
      headerCell("Details", 6560),
    ]}),
    ...prereqItems.map((p, i) => new TableRow({ children: [
      bodyCell([new TextRun({ text: p[0], bold: true, font: "Arial", size: 18, color: INK })], 2800, { shading: altRow(i) }),
      bodyCell(p[1], 6560, { shading: altRow(i) }),
    ]})),
  ]
});

// ── Pricing Table ──
const pricingTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [6360, 3000],
  rows: [
    new TableRow({ children: [
      headerCell("Description", 6360),
      headerCell("Amount", 3000, { alignment: AlignmentType.RIGHT }),
    ]}),
    new TableRow({ children: [
      bodyCell("Standard Project Investment", 6360, { shading: altRow(0) }),
      bodyCell([new TextRun({ text: "$24,600.00", font: "Arial", size: 18, color: MUTED, strike: true })], 3000, { shading: altRow(0), alignment: AlignmentType.RIGHT }),
    ]}),
    new TableRow({ children: [
      bodyCell([
        new TextRun({ text: "First-Engagement Discount", font: "Arial", size: 18, color: TEAL }),
      ], 6360, { shading: altRow(1) }),
      bodyCell([new TextRun({ text: "\u2013 $8,160.00", font: "Arial", size: 18, color: TEAL })], 3000, { shading: altRow(1), alignment: AlignmentType.RIGHT }),
    ]}),
    new TableRow({ children: [
      new TableCell({
        borders,
        width: { size: 6360, type: WidthType.DXA },
        shading: { fill: TEAL_TINT, type: ShadingType.CLEAR },
        margins: cellMargins,
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: "Total Project Investment", bold: true, font: "Arial", size: 20, color: DARK })] })],
      }),
      new TableCell({
        borders,
        width: { size: 3000, type: WidthType.DXA },
        shading: { fill: TEAL_TINT, type: ShadingType.CLEAR },
        margins: cellMargins,
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$16,440.00", bold: true, font: "Arial", size: 22, color: TEAL })] })],
      }),
    ]}),
  ]
});

// ── Payment Schedule ──
const paymentTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [5360, 2000, 2000],
  rows: [
    new TableRow({ children: [
      headerCell("Milestone", 5360),
      headerCell("Percentage", 2000, { alignment: AlignmentType.CENTER }),
      headerCell("Amount", 2000, { alignment: AlignmentType.RIGHT }),
    ]}),
    new TableRow({ children: [
      bodyCell("Upon Execution of SOW", 5360, { shading: altRow(0) }),
      bodyCell("40%", 2000, { shading: altRow(0), alignment: AlignmentType.CENTER }),
      bodyCell("$6,576.00", 2000, { shading: altRow(0), alignment: AlignmentType.RIGHT }),
    ]}),
    new TableRow({ children: [
      bodyCell("Production Launch (Sprint 5 completion)", 5360, { shading: altRow(1) }),
      bodyCell("60%", 2000, { shading: altRow(1), alignment: AlignmentType.CENTER }),
      bodyCell("$9,864.00", 2000, { shading: altRow(1), alignment: AlignmentType.RIGHT }),
    ]}),
    new TableRow({ children: [
      new TableCell({
        borders,
        width: { size: 5360, type: WidthType.DXA },
        shading: { fill: TEAL_TINT, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true, font: "Arial", size: 20, color: DARK })] })],
      }),
      new TableCell({
        borders,
        width: { size: 2000, type: WidthType.DXA },
        shading: { fill: TEAL_TINT, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100%", bold: true, font: "Arial", size: 20, color: DARK })] })],
      }),
      new TableCell({
        borders,
        width: { size: 2000, type: WidthType.DXA },
        shading: { fill: TEAL_TINT, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$16,440.00", bold: true, font: "Arial", size: 20, color: TEAL })] })],
      }),
    ]}),
  ]
});

// ── Out of Scope ──
const outOfScope = [
  "Backend or API development (Solvative will consume existing APIs as-is)",
  "Mobile app (EA+) development or modification",
  "Database schema changes or data migrations",
  "New features or functionality beyond existing portal capabilities",
  "Ongoing post-launch support and maintenance (available via separate SOW)",
  "Third-party licensing fees, cloud hosting costs, or Azure infrastructure provisioning",
  "WordPress / WooCommerce project (separate engagement)",
  "Java / Spring Boot staff augmentation (separate engagement)",
  "Any feature or functionality not explicitly described in this Scope of Work",
];

// ── Assumptions & Dependencies ──
const assumptions = [
  "AGIA will provide all prerequisite artifacts (API documentation, environment access, feature screenshots) within the first week. Project kickoff is contingent on receipt of these materials; any delay in delivery will result in a corresponding shift to the project timeline.",
  "If the staging environment is owned by the original development vendor, AGIA will coordinate access on Solvative\u2019s behalf. Solvative\u2019s timeline commitments are contingent on timely access being granted.",
  "AGIA will provide feedback within 3 business days of each review or approval request. Delays in feedback may result in corresponding timeline extensions.",
  "AGIA is responsible for providing all required content, assets, credentials, and third-party access in a timely manner prior to the applicable phase.",
  "The existing backend APIs will remain stable and available throughout the project duration. Any changes to APIs by AGIA or its vendors during the engagement may require scope reassessment.",
  "Solvative will not commence performing any services unless and until Solvative receives the initial payment upon execution. The remaining balance is due upon production launch.",
  "For any out-of-scope work, it will be pre-approved by the Client and documented through a Change Order.",
  "This Statement of Work is governed by the Master Service Agreement (MSA) executed between AGIA and Solvative. General terms including liability, cancellation, payment terms, and dispute resolution are covered under the MSA.",
];

// ── Signature Block ──
function sigLine(label) {
  return [
    new Paragraph({ spacing: { before: 300 }, children: [] }),
    new Paragraph({
      spacing: { after: 20 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } },
      children: []
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: label, font: "Arial", size: 16, color: MUTED })]
    }),
  ];
}

// ══════════════════════════════════════════
// ASSEMBLE DOCUMENT
// ══════════════════════════════════════════
const numbering = {
  config: [
    {
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    },
    {
      reference: "numbers",
      levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    },
  ]
};

const mainContent = {
  properties: {
    page: {
      size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
      margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
    }
  },
  headers: {
    default: new Header({
      children: [
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1200, 8160],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 1200, type: WidthType.DXA },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 0, bottom: 0, left: 0, right: 80 },
                  children: [new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [new ImageRun({
                      type: "jpg",
                      data: logoData,
                      transformation: { width: 80, height: 14 },
                      altText: { title: "Solvative", description: "Solvative Logo", name: "solvative-header-logo" }
                    })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 8160, type: WidthType.DXA },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 0, bottom: 0, left: 80, right: 0 },
                  children: [new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [new TextRun({ text: "|  [PROJECT NAME]  |  SOW [PROPOSAL-ID]", font: "Arial", size: 14, color: MUTED })]
                  })]
                }),
              ]
            })
          ]
        }),
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL, space: 1 } },
          children: []
        }),
      ]
    })
  },
  footers: {
    default: new Footer({
      children: [
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 4 } },
          children: [
            new TextRun({ text: "Confidential  |  Solvative LLC", font: "Arial", size: 14, color: MUTED }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        })
      ]
    })
  },
  children: [
    // Document History
    sectionHeading("Document History"),
    docHistoryTable,

    // Executive Summary
    new Paragraph({ children: [new PageBreak()] }),
    sectionHeading("Executive Summary"),
    ...execSummaryParas,

    // Scope of Work
    sectionHeading("Scope of Work"),
    subHeading("EPICs"),
    bodyPara("The following EPICs define the functional scope of this engagement:"),
    epicsTable,

    // Sprint Plan
    new Paragraph({ children: [new PageBreak()] }),
    subHeading("Sprint Plan"),
    bodyPara("Each sprint maps EPIC tasks to a two-week delivery cadence. Prerequisites and Technical Discovery precede sprint execution."),
    ...sprintElements,

    // Gantt Chart
    new Paragraph({ children: [new PageBreak()] }),
    sectionHeading("Project Timeline"),
    bodyPara([
      new TextRun({ text: "Project start: [START DATE]", bold: true, font: "Arial", size: 20, color: INK }),
      new TextRun({ text: "  |  Production launch: [LAUNCH DATE]  |  SolverCare through: [SOLVERCARE END DATE]", font: "Arial", size: 20, color: GRAY }),
    ]),
    ganttTable,

    // Resource Allocation
    sectionHeading("Resource Allocation"),
    resourceTable,

    // Prerequisites
    new Paragraph({ children: [new PageBreak()] }),
    sectionHeading("Prerequisites"),
    bodyPara("The following artifacts and access must be provided by AGIA prior to project kickoff. Sprint execution will not begin until all prerequisites are received."),
    prereqTable,

    // Pricing
    sectionHeading("Pricing and Payment"),
    subHeading("Investment Summary"),
    bodyPara([
      new TextRun({ text: "As this is the first engagement between Solvative and AGIA, a one-time introductory discount has been applied to the standard project rate.", font: "Arial", size: 18, italics: true, color: MUTED }),
    ]),
    pricingTable,

    subHeading("Payment Schedule"),
    paymentTable,

    // Out of Scope
    new Paragraph({ children: [new PageBreak()] }),
    sectionHeading("Out-of-Scope Work"),
    bodyPara("The following are explicitly excluded from this SOW unless addressed via a Change Order:"),
    ...outOfScope.map(item => new Paragraph({
      numbering: { reference: "bullets", level: 0 },
      alignment: AlignmentType.BOTH,
      spacing: { after: 60 },
      children: [new TextRun({ text: item, font: "Arial", size: 18, color: GRAY })]
    })),

    // Assumptions & Dependencies
    sectionHeading("Assumptions and Dependencies"),
    ...assumptions.map((item, i) => new Paragraph({
      numbering: { reference: "numbers", level: 0 },
      alignment: AlignmentType.BOTH,
      spacing: { after: 80 },
      children: [new TextRun({ text: item, font: "Arial", size: 18, color: GRAY })]
    })),

    // Signatures
    new Paragraph({ children: [new PageBreak()] }),
    sectionHeading("Project Approval and Acceptance"),
    bodyPara([
      new TextRun({ text: "By signing below, Client hereby requests and authorizes Solvative to perform the services described above, and Solvative agrees to perform such services, in accordance with the Master Client Agreement executed by the parties.", font: "Arial", size: 18, italics: true, color: GRAY }),
    ]),
    new Paragraph({ spacing: { before: 400 }, children: [] }),

    // Two-column signature via table
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: [4680, 4680],
      rows: [
        new TableRow({ children: [
          new TableCell({
            borders: noBorders,
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "AGIA, LLC.", bold: true, font: "Arial", size: 22, color: DARK })] }),
              new Paragraph({ spacing: { before: 400 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Authorized Signature", font: "Arial", size: 14, color: MUTED })] }),
              new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Name (Print)", font: "Arial", size: 14, color: MUTED })] }),
              new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Title", font: "Arial", size: 14, color: MUTED })] }),
              new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Date", font: "Arial", size: 14, color: MUTED })] }),
            ]
          }),
          new TableCell({
            borders: noBorders,
            width: { size: 4680, type: WidthType.DXA },
            children: [
              new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "Solvative LLC", bold: true, font: "Arial", size: 22, color: DARK })] }),
              new Paragraph({ spacing: { before: 400 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Authorized Signature", font: "Arial", size: 14, color: MUTED })] }),
              new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Name (Print)", font: "Arial", size: 14, color: MUTED })] }),
              new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Title", font: "Arial", size: 14, color: MUTED })] }),
              new Paragraph({ spacing: { before: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_GRAY, space: 1 } }, children: [] }),
              new Paragraph({ children: [new TextRun({ text: "Date", font: "Arial", size: 14, color: MUTED })] }),
            ]
          }),
        ]}),
      ]
    }),
  ]
};

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: TEAL },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
    ]
  },
  numbering,
  sections: [coverPage, mainContent]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/SOW-EA-Plus-Admin-Portal-Rewrite.docx", buffer);
  console.log("DONE - SOW generated successfully");
});
