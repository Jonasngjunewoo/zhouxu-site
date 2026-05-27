import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  defaultDepartments,
  initialState,
  type DailyLog,
  type Department,
  type OrixState,
  type OverlayEvent,
  type WeeklyReview,
} from "@/lib/orix-store";

type DepartmentRow = {
  id: string;
  user_id: string;
  name: string;
  english: string;
  mission: string;
};

type DailyLogRow = {
  id: string;
  user_id: string;
  log_date: string;
  department_id: string;
  content: string;
  learned: string | null;
  earned: string | null;
  xp: number;
  gold: number | string;
  use_for_video: boolean;
  created_at: string;
};

type WeeklyReviewRow = {
  id: string;
  user_id: string;
  week_start: string;
  moved_forward: string;
  stuck_points: string;
  department_attention: string;
  lessons: string;
  next_week_focus: string;
  created_at: string;
};

type OverlayEventRow = {
  id: string;
  user_id: string;
  title: string;
  department_id: string;
  mode: "xp" | "gold";
  amount: number | string;
  note: string | null;
  created_at: string;
};

function departmentToRow(department: Department, userId: string): DepartmentRow {
  return {
    id: department.id,
    user_id: userId,
    name: department.name,
    english: department.english,
    mission: department.mission,
  };
}

function dailyLogToRow(log: DailyLog, userId: string): DailyLogRow {
  return {
    id: log.id,
    user_id: userId,
    log_date: log.date,
    department_id: log.departmentId,
    content: log.content,
    learned: log.learned,
    earned: log.earned,
    xp: log.xp,
    gold: log.gold,
    use_for_video: log.useForVideo,
    created_at: log.createdAt,
  };
}

function weeklyReviewToRow(review: WeeklyReview, userId: string): WeeklyReviewRow {
  return {
    id: review.id,
    user_id: userId,
    week_start: review.weekStart,
    moved_forward: review.movedForward,
    stuck_points: review.stuckPoints,
    department_attention: review.departmentAttention,
    lessons: review.lessons,
    next_week_focus: review.nextWeekFocus,
    created_at: review.createdAt,
  };
}

function overlayEventToRow(event: OverlayEvent, userId: string): OverlayEventRow {
  return {
    id: event.id,
    user_id: userId,
    title: event.title,
    department_id: event.departmentId,
    mode: event.mode,
    amount: event.amount,
    note: event.note,
    created_at: event.createdAt,
  };
}

function rowToDailyLog(row: DailyLogRow): DailyLog {
  return {
    id: row.id,
    date: row.log_date,
    departmentId: row.department_id,
    content: row.content,
    learned: row.learned || "",
    earned: row.earned || "",
    xp: Number(row.xp),
    gold: Number(row.gold),
    useForVideo: row.use_for_video,
    createdAt: row.created_at,
  };
}

function rowToWeeklyReview(row: WeeklyReviewRow): WeeklyReview {
  return {
    id: row.id,
    weekStart: row.week_start,
    movedForward: row.moved_forward,
    stuckPoints: row.stuck_points,
    departmentAttention: row.department_attention,
    lessons: row.lessons,
    nextWeekFocus: row.next_week_focus,
    createdAt: row.created_at,
  };
}

function rowToOverlayEvent(row: OverlayEventRow): OverlayEvent {
  return {
    id: row.id,
    title: row.title,
    departmentId: row.department_id,
    mode: row.mode,
    amount: Number(row.amount),
    note: row.note || "",
    createdAt: row.created_at,
  };
}

async function authenticatedClient() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error || !user ? null : { supabase, user };
}

async function ensureDefaultDepartments(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, userId: string) {
  const { error } = await supabase
    .from("departments")
    .upsert(defaultDepartments.map((department) => departmentToRow(department, userId)), { onConflict: "user_id,id" });

  if (error) throw error;
}

async function loadState(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
): Promise<OrixState> {
  await ensureDefaultDepartments(supabase, userId);

  const [departments, dailyLogs, weeklyReviews, overlayEvents] = await Promise.all([
    supabase.from("departments").select("*").order("id"),
    supabase.from("daily_logs").select("*").order("created_at", { ascending: false }),
    supabase.from("weekly_reviews").select("*").order("created_at", { ascending: false }),
    supabase.from("overlay_events").select("*").order("created_at", { ascending: false }),
  ]);
  const error = departments.error || dailyLogs.error || weeklyReviews.error || overlayEvents.error;

  if (error) throw error;

  const departmentRows = departments.data as DepartmentRow[];
  return {
    departments: departmentRows.length
      ? departmentRows.map((row) => ({ id: row.id, name: row.name, english: row.english, mission: row.mission }))
      : initialState.departments,
    dailyLogs: (dailyLogs.data as DailyLogRow[]).map(rowToDailyLog),
    weeklyReviews: (weeklyReviews.data as WeeklyReviewRow[]).map(rowToWeeklyReview),
    overlayEvents: (overlayEvents.data as OverlayEventRow[]).map(rowToOverlayEvent),
  };
}

async function upsertState(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
  state: OrixState,
) {
  await ensureDefaultDepartments(supabase, userId);

  const mutations = [
    supabase
      .from("departments")
      .upsert(state.departments.map((department) => departmentToRow(department, userId)), { onConflict: "user_id,id" }),
  ];

  if (state.dailyLogs.length) {
    mutations.push(
      supabase
        .from("daily_logs")
        .upsert(state.dailyLogs.map((log) => dailyLogToRow(log, userId)), { onConflict: "user_id,id" }),
    );
  }
  if (state.weeklyReviews.length) {
    mutations.push(
      supabase
        .from("weekly_reviews")
        .upsert(state.weeklyReviews.map((review) => weeklyReviewToRow(review, userId)), { onConflict: "user_id,id" }),
    );
  }
  if (state.overlayEvents.length) {
    mutations.push(
      supabase
        .from("overlay_events")
        .upsert(state.overlayEvents.map((event) => overlayEventToRow(event, userId)), { onConflict: "user_id,id" }),
    );
  }

  const results = await Promise.all(mutations);
  const error = results.find((result) => result.error)?.error;
  if (error) throw error;
}

export async function GET() {
  const auth = await authenticatedClient();
  if (!auth) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ ok: true, state: await loadState(auth.supabase, auth.user.id), source: "supabase" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Failed to load ORIX data." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const auth = await authenticatedClient();
  if (!auth) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { state?: OrixState } | null;
  if (!body?.state) {
    return NextResponse.json({ ok: false, message: "Missing ORIX state." }, { status: 400 });
  }

  try {
    await upsertState(auth.supabase, auth.user.id, body.state);
    return NextResponse.json({ ok: true, source: "supabase" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Failed to save ORIX data." },
      { status: 500 },
    );
  }
}
