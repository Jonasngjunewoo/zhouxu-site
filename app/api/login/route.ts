import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;

  if (!body?.email || !body.password) {
    return NextResponse.json({ ok: false, message: "请输入邮箱和密码。" }, { status: 400 });
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: body.email.trim(),
      password: body.password,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: "登录失败，请确认邮箱已验证且密码正确。" }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "登录服务尚未配置完成。" }, { status: 500 });
  }
}
