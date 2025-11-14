import mission100_image1 from "/assets/mission100_image1.jpg";
import mission100_image2 from "/assets/mission100_image2.jpg";
import mission100_image3 from "/assets/mission100_image3.jpg";
import MISSION100_qr from "/assets/MISSION100_qr.jpg";
import WelcomeScreenLifeMesh from "/assets/WelcomeScreenLifeMesh.png";
import FeedScreenLifeMesh from "/assets/FeedScreenLifeMesh.png";
import RegisterSCreenLifeMesh from "/assets/RegisterScreenLifeMesh.png";
import PostModalLifeMesh from "/assets/PostModalLifeMesh.png";
import ProfileScreenLifeMesh from "/assets/ProfileScreenLifeMesh.png";
import qrCodeLifeMeshMobile from "/assets/qrCodeLifeMeshMobile.png";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  category: "mobile" | "web" | "desktop";
  images: string[];
  qrCode?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "mission-100",
    name: "Mission 100",
    tagline: "Your AI-powered health companion",
    description:
      "MISSION100 – Your AI-powered health companion designed to help you live a longer, healthier life! Get real-time, personalized advice on fitness, nutrition, and lifestyle habits tailored just for you. With AI-driven insights, MISSION100 guides you toward optimal health, empowering you to reach 100 years with vitality.",
    techStack: ["React Native", "Node.js", "Firebase", "AI/ML"],
    category: "mobile",
    images: [mission100_image1, mission100_image2, mission100_image3],
    qrCode: MISSION100_qr,
    githubUrl: "https://github.com/yourusername/mission100",
    featured: true,
  },
  {
    id: "lifemesh",
    name: "LifeMesh",
    tagline: " A smart local community ",
    description:
      "LifeMesh – A smart local community network that connects people in the same area for help, donations, events, and civic initiatives. Features include an interactive local map, user profiles with reputation, community feed, real-time chat, and AI-powered recommendations & moderation.",
    techStack: [
      "React Native",
      "Next.js",
      "MySQL",
      "Node.js",
      "Prisma",
      "Redux",
    ],
    category: "mobile",
    images: [
      WelcomeScreenLifeMesh,
      FeedScreenLifeMesh,
      RegisterSCreenLifeMesh,
      PostModalLifeMesh,
      ProfileScreenLifeMesh,
    ],
    qrCode: qrCodeLifeMeshMobile,
    githubUrl: "https://github.com/yourusername/mission100",
    featured: true,
  },
];
