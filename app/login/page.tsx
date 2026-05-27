"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callbackError = new URLSearchParams(window.location.search).get("error");
    if (callbackError) setError(callbackError);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const response = await fetch(mode === "login" ? "/api/login" : "/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = (await response.json()) as { message?: string };

    setLoading(false);

    if (!response.ok) {
      setError(data.message || (mode === "login" ? "登录失败。" : "注册失败。"));
      return;
    }

    if (mode === "signup") {
      setNotice("注册邮件已发送。请验证邮箱后再登录进入 ORIX。");
      setMode("login");
      setPassword("");
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next || "/app");
    router.refresh();
  }

  return (
    <main className="page-shell flex min-h-screen items-center">
      <section className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-xl">
          <p className="eyebrow">Private workspace</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal md:text-6xl">
            进入你的 ORIX 人生总控台。
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            你的记录、收入与复盘只属于你的账号。用已验证邮箱登录后，开始记录自己的推进。
          </p>
        </div>
        <form className="quiet-card grid gap-5 p-8 md:p-10" onSubmit={submit}>
          <div className="flex rounded-full border border-[var(--line)] bg-white p-1 text-sm font-semibold">
            <button
              className={`flex-1 rounded-full px-4 py-2 ${mode === "login" ? "bg-[var(--ink)] text-white" : "text-[var(--muted)]"}`}
              onClick={() => {
                setMode("login");
                setError("");
                setNotice("");
              }}
              type="button"
            >
              登录
            </button>
            <button
              className={`flex-1 rounded-full px-4 py-2 ${mode === "signup" ? "bg-[var(--ink)] text-white" : "text-[var(--muted)]"}`}
              onClick={() => {
                setMode("signup");
                setError("");
                setNotice("");
              }}
              type="button"
            >
              测试注册
            </button>
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            邮箱
            <input
              className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            密码
            <input
              className="focus-ring rounded border border-[var(--line)] bg-white px-4 py-3 font-normal"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="至少 8 位密码"
              required
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="text-sm font-semibold text-[var(--clay)]">{error}</p> : null}
          {notice ? <p className="text-sm font-semibold text-[var(--sage)]">{notice}</p> : null}
          <button
            className="focus-ring rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#111411]"
            disabled={loading}
            type="submit"
          >
            {loading ? "处理中..." : mode === "login" ? "进入 ORIX" : "注册并验证邮箱"}
          </button>
          <p className="text-sm leading-6 text-[var(--muted)]">
            注册功能当前用于测试。邮箱验证完成前无法进入应用，所有个人记录只存放在你的云端私有空间。
          </p>
        </form>
      </section>
    </main>
  );
}
