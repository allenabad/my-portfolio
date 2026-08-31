import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, Award } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import cert1 from "../assets/cert1.PNG";
import cert2 from "../assets/cert2.jpg";
import cert3 from "../assets/cert3.jpg";

type Certification = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badges: string[];
  image: string;
  issuer: string;
  context: string;
  verifyUrl?: string;
};

const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "JavaScript Programming",
    tagline: "JavaScript Fundamentals & Web Dev",
    description:
      "Comprehensive JavaScript programming covering modern ES6+, async patterns, and full-stack application development.",
    badges: ["Professional Certification", "JP Morgan Partner"],
    image: cert1,
    issuer: "Bayan Academy",
    context: "Issued 2023",
    verifyUrl: "#",
  },
  {
    id: "cert-2",
    name: "Double Study Jam",
    tagline: "Python Web Frameworks",
    description:
      "Intensive Google Developer Study Jam covering Python Frameworks such as Django and Flask.",
    badges: ["Google Verified", "DSC TUPM"],
    image: cert2,
    issuer: "Google Developer Student Clubs (TUPM)",
    context: "Completed 2023",
    verifyUrl: "#",
  },
  {
    id: "cert-3",
    name: "Learn2Design",
    tagline: "Graphic Design Fundamentals",
    description:
      "Hands-on graphic design workshop covering typography, layout, color theory, and brand identity design principles using Figma.",
    badges: ["Workshop Complete", "TUP Manila"],
    image: cert3,
    issuer: "TypeBeast & Technical University of the Philippines",
    context: "Completed 2023",
    verifyUrl: "#",
  },
];

/* ──────────────────────────────────────────────
   Certificate Card — grid thumbnail
   ────────────────────────────────────────────── */
function CertificateCard({
  cert,
  index,
  onOpen,
}: {
  readonly cert: Certification;
  readonly index: number;
  readonly onOpen: (index: number) => void;
}) {
  const handleClick = () => onOpen(index);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(index);
    }
  };

  return (
    <button
      type="button"
      className="group reveal relative flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View ${cert.name} certificate`}
    >
      {/* Image frame */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl border-b border-gray-200 bg-gray-50">
        <img
          src={cert.image}
          alt={`${cert.name} certificate`}
          className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          draggable={false}
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        {/* View indicator */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/20 rounded">
            View Certificate
          </span>
          <Award className="h-5 w-5 text-white/80 drop-shadow" strokeWidth={1.5} />
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 space-y-2 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
          {cert.badges.join("  ·  ")}
        </p>
        <h3 className="text-[18px] font-semibold leading-tight text-ink group-hover:text-accent transition-colors">
          {cert.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-gray-500 font-normal">
          {cert.tagline}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
          {cert.context}
        </p>
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────
   Lightbox Modal — full-screen certificate view
   ────────────────────────────────────────────── */
function CertificateLightbox({
  cert,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  readonly cert: Certification;
  readonly index: number;
  readonly total: number;
  readonly onClose: () => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}) {
  const overlayRef = useCallback((el: HTMLDialogElement | null) => {
    if (el) {
      el.showModal();
      el.focus();
    }
  }, []);

  // Trap focus
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 border-none p-0"
      aria-label={`${cert.name} certificate`}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Close certificate view"
      >
        <X className="h-6 w-6" strokeWidth={2} />
      </button>

      {/* Navigation — hidden on single item */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            disabled={index === 0}
            className="absolute left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            className="absolute right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={2} />
          </button>
        </>
      )}

      {/* Counter */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-white/60">
          {index + 1} / {total}
        </div>
      )}

      {/* Certificate Content */}
      <div className="relative w-full max-w-3xl mx-6 my-12 flex flex-col">
        {/* Image — full size, contained */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10 bg-gray-900">
          <img
            src={cert.image}
            alt={`${cert.name} certificate — full view`}
            className="w-full h-full object-contain p-4"
            draggable={false}
          />
        </div>

        {/* Metadata Panel */}
        <div className="mt-6 space-y-4 px-2">
          <div className="flex flex-wrap gap-2">
            {cert.badges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Issuer</p>
                <p className="text-white/90">{cert.issuer}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Specialization</p>
                <p className="text-white/90">{cert.tagline}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Status</p>
                <p className="text-white/90">{cert.context}</p>
              </div>
              {cert.verifyUrl && cert.verifyUrl !== "#" && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Verification</p>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-accent hover:text-accent/70 font-mono text-[11px] underline-offset-2"
                  >
                    Verify on Credly
                    <ExternalLink className="h-3 w-3" strokeWidth={2} />
                  </a>
                </div>
              )}
            </div>

            <p className="text-white/60 leading-relaxed text-[14px] border-t border-white/10 pt-4">
              {cert.description}
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export function Certifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setOpenIndex(index);
  const closeLightbox = () => setOpenIndex(null);
  const goPrev = () => setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : 0));
  const goNext = () =>
    setOpenIndex((i) => (i !== null && i < certifications.length - 1 ? i + 1 : certifications.length - 1));

  return (
    <section id="certifications-deck" className="py-14">
      <SectionHeader index="03" title="certifications" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
        {certifications.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} onOpen={openLightbox} />
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <CertificateLightbox
          cert={certifications[openIndex]}
          index={openIndex}
          total={certifications.length}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}