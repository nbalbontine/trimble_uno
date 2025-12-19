export type ObservationColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "gray";

export interface Observation {
  id: string;
  title: string;
  description: string;
  color: ObservationColor;
  category: string;
  comments?: Comment[];
  highlightSections?: string[];
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export const summaryObservations: Observation[] = [
  {
    id: "obs-1",
    title: "Deliverables",
    description: "Small note around observation",
    color: "orange",
    category: "Deliverables",
  },
  {
    id: "obs-2",
    title: "Highlighted external references",
    description: "Small note around observation",
    color: "green",
    category: "References",
  },
  {
    id: "obs-3",
    title: "Risks",
    description: "Small note around observation",
    color: "blue",
    category: "Risks",
  },
  {
    id: "obs-4",
    title: "Risks 3",
    description: "Small note around observation",
    color: "red",
    category: "Risks",
  },
  {
    id: "obs-5",
    title: "Risks 4",
    description: "Small note around observation",
    color: "yellow",
    category: "Risks",
  },
];

export const documentObservations: Observation[] = [
  {
    id: "doc-obs-1",
    title: "High Penalty clause",
    description: "Description of high penalty clause and more relevant information",
    color: "red",
    category: "01-Deliverables",
    highlightSections: ["section-incourage"],
    comments: [
      {
        id: "c1",
        author: "NathanB",
        role: "Estimator",
        content: "User adds a comment about this and I want to make sure we have this right",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: "doc-obs-2",
    title: "Unique capabilities needed",
    description: "Description of high penalty clause and more relevant information",
    color: "orange",
    category: "01-Deliverables",
    highlightSections: [],
  },
  {
    id: "doc-obs-3",
    title: "Unique capabilities needed",
    description: "Description of high penalty clause and more relevant information",
    color: "orange",
    category: "01-Deliverables",
    highlightSections: [],
  },
  {
    id: "doc-obs-4",
    title: "External reference to ACI standards",
    description: "References ACI 318-19 for concrete specifications",
    color: "green",
    category: "02-Highlighted external references",
    highlightSections: [],
  },
  {
    id: "doc-obs-5",
    title: "OSHA compliance requirements",
    description: "Multiple OSHA standards referenced throughout the document",
    color: "green",
    category: "02-Highlighted external references",
    highlightSections: [],
  },
  {
    id: "doc-obs-6",
    title: "Tight timeline risk",
    description: "Project timeline appears aggressive for scope of work",
    color: "blue",
    category: "03-Risks",
    highlightSections: [],
  },
  {
    id: "doc-obs-7",
    title: "Budget constraints",
    description: "Fixed price contract with limited change order provisions",
    color: "red",
    category: "03-Risks",
    highlightSections: [],
  },
];

export const mapObservations: Observation[] = [
  {
    id: "map-obs-1",
    title: "Golf course",
    description: "This seems an area destined to be 12,000sqm",
    color: "green",
    category: "Functional zones",
    highlightSections: ["zone-golf"],
  },
  {
    id: "map-obs-2",
    title: "Residential / Engineered",
    description: "This seems an area destined to be 28,000sq",
    color: "yellow",
    category: "Functional zones",
    highlightSections: ["zone-residential"],
  },
  {
    id: "map-obs-3",
    title: "Unique capabilities needed",
    description: "Description of high penalty clause and more relevant information",
    color: "purple",
    category: "Functional zones",
    highlightSections: [],
  },
  {
    id: "map-obs-4",
    title: "Total lot area",
    description: "Approximately 45,000 sqm including common areas",
    color: "blue",
    category: "Estimated Measures",
    highlightSections: [],
  },
  {
    id: "map-obs-5",
    title: "Road infrastructure",
    description: "1.2km of paved roads planned",
    color: "orange",
    category: "Estimated Measures",
    highlightSections: [],
  },
];

export const observationCategories = {
  document: ["01-Deliverables", "02-Highlighted external references", "03-Risks"],
  map: ["Functional zones", "Estimated Measures"],
};

