import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import "../index.css";

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {/* Page-wide halftone backdrop */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw] opacity-[0.16]"></div>
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw] opacity-[0.13]"></div>
      </div>

      <Sidebar />

      {/* Main content — centered, capped width, generous gutters */}
      <main className="relative z-10 lg:pl-56">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}