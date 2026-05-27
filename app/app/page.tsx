"use client";

import Link from "next/link";
import { getDepartment, todayKey } from "@/lib/orix-store";
import { useOrixStore } from "./use-orix-store";

export default function DashboardPage() {
  const { state, ready, error } = useOrixStore();
  const today = todayKey();
  const todayLogs = state.dailyLogs.filter((log) => log.date === today);
  const totalXp = todayLogs.reduce((sum, log) => sum + log.xp, 0);
  const totalGold = todayLogs.reduce((sum, log) => sum + log.gold, 0);
  const latestLogs = [...state.dailyLogs].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  if (!ready) {
    return <div className="container py-12 text-[var(--muted)]">Loading ORIX...</div>;
  }

  return (
    <section className="container py-10">
      {error ? <p className="mb-6 rounded border border-[var(--clay)] bg-white p-4 text-sm font-semibold text-[var(--clay)]">{error}</p> : null}
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div>
          <p className="eyebrow">Today</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">人生总控台</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                今天不是为了完成所有事，只要让人生继续被看见、被推进、被复盘。
              </p>
            </div>
            <Link
              className="focus-ring w-fit rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white"
              href="/app/log"
            >
              记录今天
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MetricCard label="Today XP" value={`+${totalXp}`} />
            <MetricCard label="Today Gold" value={`A$ ${totalGold}`} />
            <MetricCard label="Logs" value={String(todayLogs.length)} />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {state.departments.map((department) => {
              const logs = state.dailyLogs.filter((log) => log.departmentId === department.id);
              const xp = logs.reduce((sum, log) => sum + log.xp, 0);
              const gold = logs.reduce((sum, log) => sum + log.gold, 0);
              return (
                <article className="quiet-card p-5" key={department.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-xl font-semibold">{department.name}</h2>
                    <span className="text-sm font-semibold text-[var(--sage)]">{department.english}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{department.mission}</p>
                  <div className="mt-5 flex gap-2 text-sm font-semibold">
                    <span className="rounded-full bg-[#e4eadf] px-3 py-1 text-[var(--sage)]">XP {xp}</span>
                    <span className="rounded-full bg-[#f0eee6] px-3 py-1 text-[var(--clay)]">Gold A$ {gold}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="quiet-card h-fit p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">最近推进</h2>
            <Link className="text-sm font-semibold text-[var(--sage)]" href="/app/overlay">
              做成浮层
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {latestLogs.length ? (
              latestLogs.map((log) => {
                const department = getDepartment(state, log.departmentId);
                return (
                  <div className="rounded border border-[var(--line)] bg-white p-4" key={log.id}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-[var(--sage)]">{department.english}</p>
                      <p className="text-xs text-[var(--muted)]">{log.date}</p>
                    </div>
                    <p className="mt-2 font-semibold leading-6">{log.content}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">XP +{log.xp} · Gold A$ {log.gold}</p>
                  </div>
                );
              })
            ) : (
              <p className="rounded border border-dashed border-[var(--line)] p-5 text-sm leading-6 text-[var(--muted)]">
                还没有记录。先从今天的一件小事开始，比如洗碗间上完班：Gold +128，XP +8。
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="quiet-card p-5">
      <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
      <p className="mt-3 text-4xl font-semibold">{value}</p>
    </div>
  );
}
