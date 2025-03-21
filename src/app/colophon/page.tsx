"use client";

import MainLayout from '@/components/layout/main-layout';
import Link from 'next/link';

export default function Colophon() {
  return (
    <MainLayout showHomeLink>
      <h1 className="text-[2.5rem] font-serif tracking-tight text-primary">Colophon</h1>
      <h2 className="text-base font-medium tracking-tight text-title">
        /ˈkɒləfən/ — a brief statement at a book's end detailing its production.
      </h2>

      <p className="pt-4 text-sm font-normal text-body">
        Basically, it's a fancy word that I'm using to describe this website. This site is crafted with{" "}
        <span className="text-black">Astro</span> and{" "}
        <span className="text-black">React</span>, hosted on{" "}
        <span className="text-black">Vercel</span>, and designed in{" "}
        <span className="text-black">Figma</span>. Plus, it's{" "}
        <span className="text-black">eco-friendly</span>, producing only{" "}
        <a
          href="https://www.websitecarbon.com/website/lakshb.dev/"
          rel="noopenner noreferrer"
          target="_blank"
          className="text-black underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
        >
          0.07g of CO2
        </a>{" "}
        every time someone visits.
      </p>

      <section>
        <h2 className="pt-8 text-base font-medium tracking-tight text-title">
          Inspiration
        </h2>
        <p className="pt-4 text-sm font-normal">
          This website is heavily inspired by the works of{" "}
          <a
            href="https://cassandratang.com"
            rel="noopenner noreferrer"
            target="_blank"
            className="underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
          >
            Cassandra Tang
          </a>,{" "}
          <a
            href="https://nexxel.dev"
            rel="noopenner noreferrer"
            target="_blank"
            className="underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
          >
            nexxel
          </a>,{" "}
          <a
            href="https://www.grujicic.com/"
            rel="noopenner noreferrer"
            target="_blank"
            className="underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
          >
            Chic and Geek
          </a>,{" "}
          <a
            href="https://emilkowal.ski/"
            rel="noopenner noreferrer"
            target="_blank"
            className="underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
          >
            Emil Kowalski
          </a>, and many more.
        </p>
      </section>

      <section>
        <h2 className="pt-8 text-base font-medium tracking-tight text-title">
          Personal Stack
        </h2>
        <ul className="list-disc px-4 pt-4 text-sm text-body">
          <li>
            <span className="text-black">Arc</span> — A better way to browse the web.
          </li>
          <li>
            <span className="text-black">Raycast</span> — Mac's spotlight on steroids.
          </li>
          <li>
            <span className="text-black">Spotify</span> — Music for every moment.
          </li>
          <li>
            <span className="text-black">TickTick</span> — Task management made simple.
          </li>
          <li>
            <span className="text-black">Notion</span> — My personal note taking app.
          </li>
          <li>
            <span className="text-black">VSCode</span> — Developer's best friend.
          </li>
          <li>
            <span className="text-black">iTerm2</span> — Better terminal for MacOS.
          </li>
        </ul>
        <p className="pt-2 text-sm">and many more...</p>
      </section>

      <section>
        <h2 className="pt-8 text-base font-medium tracking-tight text-title">
          Now Playing
        </h2>
        <div className="w-fit pt-4">
          <a
            href="https://open.spotify.com/user/amcdf5xiittevf5gl1ecjqfyu"
            rel="noopener noreferrer"
            target="_blank"
            style={{ opacity: 1, transform: "none" }}
            className="flex items-center gap-2 text-sm text-body transition-all duration-300 ease-in-out md:hover:scale-105"
          >
            <div className="h-10 w-10 bg-emerald-500 flex items-center justify-center rounded">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.192.192-.459.287-.723.287s-.531-.096-.723-.287a6.038 6.038 0 0 0-8.512 0 1.02 1.02 0 0 1-1.447 0 1.024 1.024 0 0 1 0-1.447 8.079 8.079 0 0 1 11.405 0 1.022 1.022 0 0 1 0 1.447zm-2.469-2.469c-.192.192-.459.289-.723.289s-.531-.098-.723-.289a3.88 3.88 0 0 0-5.47 0 1.024 1.024 0 0 1-1.447-1.447 5.92 5.92 0 0 1 8.365 0c.4.399.4 1.047 0 1.447h-.002zm-2.468-2.468c-.192.192-.459.287-.723.287s-.531-.096-.723-.287a1.713 1.713 0 0 0-2.426 0 1.024 1.024 0 0 1-1.447-1.447 3.77 3.77 0 0 1 5.32 0c.4.399.4 1.047 0 1.447z"/>
              </svg>
            </div>
            <p className="text-xs">
              <span className="font-medium text-black underline-offset-4 transition duration-150 ease-in-out">Not playing</span>
              <br />
              Click to view my profile.
            </p>
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
