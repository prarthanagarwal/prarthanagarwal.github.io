import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ProjectCard from "@/components/ui/project-card";
import OptimizedImage from "@/components/ui/optimized-image";
import { projects } from "@/lib/projects-data";
import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans max-w-3xl mx-auto">
      <Navbar showHomeLink={false} />

      {/* Banner Image — blur-down LQIP */}
      <OptimizedImage
        src="/IMG_3769.JPG"
        alt="Banner - Sunset panorama"
        width={900}
        height={260}
        responsive
        maxHeight="240px"
        containerClassName="rounded-xl"
        priority
        sizes="(max-width: 768px) 100vw, 900px"
      />

      {/* Content */}
      <div className="pt-7">
        {/* Greeting */}
        <h1 className="text-[2.5rem] font-serif tracking-tight text-primary flex items-center gap-2">
          <span className="group cursor-default inline-flex items-center gap-2">
            Hello There
            <Image
              src="/hello-there-2.gif"
              alt="Hello there"
              width={64}
              height={64}
              className="inline-block w-11 h-11 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              unoptimized
            />
          </span>
        </h1>

        {/* New Intro */}
        <div className="pt-3 space-y-4 text-base leading-relaxed">
          <p>
            I&apos;m Prarthan Agarwal and welcome to my digital hangout :)
          </p>
          <p>
            an aspiring polymath — builder. designer, writer, developer, filmmaker.
            
            still figuring out which hat i like the most.
          </p>
          <p>
            my journey with tech started at 6, on a random sunday, when dad bought me a computer out of sheer fury. been on the internet since then, obsessed with ways of the world. 
            <br />
            I learn stuff to make more jokes, build stuff for the love of the game, and quote pop culture all day cuz its a pirate&apos;s life for me, savvy?
          </p>
          <p>
            <a
              href="https://x.com/prarthandon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-wavy underline-offset-3 transition-all duration-200 ease-in-out hover:text-title"
            >
              Twitter
            </a>{" "}
            is my deranged diary,{" "}
            
            pretentious cinephile at{" "}
            <a
              href="https://letterboxd.com/prarthanagarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-wavy underline-offset-3 transition-all duration-200 ease-in-out hover:text-title"
            >
              Letterboxd
            </a>
            <br />
            <span className="block mt-2">for more in-depth conversations, shoot{" "}
            <span className="inline-flex items-center">
              ✉️{" "}
              <a
                href="mailto:hey.prarthan@gmail.com"
                className="ml-1 text-primary no-underline underline-offset-4 transition-all duration-200 ease-in-out hover:underline hover:text-title"
              >
                hey.prarthan@gmail.com
              </a>
            </span>
            </span>
          </p>
        </div>

        {/* Divider */}
        <hr className="my-8 h-px border-0 bg-title/20" />

        {/* Actively Building - 2x2 Grid */}
        <section>
          <h2 className="font-medium tracking-tight text-title text-lg">
            Actively Building:
          </h2>
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/*<div className="group">
            <p className="mt-4 w-fit rounded-md border border-body/20 bg-hoverColor/60 px-2 py-1 text-xs text-body transition-all duration-300 ease-in-out">
              Feel free to explore my{" "}
              <a
                href="https://github.com/prarthanagarwal?tab=repositories"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-body underline underline-offset-2 transition-all duration-150 ease-in-out md:hover:text-primary md:group-hover:text-primary"
              >
                GitHub
              </a>{" "}
              for more projects. Most of them are open-source.
            </p>
          </div>*/}
        </section>
      </div>

      <Footer />
    </main>
  );
}
