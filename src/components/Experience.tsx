import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  const experience = [
    {
      year: "2023",
      title: "Software Developer",
      company: "Ascensoft Inc.",
    },
    {
      year: "2023",
      title: "Web Developer Intern",
      company: "Hacktiv Collab Inc.",
    },
  ];

  const stack = [
    "TypeScript",
    "JavaScript",
    "React",
    "React Native",
    "Tailwind CSS",
    "Node.js",
    "SQL",
    "REST APIs",
    "Git",
    "Azure",
    "Copilot",
    "Cursor",
    "Bruno",
    "Claude",
  ];

  return (
    <section id="experience-deck" className="py-14">
      <SectionHeader
        index="02"
        title="experience"
        action={
          <Link
            to="/experience"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-gray-500 transition-colors hover:text-accent active:opacity-60"
          >
            full history
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Link>
        }
      />

      <div className="divide-y divide-gray-200 border-y border-gray-200 stagger">
        {experience.map((exp, index) => (
          <div
            key={exp.title}
            className="group grid grid-cols-12 items-baseline gap-3 py-2.5 transition-colors hover:bg-gray-50/80 reveal"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            <div className="col-span-2 font-serif text-[13px] italic text-accent">
              {exp.year}
            </div>
            <div className="col-span-10 sm:col-span-6 text-[14px] font-medium text-ink">
              {exp.title}
            </div>
            <div className="col-span-12 sm:col-span-4 text-[13px] text-gray-500 sm:text-right">
              {exp.company}
            </div>
          </div>
        ))}
      </div>

      <div id="stack-deck" className="mt-7 scroll-mt-8">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-gray-400">
          Stack
        </h3>
        <div className="flex flex-wrap gap-2 stagger">
          {stack.map((tech, index) => (
            <span
              key={tech}
              className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[12px] text-gray-600 reveal"
              style={{ animationDelay: `${(index + 1) * 40}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
