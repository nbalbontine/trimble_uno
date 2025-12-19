import { ObservationColor } from "./observations";

export interface Deliverable {
  id: string;
  title: string;
  color: ObservationColor;
}

export const deliverables: Deliverable[] = [
  {
    id: "del-1",
    title: "Environmental Plan",
    color: "green",
  },
  {
    id: "del-2",
    title: "Safety Documentation",
    color: "orange",
  },
  {
    id: "del-3",
    title: "Golf course earthworks",
    color: "red",
  },
  {
    id: "del-4",
    title: "Residential roading and infrastructure",
    color: "gray",
  },
  {
    id: "del-5",
    title: "Material supply",
    color: "blue",
  },
];

export interface KanbanItem {
  id: string;
  title: string;
  description: string;
  color: ObservationColor;
  items?: string[];
}

export const kanbanObservations: KanbanItem[] = [
  {
    id: "kanban-1",
    title: "New comments and information added to PDF",
    description: "",
    color: "red",
    items: [
      "Site & civil scope",
      "Vertical construction scope: Deliver residential",
      "Closeout & handover scope: Provide as-builts, commissioning reports, O&M manual",
    ],
  },
  {
    id: "kanban-2",
    title: "Only public topology",
    description: "Description of something important or relevant information",
    color: "yellow",
    items: [],
  },
];

export const kanbanSuggestions: KanbanItem[] = [
  {
    id: "suggest-1",
    title: "Questions for owner",
    description: "Commission geo tech support investigation. Site & civil scope",
    color: "red",
    items: ["Deliver residential", "Handover scope", "Reports"],
  },
  {
    id: "suggest-2",
    title: "Solution",
    description: "Commission drone team do a drone fly.",
    color: "yellow",
    items: [],
  },
];

