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
    title: "2026dotspace",
    description: "all things culture countdown website for the year 2026",
    link: "https://my2026.space/",
  },
];
