export interface ExperienceItem {
  role: string;
  period: string;
  description: string[];
}

export interface Experience {
  company: string;
  location: string;
  icon: string;
  items: ExperienceItem[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  graduation: string;
  icon: string;
}

export const experienceData: Experience[] = [
  {
    company: "NTT DATA",
    location: "Cluj-Napoca, Cluj",
    icon: "💼",
    items: [
      {
        role: "Embedded Software Developer",
        period: "September 2024 – June 2025",
        description: [
          "Gaining hands-on experience in embedded C development while enhancing teamwork and problem-solving skills",
        ],
      },
      {
        role: "AI & Machine Learning Trainee",
        period: "June 2025 – Present",
        description: [
          "Engaged in AI-focused training and mentorship under NTT DATA experts, completing advanced courses and practical projects in machine learning, neural networks, and AI-driven applications",
        ],
      },
    ],
  },
];

export const educationData: Education = {
  institution: "Technical University of Cluj-Napoca",
  degree: "Computer Science",
  period: "2022 – 2026",
  graduation: "2026 graduate",
  icon: "🎓",
};
