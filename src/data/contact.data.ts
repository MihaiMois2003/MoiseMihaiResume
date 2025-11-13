export interface ContactItem {
  label: string;
  value: string;
  icon: string;
  href: string;
  type: "email" | "phone" | "location";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "instagram" | "github" | "linkedin";
}

export const contactData: ContactItem[] = [
  {
    label: "Email",
    value: "mihaimoise73@gmail.com",
    icon: "📧",
    href: "mailto:mihaimoise73@gmail.com",
    type: "email",
  },
  {
    label: "Phone",
    value: "+40 725 465 205",
    icon: "📱",
    href: "tel:+40725465205",
    type: "phone",
  },
  {
    label: "Location",
    value: "Cluj-Napoca, Romania",
    icon: "📍",
    href: "https://www.google.com/maps/search/?api=1&query=Cluj-Napoca,Romania",
    type: "location",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mihai-ioan-moise-0177b8354/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/MihaiMois2003",
    icon: "github",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mihai_moise/",
    icon: "instagram",
  },
];
