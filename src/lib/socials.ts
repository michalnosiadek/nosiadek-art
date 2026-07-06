export type Social = {
  label: string;
  href: string;
};

// Add new platforms here: SocialLinks.tsx will render whatever's in this list.
export const socials: Social[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/michalnosiadek.art",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Micha%C5%82-Nosiadek-Art/61582809311794/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/michalnosiadek/",
  },
];
