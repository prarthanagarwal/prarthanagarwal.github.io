export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "flowpad",
    description: "a minimal notepad for your thoughts to flow",
    link: "https://flowpad.live/",
  },
  {
    id: 2,
    title: "CryBaby",
    description: "a mobile app to track & enjoy your emotional moments :)",
    link: "https://crybaby.app/",
  },
];
