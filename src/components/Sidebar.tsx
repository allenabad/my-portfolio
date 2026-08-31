import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  Award,
  Briefcase,
  FolderGit2,
  Layers,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { GitHubIcon } from "./GitHubIcon";
import { ThemeToggle } from "./ThemeToggle";
import type { Theme } from "./ThemeToggle";

type SidebarLink = {
  label: string;
  to: string;
  icon?: ReactNode;
};

const navLinks: SidebarLink[] = [
  { label: "Projects", to: "#projects-deck", icon: <FolderGit2 /> },
  { label: "Experience", to: "#experience-deck", icon: <Briefcase /> },
  { label: "Stack", to: "#stack-deck", icon: <Layers /> },
  { label: "Certifications", to: "#certifications-deck", icon: <Award /> },
];

function scrollToSection(to: string) {
  const el = document.getElementById(to.slice(1));
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  to: string,
  location: ReturnType<typeof useLocation>
) {
  e.preventDefault();
  const isHome = location.pathname === "/";

  if (isHome) {
    // On home page: just scroll to section
    scrollToSection(to);
  } else {
    // On other pages: navigate to home page with hash fragment
    // HashRouter format: /#/section-id (the #/ is the router, section-id is the fragment)
    // This navigates to home route (/) and browser scrolls to element with id="section-id"
    window.location.href = `/#/${to.slice(1)}`;
  }
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable — fall through to system preference
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function Sidebar() {
  const [navOpen, setNavOpen] = useState(false);
  // Keeps the menu mounted through its exit fade (display is driven by navShown)
  const [navShown, setNavShown] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const location = useLocation();

  const openNav = () => {
    window.clearTimeout(closeTimer.current);
    if (navShown) {
      // Reopening mid-exit: retarget the running fade from its current opacity
      setNavOpen(true);
    } else {
      setNavShown(true); // fresh mount — the arming effect starts the entrance
    }
  };
  const closeNav = () => {
    setNavOpen(false);
    closeTimer.current = window.setTimeout(() => setNavShown(false), 320);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Arm the entrance once per mount — never on close or reopen
  const wasShown = useRef(false);
  useEffect(() => {
    if (!navShown) {
      wasShown.current = false;
      return;
    }
    if (wasShown.current) return; // already mounted: closing or reopened mid-exit
    wasShown.current = true;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setNavOpen(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [navShown]);

  // Apply the theme class; animate + persist only on explicit changes
  const prevTheme = useRef(theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    if (prevTheme.current === theme) return;
    root.classList.add("theme-anim");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // non-fatal — the switch still works, it just won't persist
    }
    const t = window.setTimeout(() => root.classList.remove("theme-anim"), 600);
    prevTheme.current = theme;
    return () => window.clearTimeout(t);
  }, [theme]);

  // Close on Escape and lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNav();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <>
      {/* ── Fixed left sidebar (lg+) — name + nav links + contact ── */}
      <nav className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-gray-200 bg-white px-7 py-8 lg:flex">
        <a href="/" className="shrink-0 font-serif text-lg leading-none tracking-tight hover:opacity-70">
          Allen Abad
        </a>

        <div className="mt-9 flex flex-col gap-2.5 overflow-y-auto font-mono text-[13px]">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              onClick={(e) => handleNavClick(e, link.to, location)}
              className="inline-flex w-fit items-center gap-2.5 text-gray-500 transition-colors hover:text-accent active:opacity-60 motion-safe:hover:translate-x-0.5"
            >
              {link.icon && (
                <span className="inline-flex h-[1.15em] w-[1.15em] shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                  {link.icon}
                </span>
              )}
              {link.label}
            </a>
          ))}
        </div>

        {/* Email + GitHub + theme switch — wraps instead of spilling past the w-56 edge */}
        <div className="mt-auto shrink-0 border-t border-gray-200 pt-5">
          <div className="mb-4">
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
          <p className="text-[11.5px] leading-relaxed text-gray-400">
            For work, collabs &amp; everything else, reach me at
          </p>
          <a
            href="mailto:vonallen.abad05@gmail.com"
            title="vonallen.abad05@gmail.com"
            className="mt-1.5 flex max-w-full items-start gap-1.5 break-all font-mono text-[11px] leading-tight text-ink hover:text-accent active:opacity-60"
          >
            <Mail className="mt-px h-[1.15em] w-[1.15em] shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <span className="min-w-0 break-all">vonallen.abad05@gmail.com</span>
          </a>
          <a
            href="https://github.com/allenabad"
            target="_blank"
            rel="noopener"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-500 hover:text-accent active:opacity-60"
          >
            <GitHubIcon className="h-[1.15em] w-[1.15em] shrink-0" />
            github.com/allenabad ↗
          </a>
        </div>
      </nav>

      {/* ── Mobile top bar (below lg) — translucent material, content scrolls under ── */}
      <header className="material-bar sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg backdrop-saturate-150 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <a href="/" className="font-serif text-base tracking-tight active:opacity-60">
            Allen Abad
          </a>
          <div className="-mr-1 flex items-center">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="rounded-full p-2 text-gray-500 hover:text-accent active:bg-gray-100"
            >
              {theme === "dark" ? (
                <Sun className="h-[17px] w-[17px]" strokeWidth={1.6} />
              ) : (
                <Moon className="h-[17px] w-[17px]" strokeWidth={1.6} />
              )}
            </button>
            <button
              type="button"
              onClick={openNav}
              aria-label="Open menu"
              aria-expanded={navOpen}
              className="rounded-lg p-2 text-gray-700 hover:text-ink active:bg-gray-100"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <dialog
        id="mobileNav"
        aria-label="Menu"
        className={`mobile-nav fixed inset-0 z-[60] m-0 h-full max-h-full w-full max-w-full flex-col bg-white lg:hidden ${navShown ? "flex" : ""} ${navOpen ? "is-open" : ""}`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
          <a href="/" className="font-serif text-base tracking-tight">
            Allen Abad
          </a>
          <button
            type="button"
            onClick={closeNav}
            aria-label="Close menu"
            className="-mr-1 rounded-lg p-1 text-gray-700 hover:text-ink active:bg-gray-100"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-7 py-8 font-mono text-[16px]">
          <div className="mnav-group flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  closeNav();
                  // For mobile: close menu first, then navigate
                  setTimeout(() => handleNavClick(e, link.to, location), 330);
                }}
                className="inline-flex w-fit items-center gap-3 text-gray-700 hover:text-accent active:opacity-60 motion-safe:hover:translate-x-0.5"
              >
                {link.icon && (
                  <span className="inline-flex h-[1.15em] w-[1.15em] shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                    {link.icon}
                  </span>
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* Email at bottom */}
          <div className="mnav-group mt-auto shrink-0 border-t border-gray-200 pt-6" style={{ transitionDelay: "0.18s" }}>
            <p className="font-sans text-[12px] leading-relaxed text-gray-400">
              For work, collabs &amp; everything else, reach me at
            </p>
            <a
              href="mailto:vonallen.abad05@gmail.com"
              className="mt-1.5 flex max-w-full items-start gap-2 break-all font-mono text-[14px] leading-tight text-ink hover:text-accent active:opacity-60"
            >
              <Mail className="mt-px h-[1.15em] w-[1.15em] shrink-0" strokeWidth={1.6} aria-hidden="true" />
              <span className="min-w-0 break-all">vonallen.abad05@gmail.com</span>
            </a>
            <a
              href="https://github.com/allenabad"
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex items-center gap-1.5 break-all font-mono text-[12px] text-gray-600 hover:text-accent active:opacity-60"
            >
              <GitHubIcon className="h-[1.15em] w-[1.15em] shrink-0" />
              github.com/allenabad ↗
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
