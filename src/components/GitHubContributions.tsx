import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Day = { date: string; count: number; level: number };

const USERNAME = "allenabad";
const API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

// Halftone dot mapping
// level 0: tiny dim dot  ·  level 1-4: progressively larger solid dots
function dot(countLevel: number) {
  if (countLevel === 0) return { r: 1.1, opacity: 0.12 };
  if (countLevel === 1) return { r: 2.7, opacity: 0.92 };
  if (countLevel === 2) return { r: 3.8, opacity: 0.92 };
  if (countLevel === 3) return { r: 4.8, opacity: 0.92 };
  return { r: 5.7, opacity: 0.92 }; // level 4
}

export function GitHubContributions() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { total: { lastYear: number }; contributions: Day[] }) => {
        setDays(d.contributions);
        setTotal(d.total.lastYear);
      })
      .catch(() => setErr(true));
  }, []);

  // Layout: 53 weeks × 7 rows
  const WEEKS = 53;
  const CELL = 13;
  const PAD = 6.5;

  let graph: ReactNode;
  if (days) {
    graph = (
      <svg
        viewBox={`0 0 ${WEEKS * CELL} ${7 * CELL}`}
        className="h-auto w-full text-ink"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="GitHub contribution graph, halftone style"
      >
        {days.map((d, i) => {
          const col = Math.floor(i / 7);
          const row = i % 7;
          if (col >= WEEKS) return null;
          const cx = PAD + col * CELL;
          const cy = PAD + row * CELL;
          const { r, opacity } = dot(d.level);
          return (
            <circle
              key={d.date}
              cx={cx}
              cy={cy}
              r={r}
              fill="currentColor"
              opacity={opacity}
              className="gh-dot"
              style={{ animationDelay: `${col * 8}ms`, animationFillMode: 'backwards' }}
            >
              <title>
                {d.count} contribution{d.count !== 1 ? "s" : ""} on {d.date}
              </title>
            </circle>
          );
        })}
      </svg>
    );
  } else if (err) {
    // graceful fallback — build still succeeds offline
    graph = (
      <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-wider text-gray-400">
        contributions unavailable —{" "}
        <span className="normal-case underline decoration-dotted underline-offset-2">visit github.com/{USERNAME}</span>
      </div>
    );
  } else {
    graph = (
      <div className="halftone mask-fade-x h-[91px] w-full animate-pulse opacity-[0.12]" aria-hidden="true" />
    );
  }

  let caption: string;
  if (total !== null) {
    caption = `${total.toLocaleString()} contributions in the last year`;
  } else if (err) {
    caption = "";
  } else {
    caption = "loading contributions…";
  }

  return (
    <section id="github" className="py-14">
      <SectionHeader
        index="04"
        title="github"
        action={
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-0.5 font-mono text-[11px] uppercase tracking-wider text-gray-500 transition-colors hover:text-accent active:opacity-60"
          >
            @{USERNAME}
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
        }
      />

      <a
        href={`https://github.com/${USERNAME}`}
        target="_blank"
        rel="noopener"
        className="group block"
        aria-label="GitHub contribution graph — halftone style"
      >
        {graph}
      </a>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gray-400">
        {caption}
      </p>
    </section>
  );
}
