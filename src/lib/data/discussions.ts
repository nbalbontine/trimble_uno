export interface Discussion {
  id: string;
  subject: string;
  count?: number;
  fileType: string;
  input: string;
  project: string;
  participants: string;
  date: string;
  isLoading?: boolean;
}

export const discussionsThisMonth: Discussion[] = [
  {
    id: "disc-1",
    subject: "Golf course plans",
    count: 3,
    fileType: "CAD file",
    input: "Google meets",
    project: "Pueblo del sol",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
  {
    id: "disc-2",
    subject: "Subject 3",
    fileType: "IFC",
    input: "Google meets",
    project: "Westminister",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
];

export const discussionsNextMonth: Discussion[] = [
  {
    id: "disc-3",
    subject: "Request for proposal",
    count: 5,
    fileType: "PDF",
    input: "Email",
    project: "Pueblo del sol",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
  {
    id: "disc-4",
    subject: "Golf course plans",
    count: 3,
    fileType: "CAD file",
    input: "Google meets",
    project: "Pueblo del sol",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
  {
    id: "disc-5",
    subject: "Subject 3",
    fileType: "IFC",
    input: "Google meets",
    project: "Westminister",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
];

export const discussionsLoaded: Discussion[] = [
  {
    id: "disc-0",
    subject: "Request for proposal",
    count: 2,
    fileType: "PDF, CAD",
    input: "Email",
    project: "Pueblo del sol",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
  {
    id: "disc-1",
    subject: "Subject 2",
    fileType: "CAD file",
    input: "Google meets",
    project: "Wesminster",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
  {
    id: "disc-2",
    subject: "Subject 3",
    fileType: "IFC",
    input: "Google meets",
    project: "Westminister",
    participants: "MD, DK, DJC",
    date: "July 15th. 2025",
  },
];

