"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/log", label: "Daily Log" },
  { href: "/app/review", label: "Weekly Review" },
  { href: "/app/overlay", label: "Video Overlay" },
];

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--line)] bg-[rgba(255,255,255,0.76)] backdrop-blur">
        <div className="container flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link className="focus-ring rounded text-xl font-semibold" href="/app">
              宙序 ORIX
            </Link>
            <p className="mt-1 text-sm text-[var(--muted)]">Your private life operating system</p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--line)] bg-white text-[var(--muted)] hover:border-[var(--sage)]"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              className="focus-ring rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--clay)]"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      {children}
    </main>
  );
}
