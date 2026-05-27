"use client";

import { useMemo, useState } from "react";
import { getDepartment, uid, type OverlayEvent } from "@/lib/orix-store";
import { useOrixStore } from "../use-orix-store";

export default function OverlayPage() {
  const { state, setState, error } = useOrixStore();
  const [departmentId, setDepartmentId] = useState("cash-flow");
  const [title, setTitle] = useState("洗碗间早班完成");
  const [mode, setMode] = useState<"xp" | "gold">("gold");
  const [amount, setAmount] = useState(128);
  const [note, setNote] = useState("Stable cash flow department");
  const [format, setFormat] = useState<"landscape" | "portrait">("landscape");
  const department = getDepartment(state, departmentId);
  const recent = useMemo(() => state.overlayEvents.slice(0, 4), [state.overlayEvents]);

  async function save() {
    const event: OverlayEvent = {
      id: uid("overlay"),
      title,
      departmentId,
      mode,
      amount,
      note,
      createdAt: new Date().toISOString(),
    };
    await setState((current) => ({ ...current, overlayEvents: [event, ...current.overlayEvents] }));
  }

  return (
    <section className="container grid gap-8 py-10 xl:grid-cols-[0.88fr_1.12fr]">
      <div>
        <p className="eyebrow">Video Overlay</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-normal">把生活推进变成镜头语言。</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
          第一版用网页截图或录屏导出。拍完洗碗间、课堂、路上、剪辑台，再把 ORIX 浮层叠上去。
        </p>

        <div className="quiet-card mt-8 grid gap-5 p-6">
          <label className="grid gap-2 text-sm font-semibold">
            事件标题
            <input className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal" onChange={(event) => setTitle(event.target.value)} value={title} />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              部门
              <select className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal" onChange={(event) => setDepartmentId(event.target.value)} value={departmentId}>
                {state.departments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {item.english}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              模式
              <select className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal" onChange={(event) => setMode(event.target.value as "xp" | "gold")} value={mode}>
                <option value="gold">Gold</option>
                <option value="xp">XP</option>
              </select>
            </label>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              数值
              <input className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal" min="0" onChange={(event) => setAmount(Number(event.target.value))} type="number" value={amount} />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              画面比例
              <select className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal" onChange={(event) => setFormat(event.target.value as "landscape" | "portrait")} value={format}>
                <option value="landscape">横屏 16:9</option>
                <option value="portrait">竖屏 9:16</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            小字备注
            <input className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal" onChange={(event) => setNote(event.target.value)} value={note} />
          </label>
          <button className="focus-ring w-fit rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white" onClick={save} type="button">
            保存这个浮层事件
          </button>
          {error ? <p className="text-sm font-semibold text-[var(--clay)]">{error}</p> : null}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">预览画面</h2>
          <p className="text-sm text-[var(--muted)]">截图/录屏后导入剪辑软件</p>
        </div>
        <div className="quiet-card overflow-hidden p-5">
          <div
            className={`relative mx-auto grid place-items-center overflow-hidden rounded border border-[var(--line)] bg-[#f8f7f2] ${
              format === "landscape" ? "aspect-video w-full" : "aspect-[9/16] h-[680px] max-h-[72vh]"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(110,125,104,0.18),transparent_28%)]" />
            <div className="relative w-[82%] max-w-xl rounded-lg border border-[rgba(217,222,214,0.9)] bg-[rgba(255,255,255,0.86)] p-5 shadow-[0_24px_90px_rgba(47,51,47,0.14)] backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-[var(--sage)]">{department.english}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-normal text-[var(--ink)]">{title}</h3>
                </div>
                <div className="rounded-full bg-[#e4eadf] px-4 py-2 text-lg font-semibold text-[var(--sage)]">
                  {mode === "gold" ? `Gold +A$${amount}` : `XP +${amount}`}
                </div>
              </div>
              <div className="mt-5 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">
                {note || "Life is under construction."}
              </div>
            </div>
          </div>
        </div>

        {recent.length ? (
          <div className="mt-6 grid gap-3">
            {recent.map((event) => (
              <div className="rounded border border-[var(--line)] bg-white p-4 text-sm" key={event.id}>
                <span className="font-semibold">{event.title}</span>
                <span className="text-[var(--muted)]"> · {event.mode === "gold" ? `Gold +A$${event.amount}` : `XP +${event.amount}`}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
