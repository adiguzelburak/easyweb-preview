import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Closing } from "@/components/sections/Closing";
import { Family } from "@/components/sections/Family";
import { Intro } from "@/components/sections/Intro";
import { Playbook } from "@/components/sections/playbook/Playbook";
import { Hero } from "@/components/sections/showcase/Hero";
import { Portfolio } from "@/components/sections/showcase/Portfolio";
import { Showcase } from "@/components/sections/showcase/Showcase";
import { Team } from "@/components/sections/Team";
import { Traction } from "@/components/sections/Traction";
import { company, ui } from "@/content/site";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        {ui.skipToContent}
      </a>
      <Intro />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Showcase>
          <Hero />
          <Portfolio />
        </Showcase>
        <Playbook />
        <Traction />
        <Family />
        {company.showTeam && <Team />}
        <Closing />
      </main>
      <Footer />
    </>
  );
}
