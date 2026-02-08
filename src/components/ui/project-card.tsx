"use client";

import { ArrowUpRight } from "@phosphor-icons/react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    link: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col items-start pt-1.5">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative -mx-3 w-full transform rounded-lg px-3 py-2 transition-all duration-300 ease-in-out md:hover:scale-105 md:hover:bg-hoverColor"
      >
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-title md:group-hover:text-primary">
          <div className="flex items-center">
            <h3>{project.title}</h3>
            <ArrowUpRight
              size={14}
              weight="bold"
              className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </div>
        <p className="text-sm text-body">{project.description}</p>
      </a>
    </div>
  );
}
