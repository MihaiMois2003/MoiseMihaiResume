export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    icon: "💻",
    skills: [
      { name: "Java" },
      { name: "C/C++/C#" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "React" },
      { name: "React Native" },
      { name: "Data Structures" },
      { name: "Algorithms" },
    ],
  },
  {
    title: "Software",
    icon: "🛠️",
    skills: [
      { name: "MS Office (Word, Excel, PowerPoint)" },
      { name: "Outlook" },
    ],
  },
  {
    title: "Languages",
    icon: "🌍",
    skills: [
      { name: "English (C1)" },
      { name: "Romanian (Native)" },
      { name: "German" },
    ],
  },
  {
    title: "Soft Skills",
    icon: "✨",
    skills: [
      { name: "Adaptable and proactive" },
      { name: "Charismatic and team-oriented" },
      { name: "Strong communication skills" },
    ],
  },
];
