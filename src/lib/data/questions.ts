export interface QuestionSection {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  answer?: string;
}

export const questionsData: QuestionSection[] = [
  {
    id: "psp",
    title: "1) Project Safety Plan (PSP)",
    questions: [
      {
        id: "q1",
        text: "Do you have a required PSP template/format, or should the contractor use their standard PSP?",
        answer:
          "Use the GC's standard PSP template (provided at Notice to Proceed). If a contractor template is used, it must be mapped to the GC sections 1:1.",
      },
      {
        id: "q2",
        text: "Which hazard analysis format do you prefer (JHA vs JSA), and what level of detail is expected per task?",
        answer:
          "Preferred hazard analysis format: JHA is preferred for daily task planning; JSA accepted for specialty trades. Minimum: hazards + controls + responsible person + verification method per activity.",
      },
      {
        id: "q3",
        text: "What are the site's known/high-risk activities (e.g., excavation, crane lifts, hot work, energized work, roofing) that must be explicitly covered?",
        answer:
          "High-risk activities to cover: Excavation/trenching, concrete pours & formwork, crane/telehandler operations, work at height/roofing, hot work, silica-generating cutting/grinding, temporary power, traffic control/deliveries.",
      },
      {
        id: "q4",
        text: "Who must review/approve the PSP, and what is the required submission date (and update cadence)?",
        answer:
          "Review/approval + due date: Submit PSP 10 business days before mobilization. Approval by GC Safety Manager and Owner Rep; update required whenever scope changes or after any recordable/HiPo event.",
      },
      {
        id: "q5",
        text: "What emergency response requirements apply (nearest clinic/hospital, evacuation routes, muster points, on-site first aid/AED, incident command roles)?",
        answer:
          "Emergency response requirements: Site-specific ERP must include muster points, evacuation map posted at entrances, first-aid/AED locations, role assignments (Incident Lead, EMS Liaison), and quarterly drill requirement.",
      },
      {
        id: "q6",
        text: "Are there specific heat/dust thresholds and controls required (stop-work criteria, watering schedule, air monitoring, N95 vs respirator program)?",
        answer:
          "Heat/dust thresholds & controls: Heat index actions start at 90°F (extra breaks/hydration); 100°F triggers mandatory work/rest cycles and shade; 105°F requires Safety Manager approval to continue. Dust: wet methods required for cutting; HEPA vacs for indoor; stop-work if visible dust plume persists >2 minutes.",
      },
      {
        id: "q7",
        text: "What are the minimum PPE standards by area/task, and are there client-specific PPE rules beyond OSHA/local requirements?",
        answer:
          "Minimum PPE standards: Hard hat, safety glasses, hi-vis vest/shirt, gloves, long pants, and 6\" ankle boots at all times. Hearing protection in posted areas. Respiratory protection (N95 minimum) for silica tasks; half-face respirators for prolonged grinding per exposure assessment.",
      },
    ],
  },
  {
    id: "training",
    title: "2) Training & competency records",
    questions: [
      {
        id: "q8",
        text: "What training is mandatory for all personnel vs role-specific (operators, supervisors, subcontractors)?",
        answer:
          "Mandatory for all vs role-specific: All personnel must complete site orientation, weekly toolbox talks, hazard communication, and near-miss reporting. Role-specific: fall protection for elevated work; equipment certs for operators; hot-work training for welding/cutting.",
      },
      {
        id: "q9",
        text: 'What evidence is "verifiable" (cards, certificates, sign-in sheets, LMS records), and how should it be submitted/stored?',
        answer:
          'What counts as "verifiable" + submission/storage: Certificates/cards + sign-in rosters with printed name, signature, date, and trainer. Records uploaded to the GC\'s Procore folder within 48 hours of training and kept on-site in a binder.',
      },
      {
        id: "q10",
        text: "How current must certifications be, and is there a minimum acceptable provider (e.g., OSHA-authorized, ANSI/NSC, manufacturer)?",
        answer:
          "Currency + approved providers: Certifications must be current within the last 3 years (or manufacturer validity). Providers must be OSHA-authorized, ANSI-aligned, manufacturer-approved, or state-licensed where applicable.",
      },
      {
        id: "q11",
        text: "Which equipment certifications are required (forklift, boom/scissor lifts, cranes, rigging/signalperson, powder-actuated tools)?",
        answer:
          "Required equipment certs: Forklift (OSHA-compliant), aerial lifts (boom/scissor), cranes (NCCCO or state equivalent), rigging/signalperson per ASME B30.5, and powder-actuated tool certification per manufacturer.",
      },
      {
        id: "q12",
        text: 'Is confined space expected at this site, and if "if applicable," what triggers applicability and what permit process is required?',
        answer:
          "Confined space: Yes, anticipated for utility vaults and tanks. Entry triggers: limited access/egress, potential hazardous atmosphere, or engulfment risk. Permit-required procedure: atmospheric testing, attendant, rescue plan, and entry supervisor sign-off.",
      },
    ],
  },
  {
    id: "inspections",
    title: "3) Inspections, audits, and reporting",
    questions: [
      {
        id: "q13",
        text: "What inspection cadence do you want (daily pre-task, daily site walk, weekly formal inspection), and who is responsible (GC, each subcontractor, both)?",
        answer:
          "Inspection cadence: Daily pre-task by foreman, daily site walk by GC superintendent, weekly formal inspection by GC Safety with subcontractor safety leads. Both GC and subs responsible for their work areas.",
      },
      {
        id: "q14",
        text: "Do you have inspection checklists, or should the contractor provide them for approval?",
        answer:
          "GC will provide standard checklists for weekly inspections; subcontractors may use their own for daily pre-task but must submit for GC approval within first week of mobilization.",
      },
      {
        id: "q15",
        text: "What is the required turnaround time for corrective actions, and how are severity/priority levels defined?",
        answer:
          "Corrective action turnaround: Imminent danger = immediate stop-work + 2-hour resolution; Serious = 24 hours; Other = 72 hours. Severity levels: Critical (life-threatening), Major (potential injury), Minor (procedural/housekeeping).",
      },
    ],
  },
];

export const answeredQuestionsData: QuestionSection[] = questionsData.map(
  (section) => ({
    ...section,
    questions: section.questions.map((q) => ({
      ...q,
      // Answers are already included in questionsData
    })),
  })
);

