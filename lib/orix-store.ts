export type Department = {
  id: string;
  name: string;
  english: string;
  mission: string;
};

export type DailyLog = {
  id: string;
  date: string;
  departmentId: string;
  content: string;
  learned: string;
  earned: string;
  xp: number;
  gold: number;
  useForVideo: boolean;
  createdAt: string;
};

export type WeeklyReview = {
  id: string;
  weekStart: string;
  movedForward: string;
  stuckPoints: string;
  departmentAttention: string;
  lessons: string;
  nextWeekFocus: string;
  createdAt: string;
};

export type OverlayEvent = {
  id: string;
  title: string;
  departmentId: string;
  mode: "xp" | "gold";
  amount: number;
  note: string;
  createdAt: string;
};

export type OrixState = {
  departments: Department[];
  dailyLogs: DailyLog[];
  weeklyReviews: WeeklyReview[];
  overlayEvents: OverlayEvent[];
};

export const defaultDepartments: Department[] = [
  { id: "academic", name: "学业部", english: "Academic", mission: "阅读、作业、考试与长期学习节奏" },
  { id: "health", name: "健康部", english: "Health", mission: "睡眠、运动、饮食与情绪状态" },
  { id: "venture", name: "创业部", english: "Venture", mission: "项目推进、合作沟通与商业验证" },
  { id: "investment", name: "投资部", english: "Investment", mission: "交易纪律、复盘和风险提醒" },
  { id: "cash-flow", name: "现金流部", english: "Cash Flow", mission: "工作收入、支出和稳定现金流" },
  { id: "media", name: "媒体部", english: "Media", mission: "选题、发布、数据与个人 IP" },
];

export const initialState: OrixState = {
  departments: defaultDepartments,
  dailyLogs: [],
  weeklyReviews: [],
  overlayEvents: [],
};

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function uid(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function getDepartment(state: OrixState, id: string) {
  return state.departments.find((department) => department.id === id) || state.departments[0];
}

export function mergeState(value: Partial<OrixState> | null): OrixState {
  return {
    departments: value?.departments?.length ? value.departments : initialState.departments,
    dailyLogs: value?.dailyLogs || [],
    weeklyReviews: value?.weeklyReviews || [],
    overlayEvents: value?.overlayEvents || [],
  };
}
