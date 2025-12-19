export interface TimelineEvent {
  id: string;
  description: string;
  timestamp: string;
  hasViewMore?: boolean;
}

export interface TimelineGroup {
  label: string;
  events: TimelineEvent[];
}

export const timelineData: TimelineGroup[] = [
  {
    label: "Today",
    events: [
      {
        id: "t1",
        description:
          "Apollo's automatic email fulfillment found a verified email tarang@apple.com for Tarang G.",
        timestamp: "Feb 07, 2025, 10:00 AM",
      },
      {
        id: "t2",
        description:
          "Account for Tarang G was changed from No Account to Apple matched by Company : Apple",
        timestamp: "Feb 07, 2025, 10:00 AM",
      },
      {
        id: "t3",
        description: "A lead request by You undeleted Tarang G",
        timestamp: "Feb 07, 2025, 10:00 AM",
      },
      {
        id: "t4",
        description: "You deleted Tarang G.",
        timestamp: "Feb 07, 2025, 9:59 AM",
      },
      {
        id: "t5",
        description: "You changed custom fields of Tarang G",
        timestamp: "Feb 07, 2025, 9:40 AM",
        hasViewMore: true,
      },
    ],
  },
  {
    label: "Yesterday",
    events: [
      {
        id: "t6",
        description: "You changed custom fields of Tarang G",
        timestamp: "Feb 06, 2025, 5:26 PM",
      },
      {
        id: "t7",
        description: "Project scope was updated by Barry Allen",
        timestamp: "Feb 06, 2025, 3:15 PM",
      },
      {
        id: "t8",
        description: "New comment added to Request for Proposal document",
        timestamp: "Feb 06, 2025, 2:00 PM",
      },
    ],
  },
  {
    label: "Last Week",
    events: [
      {
        id: "t9",
        description: "Golf course plans were uploaded by Cassandra Cain",
        timestamp: "Feb 01, 2025, 11:30 AM",
      },
      {
        id: "t10",
        description: "Initial project created",
        timestamp: "Jan 30, 2025, 9:00 AM",
      },
    ],
  },
];

