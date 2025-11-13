export interface VolunteeringItem {
  role: string;
  organization: string;
  period: string;
  description: string[];
  icon: string; // Emoji
}

export const volunteeringData: VolunteeringItem[] = [
  {
    role: "Faculty Ambassador",
    organization: "Faculty of Automation and Computers",
    period: "2022 – Present",
    icon: "🎤",
    description: [
      "Engaged in public speaking, event organization, and social media promotion",
      "Strengthened interpersonal and leadership skills through outreach programs",
    ],
  },
  {
    role: "Active Member",
    organization: "OSUT Cluj-Napoca",
    period: "2022 – Present",
    icon: "🤝",
    description: [
      "Active member in student-led initiatives",
      "Fostering collaboration and networking opportunities",
      "Participating in community-building activities",
    ],
  },
];
