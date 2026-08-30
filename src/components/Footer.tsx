import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative z-10 lg:pl-56">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10 py-10">
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <p className="font-mono text-[11px] text-gray-400">
          © 2026 Allen Abad
        </p>
        <Link
          to="/"
          className="font-mono text-[11px] text-gray-400 hover:text-accent active:opacity-60"
        >
          ← back to site
        </Link>
        </div>
      </div>
    </footer>
  );
}
