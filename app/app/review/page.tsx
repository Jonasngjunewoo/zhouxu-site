"use client";

import { useState } from "react";
import { todayKey, uid, type WeeklyReview } from "@/lib/orix-store";
import { useOrixStore } from "../use-orix-store";

export default function ReviewPage() {
  const { state, setState, error } = useOrixStore();
  const [form, setForm] = useState({
    movedForward: "",
    stuckPoints: "",
    departmentAttention: "Cash Flow",
    lessons: "",
    nextWeekFocus: "",
  });
  const latest = state.weeklyReviews[0];

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const review: WeeklyReview = {
      id: uid("review"),
      weekStart: todayKey(),
      ...form,
      createdAt: new Date().toISOString(),
    };
    const saved = await setState((current) => ({ ...current, weeklyReviews: [review, ...current.weeklyReviews] }));
    if (!saved) return;
    setForm({ movedForward: "", stuckPoints: "", departmentAttention: "Cash Flow", lessons: "", nextWeekFocus: "" });
  }

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_0.72fr]">
      <div>
        <p className="eyebrow">Weekly Review</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-normal">每周把人生重新看一遍。</h1>
        <form className="quiet-card mt-8 grid gap-5 p-6 md:p-8" onSubmit={submit}>
          <ReviewField label="本周有什么推进？" value={form.movedForward} onChange={(value) => update("movedForward", value)} />
          <ReviewField label="本周哪里卡住了？" value={form.stuckPoints} onChange={(value) => update("stuckPoints", value)} />
          <label className="grid gap-2 text-sm font-semibold">
            哪个部门最需要注意？
            <select
              className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              onChange={(event) => update("departmentAttention", event.target.value)}
              value={form.departmentAttention}
            >
              {state.departments.map((department) => (
                <option key={department.id}>{department.english}</option>
              ))}
            </select>
          </label>
          <ReviewField label="本周获得了什么经验？" value={form.lessons} onChange={(value) => update("lessons", value)} />
          <ReviewField label="下周最重要的三件事是什么？" value={form.nextWeekFocus} onChange={(value) => update("nextWeekFocus", value)} />
          <button className="focus-ring w-fit rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white" type="submit">
            保存 Weekly Review
          </button>
          {error ? <p className="text-sm font-semibold text-[var(--clay)]">{error}</p> : null}
        </form>
      </div>
      <aside className="quiet-card h-fit p-6">
        <h2 className="text-2xl font-semibold">最近一次复盘</h2>
        {latest ? (
          <div className="mt-5 space-y-4 text-sm leading-6 text-[var(--muted)]">
            <p>
              <span className="font-semibold text-[var(--ink)]">推进：</span>
              {latest.movedForward}
            </p>
            <p>
              <span className="font-semibold text-[var(--ink)]">卡点：</span>
              {latest.stuckPoints}
            </p>
            <p>
              <span className="font-semibold text-[var(--ink)]">注意：</span>
              {latest.departmentAttention}
            </p>
            <p>
              <span className="font-semibold text-[var(--ink)]">下周：</span>
              {latest.nextWeekFocus}
            </p>
          </div>
        ) : (
          <p className="mt-5 rounded border border-dashed border-[var(--line)] p-5 text-sm leading-6 text-[var(--muted)]">
            还没有复盘。第一版只需要诚实，不需要漂亮。
          </p>
        )}
      </aside>
    </section>
  );
}

function ReviewField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <textarea
        className="focus-ring min-h-24 rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
        onChange={(event) => onChange(event.target.value)}
        required
        value={value}
      />
    </label>
  );
}
