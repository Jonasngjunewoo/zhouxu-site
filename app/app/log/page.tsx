"use client";

import { useState } from "react";
import { todayKey, uid, type DailyLog } from "@/lib/orix-store";
import { useOrixStore } from "../use-orix-store";

export default function LogPage() {
  const { state, setState, error } = useOrixStore();
  const [departmentId, setDepartmentId] = useState("cash-flow");
  const [content, setContent] = useState("");
  const [learned, setLearned] = useState("");
  const [earned, setEarned] = useState("");
  const [xp, setXp] = useState(8);
  const [gold, setGold] = useState(0);
  const [useForVideo, setUseForVideo] = useState(true);
  const [saved, setSaved] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    const log: DailyLog = {
      id: uid("log"),
      date: todayKey(),
      departmentId,
      content,
      learned,
      earned,
      xp,
      gold,
      useForVideo,
      createdAt: new Date().toISOString(),
    };

    const savedToCloud = await setState((current) => ({ ...current, dailyLogs: [log, ...current.dailyLogs] }));
    if (!savedToCloud) return;
    setContent("");
    setLearned("");
    setEarned("");
    setXp(8);
    setGold(0);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <section className="container py-10">
      <div className="max-w-3xl">
        <p className="eyebrow">Daily Log</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-normal">今天是学到了，还是赚到了？</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--muted)]">30 秒记录一条推进。不要写成报告，写成施工日志。</p>
      </div>

      <form className="quiet-card mt-8 grid gap-5 p-6 md:p-8" onSubmit={submit}>
        <label className="grid gap-2 text-sm font-semibold">
          部门
          <select
            className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
            onChange={(event) => setDepartmentId(event.target.value)}
            value={departmentId}
          >
            {state.departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name} · {department.english}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          今天做了什么？
          <input
            className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
            onChange={(event) => setContent(event.target.value)}
            placeholder="例如：洗碗间上完早班，回家路上整理今天的现金流。"
            required
            value={content}
          />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            学到了什么？
            <textarea
              className="focus-ring min-h-28 rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              onChange={(event) => setLearned(event.target.value)}
              placeholder="例如：早班前要提前准备饭，体力管理也是现金流管理。"
              value={learned}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            赚到了什么？
            <textarea
              className="focus-ring min-h-28 rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              onChange={(event) => setEarned(event.target.value)}
              placeholder="例如：A$128，稳定现金流部继续运转。"
              value={earned}
            />
          </label>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-semibold">
            XP
            <input
              className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              min="0"
              onChange={(event) => setXp(Number(event.target.value))}
              type="number"
              value={xp}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Gold (A$)
            <input
              className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              min="0"
              onChange={(event) => setGold(Number(event.target.value))}
              type="number"
              value={gold}
            />
          </label>
          <label className="flex items-center gap-3 rounded border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold">
            <input checked={useForVideo} onChange={(event) => setUseForVideo(event.target.checked)} type="checkbox" />
            可作为视频素材
          </label>
        </div>
        <button className="focus-ring w-fit rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white" type="submit">
          保存 Daily Log
        </button>
        {error ? <p className="text-sm font-semibold text-[var(--clay)]">{error}</p> : null}
        {saved ? <p className="text-sm font-semibold text-[var(--sage)]">已保存。人生继续施工。</p> : null}
      </form>
    </section>
  );
}
