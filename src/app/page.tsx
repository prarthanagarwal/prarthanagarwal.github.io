"use client";

import Footer from '@/components/layout/footer';
import ProjectCard from '@/components/ui/project-card';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: "CryBaby",
    description: "a mobile app that helps you log & enjoy your crying sessions",
    link: "https://crybaby.app/"
  },
  {
    id: 2,
    title: "F.R.I.D.A.Y (MARK II)",
    description: "a fully open-source AI assistant",
    link: "https://github.com/PrarthanAgarwal/F.R.I.D.A.Y"
  },
];

export default function Home() {
  return (
    <main className="font-sans">
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-16">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2">
      <h1 className="text-[2.5rem] font-serif tracking-tight text-primary">
        Prarthan Agarwal
      </h1>
          {/*<div className="flex items-center gap-1.5 font-medium tracking-tight">
          {" • "}<h2 className="text-base text-title">designer</h2>
          {" • "}<h2 className="text-base text-title">developer</h2>
          </div>*/}
          <p className="pt-4 text-md">
            Hi there, I'm Prarthan. Welcome to my {" "} 
            <span className="text-black">digital hangout</span>. This is where I let the world know a bit about me and what keeps me wired and wide awake.{" "}
            When I'm not coding, I'm diving into research, cinema and new ideas.
          </p>

          {/* Summary Section */}
          <section className="pt-6">
            <h2 className="font-medium tracking-tight text-title">Summary</h2>
            <ul className="pt-2 text-base list-disc pl-5 space-y-2">
              <li>21-year-old creative developer from Surat, India.</li>
              <li>Worked on 18+ projects across different profiles.</li>
              <li>Currently selling time as a developer and building my own AI assistant, inspired by Tony Stark.</li>
              <li>Passionate about app and game development; combining both is the ultimate goal.</li>
              <li>Cinema shapes who I am, and I want to contribute to it in some way.</li>
            </ul>
          </section>

      <section className="pt-8">
        <h2 className="font-medium tracking-tight text-title">Projects</h2>
        <div className="pt-1.5">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="group">
          <p className="mt-4 w-fit rounded-md border border-body/20 bg-hoverColor/60 px-2 py-1 text-xs text-body transition-all duration-300 ease-in-out">
            Feel free to explore my{" "}
            <a
              href="https://github.com/prarthanagarwal?tab=repositories"
              rel="noopenner noreferrer"
              target="_blank"
              className="font-medium text-body underline underline-offset-2 transition-all duration-150 ease-in-out md:hover:text-primary md:group-hover:text-primary"
            >
              GitHub
            </a>{" "}
            for more projects. Most of them are open-source.
          </p>
        </div>
      </section>
        </div>

        {/* Right Column - Image and Links */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex flex-col items-center md:pt-[2rem]">
          {/* Navigation Links */}
          <div className="flex items-center gap-4 mb-6 tracking-tight">
            <Link
              href="/thoughts"
              className="text-base hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
            >
              thoughts
            </Link>
            <Link
              href="/ai"
              className="text-base hover:text-primary underline-offset-4 transition duration-150 ease-in-out hover:underline"
            >
              prarthan://ai
            </Link>
          </div>
          
          {/* Profile Image with rounded edges */}
          <div className="overflow-hidden rounded-2xl shadow-md w-full max-w-sm">
            <Image
              src="/IMG_5637.jpg"
              alt="Prarthan Agarwal"
              width={400}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Social Links below image */}
          <div className="w-full grid grid-cols-3 gap-4 pt-6 tracking-tight md:flex md:flex-row md:justify-center md:items-start md:gap-6">
            <Link
              href="/resume"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/document.svg" 
                alt="Resume" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">resume</span>
            </Link>
            <a
              href="https://www.linkedin.com/in/prarthanagarwal"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/linkedin.svg" 
                alt="LinkedIn" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">linkedin</span>
            </a>
            <a
              href="https://x.com/prarthanagarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/twitter_bird.svg" 
                alt="Twitter" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">twitter</span>
            </a>
            <a
              href="https://github.com/PrarthanAgarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
              <Image 
                src="/github.svg" 
                alt="GitHub" 
                width={16} 
                height={16} 
                className="opacity-80" 
              />
              <span className="text-sm">github</span>
            </a>
            <a
              href="mailto:workforprarthan@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
            >
        <Image
                src="/email.svg" 
                alt="Email" 
                width={16} 
                height={16} 
          className="opacity-80"
        />
              <span className="text-sm">email</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
