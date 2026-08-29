import type { ReactNode } from "react";

/**
 * Shared section heading — serif italic index number in the accent color,
 * letterspaced mono label, hairline rule, optional right-side action.
 */
export function SectionHeader({
  index,
  title,
  action,
}: {
  index: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <h2 className="flex items-baseline gap-2.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
        <span className="font-serif text-[17px] italic leading-none tracking-normal text-accent">
          {index}
        </span>
        {title}
      </h2>
      <div aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-gray-200 via-gray-200 to-transparent" />
      {action}
    </div>
  );
}
