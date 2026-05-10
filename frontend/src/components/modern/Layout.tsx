import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Building2, ClipboardList, FileText, User, Users } from "lucide-react";
import { CollegeLogo } from "./CollegeLogo";

interface LayoutProps {
  children: ReactNode;
  activeTab?: "companies" | "applications" | "profile" | "students" | "responses";
  role?: "student" | "spc";
  title?: string;
  className?: string;
}

export function ModernLayout({
  children,
  activeTab = "profile",
  role = "student",
  title,
  className,
}: LayoutProps) {
  const navItems =
    role === "student"
      ? [
          { id: "companies" as const, label: "Companies", icon: <Building2 size={23} /> },
          { id: "applications" as const, label: "Applications", icon: <FileText size={23} /> },
          { id: "profile" as const, label: "Profile", icon: <User size={23} /> },
        ]
      : [
          { id: "students" as const, label: "Students", icon: <Users size={23} /> },
          { id: "responses" as const, label: "Responses", icon: <ClipboardList size={23} /> },
          { id: "profile" as const, label: "Profile", icon: <User size={23} /> },
        ];

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center overflow-hidden bg-[#f8fbff] text-slate-950",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-[-30%] top-[-7rem] z-0 h-[22rem] rounded-b-[55%] bg-[#dff0ff] shadow-sm sm:h-[25rem]" />
      <div className="pointer-events-none absolute inset-x-[-20%] top-[-1rem] z-0 h-[18rem] rounded-b-[55%] bg-white sm:h-[20rem]" />

      <header className="z-10 mt-10 flex flex-col items-center sm:mt-12">
        <CollegeLogo imageClassName="w-44" />
        <h1 className="mt-3 text-xl font-medium tracking-tight text-slate-900">Placement</h1>
      </header>

      <main className="z-10 mt-8 flex w-full max-w-md flex-1 flex-col px-6 pb-28 sm:max-w-lg">
        {children}
      </main>

      {title && (
        <footer className="fixed bottom-5 z-20 w-full max-w-md px-6 sm:max-w-lg">
          <div className="mb-2 text-center text-xs font-medium text-slate-500">
            {title}
          </div>
          <nav
            aria-label={`${role === "student" ? "Student" : "SPC"} placement navigation`}
            className="flex items-center justify-between rounded-full border border-slate-100 bg-white/95 px-5 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur"
          >
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
              />
            ))}
          </nav>
        </footer>
      )}
    </div>
  );
}

function NavButton({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-full px-2 py-1 text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        active && "bg-slate-100 text-slate-800",
      )}
    >
      <span className="shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span className={cn("text-sm font-medium", active ? "inline" : "sr-only sm:not-sr-only")}>
        {label}
      </span>
    </button>
  );
}
