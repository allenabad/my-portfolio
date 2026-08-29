export function ExperiencePage() {
  return (
    <>
      <header className="mb-12">
        <h1 className="font-serif text-4xl leading-none tracking-tight">experience</h1>
      </header>

      <p className="mb-14 max-w-xl text-[15px] leading-relaxed text-gray-600">
        Designing and building mobile and web applications — from enterprise
        systems for global brands to hands-on frontend engineering.
      </p>

      <div className="space-y-0">
        {/* Ascensoft Inc. */}
        <div className="relative flex gap-4 sm:gap-5">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white font-serif text-[13px] italic text-ink">
              AS
            </div>
            <div className="mt-2 w-px flex-1 bg-gray-200"></div>
          </div>
          <div className="flex-1 pb-12">
            <h2 className="text-[16px] font-semibold leading-snug text-ink">Ascensoft Inc.</h2>
            <p className="mt-1 font-mono text-[12px] text-gray-500">Full-time</p>
            <p className="mt-0.5 font-mono text-[11px] text-gray-400">Muntinlupa, Alabang · Philippines</p>

            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[15px] font-medium text-ink">Software Developer</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gray-400">Oct 2023 – Present</p>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-gray-600">
                  <p>Design and develop mobile and web applications for Procter &amp; Gamble using JavaScript/TypeScript, React, React Native, Node.js, REST APIs, and SQL.</p>
                  <p>Implement new features, refactor and optimize existing code for maintainability and performance, and apply best practices in testing and deployment using Git and Azure.</p>
                  <p>Introduced and integrated AI-assisted development tools (GitHub Copilot, Cursor, Microsoft Copilot) to streamline coding and review workflows.</p>
                  <p>Built a field-and-office logistics companion for enterprise operations — shipment and returns handling with scanning, documents, signatures, offline support, and permissioned roles. Also built a daily money-tracking tool for a business moving funds across currencies and multiple banks.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[11px] text-gray-600">React Native</span>
                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[11px] text-gray-600">TypeScript</span>
                  <span className="rounded-md border border-dashed border-gray-300 px-2.5 py-1 font-mono text-[11px] text-gray-400">+3 skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hacktiv Collab Inc. */}
        <div className="relative flex gap-4 sm:gap-5">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white font-serif text-[13px] italic text-ink">
              HC
            </div>
          </div>
          <div className="flex-1 pb-4">
            <h2 className="text-[16px] font-semibold leading-snug text-ink">Hacktiv Collab Inc.</h2>
            <p className="mt-1 font-mono text-[12px] text-gray-500">Internship</p>
            <p className="mt-0.5 font-mono text-[11px] text-gray-400">Makati Ave · Philippines</p>

            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[15px] font-medium text-ink">Web Developer Intern</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gray-400">Mar 2023 – Jul 2023</p>
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-gray-600">
                  <p>Built a straightforward login, signup, and landing page using React, Tailwind CSS, Redux, CryptoJS, and JSON Server — laying the groundwork for practical front-end skills.</p>
                  <p>Developed a Property Management System with contemporary technologies such as React.js, Tailwind CSS, Redux, Crypto.js, and other React libraries — reimagining an existing system built by Raven Global, Hacktiv Collab&apos;s sister company.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[11px] text-gray-600">React</span>
                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 font-mono text-[11px] text-gray-600">Tailwind CSS</span>
                  <span className="rounded-md border border-dashed border-gray-300 px-2.5 py-1 font-mono text-[11px] text-gray-400">+2 skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div id="education" className="mt-16 scroll-mt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
          <span className="font-serif text-[17px] italic leading-none tracking-normal text-accent">ed</span>{" "}
          — education
        </h2>

        <div className="mt-5 flex gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white font-serif text-[13px] italic text-ink">
            TUP
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-medium text-ink">Technological University of the Philippines</h3>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              Bachelor of Science in Information Technology
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gray-400">
              Ermita, Manila · Graduated Aug 2023
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
              Active participant in the Google Developer Student Club.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const Component = ExperiencePage;
