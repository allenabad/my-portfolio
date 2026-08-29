import { ArrowUpRight, Download } from "lucide-react";
import avatarUrl from "../assets/allen.png";

const socialLinks = [
  { label: "github", href: "https://github.com/allenabad" },
  { label: "linkedin", href: "https://www.linkedin.com/in/allen-abad" },
  { label: "gmail", href: "mailto:vonallen.abad05@gmail.com" },
];

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-28">
      <div className="grid gap-9 sm:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr] sm:items-start sm:gap-10">
        {/* Photo column */}
        <div className="reveal d1 mx-auto w-full max-w-[22rem] sm:mx-0">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Allen Abad"
              className="block w-full select-none grayscale"
              draggable={false}
            />
            {/* halftone: dots concentrated toward the bottom, fading up the photo */}
            <div
              aria-hidden="true"
              className="halftone-white mask-up pointer-events-none absolute inset-x-0 bottom-0 h-full"
            ></div>
          </div>
        </div>

        {/* Text column */}
        <div>
          <h1 className="reveal d2 font-serif text-4xl leading-none tracking-tight sm:text-[2.75rem] lg:text-5xl">
            Allen Abad
          </h1>
          <div aria-hidden="true" className="rule-grow mt-4 h-[3px] w-12 rounded-full bg-accent" />

          <p className="reveal d3 mt-6 text-[15px] leading-relaxed text-gray-600">
            I’m a Software Developer specializing in JavaScript/TypeScript, with a strong focus on building responsive and user-friendly interfaces using React and React Native.
          </p>

          <p className="reveal d4 mt-5 text-[15px] leading-relaxed text-gray-600">
            I actively leverage modern AI tools like GitHub Copilot, Cursor, Claude Code, and Microsoft Copilot to boost productivity and code quality. Passionate about crafting intuitive UI and continuous learning.
          </p>

          {/* links below the intro */}
          <div className="reveal d5 mt-7 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 font-mono text-[12px] text-gray-500">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener"}
                className="underline-offset-[3px] transition-colors hover:text-accent hover:underline active:opacity-60"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </a>
            ))}
          </div>

          {/* Resume download */}
          <div className="reveal d6 mt-6">
            <a
              href="/VonAllenAbad-Resume.pdf"
              download="VonAllenAbad-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-gray-600 transition-all hover:border-accent/50 hover:text-accent hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
            >
              <Download className="h-4 w-4" strokeWidth={2} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
