import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data/projects";

function ScreenshotFrame({
  kind,
  shot,
}: {
  readonly kind: "mobile" | "web";
  readonly shot: { readonly src: string; readonly alt: string };
}) {
  if (kind === "web") {
    return (
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1 border-b border-gray-200 bg-white px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="ml-1.5 h-1.5 flex-1 rounded-full bg-gray-100" />
        </div>
        <div className="aspect-[16/10] w-full">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="h-full w-full object-cover object-top"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-300 bg-gray-50 p-1.5">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex justify-center bg-gray-50 pt-1">
          <span className="h-1 w-8 rounded-full bg-gray-300" />
        </div>
        <div className="aspect-[9/19] w-full max-w-[280px] mx-auto">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export function ProjectsDeck() {
  return (
    <section id="projects-deck" className="py-14">
      <SectionHeader
        index="01"
        title="projects"
        action={
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-gray-500 transition-colors hover:text-accent active:opacity-60"
          >
            all projects
            <ArrowLeft className="h-3 w-3 -rotate-180" strokeWidth={2} />
          </Link>
        }
      />

      <div className="flex flex-col gap-8 stagger">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="group relative flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-gray-300 hover:[box-shadow:var(--shadow-card)] reveal"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            {/* Header: badge + year */}
            <div className="flex items-center justify-between gap-4">
              {project.badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  {project.badge}
                </span>
              )}
              <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-gray-400">
                {project.year}
              </span>
            </div>

            {/* Title + icon */}
            <div className="flex items-start gap-4">
              <img
                src={project.icon}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 shrink-0 select-none rounded-xl transition-transform duration-300 motion-safe:group-hover:scale-[1.06]"
                draggable={false}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-[20px] font-semibold leading-tight text-ink">
                  {project.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-gray-600">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gray-400">
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              {project.role}
            </div>

            {/* Screenshots */}
            <div
              className={
                project.kind === "web"
                  ? "flex flex-col gap-2"
                  : "grid grid-cols-2 gap-2"
              }
            >
              {project.screenshots.map((shot) => (
                <ScreenshotFrame key={shot.src} kind={project.kind} shot={shot} />
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer: context + link to case study */}
            <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
                {project.context}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}