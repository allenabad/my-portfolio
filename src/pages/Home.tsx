import { Hero, ProjectsDeck, Experience, Certifications, GitHubContributions } from "../components";
import { Reveal } from "../components/Reveal";

export function Home() {
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
