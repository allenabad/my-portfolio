import { Moon, Sun } from "lucide-react";

export type Theme = "light" | "dark";

/**
 * Pill-style light/dark switch — active mode gets a filled chip,
 * matching the minimal mono aesthetic of the rest of the chrome.
 */
export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-px rounded-full border border-gray-200 p-0.5"
    >
      {(
        [
          { value: "light", label: "Light mode", icon: <Sun /> },
          { value: "dark", label: "Dark mode", icon: <Moon /> },
        ] as const
      ).map((opt) => {
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-label={opt.label}
            aria-pressed={active}
            className={`flex h-[1.35rem] w-[1.35rem] items-center justify-center rounded-full transition-colors motion-safe:active:scale-90 ${
              active ? "bg-gray-100 text-ink" : "text-gray-400 hover:text-accent"
            }`}
          >
            <span className="inline-flex h-[13px] w-[13px] [&>svg]:h-full [&>svg]:w-full">
              {opt.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}
