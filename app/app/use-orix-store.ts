"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { SetStateAction } from "react";
import { initialState, mergeState, type OrixState } from "@/lib/orix-store";

export function useOrixStore() {
  const [state, setState] = useState<OrixState>(initialState);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Remove data persisted by the earlier offline draft before loading private cloud records.
      window.localStorage.removeItem("orix:v0.2");

      try {
        const response = await fetch("/api/orix");
        if (!response.ok) throw new Error("无法读取你的云端记录，请刷新或重新登录。");
        const data = (await response.json()) as { state?: OrixState };
        if (!cancelled && data.state) {
          setState(mergeState(data.state));
          setError("");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "无法读取你的云端记录，请刷新或重新登录。");
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateState = useCallback(
    async (nextState: SetStateAction<OrixState>) => {
      const resolved = typeof nextState === "function" ? nextState(state) : nextState;

      try {
        const response = await fetch("/api/orix", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ state: resolved }),
        });
        if (!response.ok) throw new Error("云端保存失败。此次内容没有被保存，请稍后重试。");
        setState(resolved);
        setError("");
        return true;
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "云端保存失败。此次内容没有被保存，请稍后重试。");
        return false;
      }
    },
    [state],
  );

  return useMemo(() => ({ state, setState: updateState, ready, error }), [error, ready, state, updateState]);
}
