export interface Certification {
  name: string;
  date: string;
}

export interface CertificationCategory {
  title: string;
  icon: string;
  certifications: Certification[];
}

export const certificationsSummary = {
  heading: "About Me",
  description: [
    "I build apps that make a difference — blending creativity, code, and user-focused design.",
    "With 2 years of hands-on experience in React and React Native, I'm driven by curiosity, collaboration, and the thrill of solving real-world problems through technology.",
  ],
  websiteUrl: "https://unique-crisp-ecb953.netlify.app/",
};

export const certificationsData: CertificationCategory[] = [
  {
    title: "Oracle Certifications",
    icon: "🏆",
    certifications: [
      {
        name: "Oracle Database Design",
        date: "May 2022",
      },
      {
        name: "Oracle Database Programming with SQL",
        date: "May 2022",
      },
    ],
  },
  {
    title: "Language Certifications",
    icon: "🌐",
    certifications: [
      {
        name: "Cambridge English: Advanced (C1)",
        date: "April 2021",
      },
    ],
  },
];
