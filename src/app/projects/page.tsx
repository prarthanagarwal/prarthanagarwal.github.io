"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

// Project data based on the reference image
const projects = [
  {
    id: 1,
    title: "CryBaby",
    description: "A mobile app to track & enjoy your crying sessions :)",
    icon: "/logo/crybaby.webp",
    link: "https://crybaby.app/",
    external: true,
    iconSize: 50
  },
  {
    id: 2,
    title: "F.R.I.D.A.Y (MARK II)",
    description: "A fully open-source AI agent inspired by Tony Stark",
    icon: "/logo/friday.webp",
    link: "https://github.com/PrarthanAgarwal/F.R.I.D.A.Y",
    external: true,
    iconSize: 75
  },
  {id: 3,
    title: "craftads-ai",
    description: "Advertisement made easy with AI",
    icon: "/logo/craftads.webp",
    link: "https://craftads.live/",
    external: true,
    iconSize: 35
  },
  {id: 4,
    title: "pinbasket",
    description: "Pinterest scraper to collect the best pins.",
    icon: "/logo/pinbasket.webp",
    link: "https://github.com/PrarthanAgarwal/pinbasket",
    external: true,
    iconSize: 45
  },
  {id: 5,
    title: "Surf Time",
    description: "Browser extension to track and analyze your browsing habits.",
    icon: "/logo/surf-time.webp",
    link: "/surf-time",
    external: false,
    iconSize: 60
  },
  {id: 6,
    title: "Flowpad",
    description: "a minimal notepad for your thoughts to flow",
    icon: "/logo/flowpad.webp",
    link: "https://flowpad.live/",
    external: true,
    iconSize: 75
  }
];

export default function ProjectsPage() {
  return (
    <main className="font-sans pt-8">
      <Navbar showHomeLink={true} />
      
      <h1 className="text-4xl font-serif tracking-tight text-primary mt-8 mb-6">Projects</h1>
            
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col items-start">
            <div className="flex items-start gap-3 w-full">
              <div className={`${project.title === "F.R.I.D.A.Y (MARK II)" ? "w-16 h-16" : "w-14 h-14"} rounded-full bg-hoverColor/60 flex items-center justify-center shrink-0 mt-1 overflow-hidden`}>
                {project.icon ? (
                  <Image 
                    src={project.icon} 
                    alt={project.title} 
                    width={project.iconSize || 40} 
                    height={project.iconSize || 40} 
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                    sizes="60px"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-full transform rounded-lg px-3 py-2 transition-all duration-300 ease-in-out block -ml-1"
                >
                  <div className="flex items-center justify-between text-sm font-medium tracking-tight text-title">
                    <div className="flex items-center">
                      <h3 className="text-lg relative inline-block">
                        {project.title}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
                      </h3>
                      {project.external && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 text-gray-400 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                        >
                          <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-body">{project.description}</p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </main>
  );
} 