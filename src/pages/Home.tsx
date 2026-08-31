import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero, ProjectsDeck, Experience, Certifications, GitHubContributions } from "../components";
import { Reveal } from "../components/Reveal";

export function Home() {
  const location = useLocation();

  // Handle navigation state from sidebar (when coming from other pages)
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const id = state.scrollTo.slice(1); // remove leading #
      const el = document.getElementById(id);
      if (el) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      {/* halftone dotted divider */}
      <div aria-hidden="true" className="halftone halftone-wide mask-fade-x my-2 h-6 w-full opacity-[0.18]" />
      <ProjectsDeck />
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Certifications />
      </Reveal>
      <Reveal>
        <GitHubContributions />
      </Reveal>
    </>
  );
}

export const Component = Home;
