import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Smartphone, Monitor, ArrowLeft } from "lucide-react";
import { projects, type Project } from "../data/projects";

function ProjectDetail({ project, index }: { readonly project: Project; readonly index: number }) {
  return (
    <article
      id={project.id}
      className="reveal space-y-10"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
    >
      {/* Header */}
      <header className="space-y-4 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-3 flex-wrap">
          {project.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              {project.badge}
            </span>
          )}
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
            {project.year}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-gray-400">
            {project.kind === "mobile" ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
            {project.kind === "mobile" ? "Mobile" : "Web"}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl leading-none tracking-tight text-ink">
          {project.name}
        </h2>

        <div className="flex items-start gap-4 flex-wrap">
          <p className="text-[16px] leading-relaxed text-gray-600 max-w-2xl flex-1">
            {project.description}
          </p>
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-600 transition-all hover:border-accent/50 hover:text-accent hover:bg-accent/5"
                >
                  {link.label}
                  <ExternalLink className="h-3 w-3" strokeWidth={2} />
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Long Description */}
      {project.longDescription && (
        <section className="space-y-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
            overview
          </h3>
          <p className="text-[15px] leading-relaxed text-gray-600 max-w-3xl">
            {project.longDescription}
          </p>
        </section>
      )}

      {/* Screenshots */}
      {project.screenshots.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
            interface
          </h3>
          <div
            className={
              project.kind === "web"
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 lg:grid-cols-2 gap-4"
            }
          >
            {project.screenshots.map((shot, i) => (
              <figure key={`${project.id}-${i}`} className="relative">
                {project.kind === "web" ? (
                  <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-1 border-b border-gray-200 bg-white px-2 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                      <span className="ml-1.5 h-1.5 flex-1 rounded-full bg-gray-100" />
                    </div>
                    <div className="aspect-[15/8] w-full bg-gray-100">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        className="h-full w-full object-contain object-center"
                        draggable={false}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-gray-300 bg-gray-50 p-1.5">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <div className="flex justify-center bg-gray-50 pt-1">
                        <span className="h-1 w-8 rounded-full bg-gray-300" />
                      </div>
                      <div className="aspect-[1/2] w-full max-w-[320px] mx-auto bg-gray-100">
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          loading="lazy"
                          className="h-full w-full object-contain object-center"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-gray-400">
                      {shot.alt}
                    </figcaption>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Challenges / Solutions / Outcomes */}
      {(project.challenges?.length || project.solutions?.length || project.outcomes?.length) && (
        <section className="space-y-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
            case study
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {project.challenges?.length && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Challenges
                </h4>
                <ul className="space-y-2 text-[14px] leading-relaxed text-gray-600">
                  {project.challenges.map((c, i) => (
                    <li key={`${project.id}-challenge-${i}`} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.solutions?.length && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Solutions
                </h4>
                <ul className="space-y-2 text-[14px] leading-relaxed text-gray-600">
                  {project.solutions.map((s, i) => (
                    <li key={`${project.id}-solution-${i}`} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.outcomes?.length && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-violet-600 mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                  Outcomes
                </h4>
                <ul className="space-y-2 text-[14px] leading-relaxed text-gray-600">
                  {project.outcomes.map((o, i) => (
                    <li key={`${project.id}-outcome-${i}`} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-600 flex-shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section className="space-y-3 border-t border-gray-100 pt-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
          tech stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[12px] text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
          {project.context}
        </p>
      </section>
    </article>
  );
}

export function ProjectsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll to project from ProjectsDeck
  useEffect(() => {
    const state = location.state as { scrollToProject?: string } | null;
    if (state?.scrollToProject) {
      const projectId = state.scrollToProject;
      const el = document.getElementById(projectId);
      if (el) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    }
  }, [location]);

  return (
    <section className="py-14">
      <header className="mb-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-400 transition-colors hover:text-accent active:opacity-60 mb-6"
          type="button"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
          back
        </button>
        <h1 className="font-serif text-4xl leading-none tracking-tight">projects</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-gray-600">
          Selected work across mobile, web, and enterprise platforms.
        </p>
      </header>

      <div className="space-y-16 stagger">
        {projects.map((project, index) => (
          <ProjectDetail key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export const Component = ProjectsPage;