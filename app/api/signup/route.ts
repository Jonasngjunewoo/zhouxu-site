import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;

  if (!body?.email || !body.password) {
    return NextResponse.json({ ok: false, message: "请输入邮箱和密码。" }, { status: 400 });
  }

  if (body.password.length < 8) {
    return NextResponse.json({ ok: false, message: "密码至少需要 8 位。" }, { status: 400 });
  }

  try {
    const supabase = await createSupabaseServerClient();
    const redirectTo = new URL("/auth/confirm?next=/app", request.url).toString();
    const { error } = await supabase.auth.signUp({
      email: body.email.trim(),
      password: body.password,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, needsConfirmation: true });
  } catch {
    return NextResponse.json({ ok: false, message: "注册服务尚未配置完成。" }, { status: 500 });
  }
}
