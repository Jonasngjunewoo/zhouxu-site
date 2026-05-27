# 宙序 ORIX 官网 v0.1

宙序是一个极简人生推进系统。第一版官网用于说明产品理念、展示核心功能，并收集预约用户。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 `http://localhost:3000`。

如果你的电脑还没有 Node.js，先安装 Node.js LTS。本项目以后统一使用 npm，不再使用 pnpm。

## 上线

推荐部署到 Vercel：

1. 将本项目推送到 GitHub。
2. 在 Vercel 导入仓库。
3. 添加已购买的域名。
4. 按 Vercel 提示在域名服务商后台配置 DNS。
5. 在 Vercel 项目里添加环境变量 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`。
6. 在 Supabase Authentication 中启用 Email + Password，保留邮箱验证要求，并配置 `/auth/confirm` 为允许的重定向地址。
7. 在 Supabase SQL Editor 运行 `supabase/schema.sql`，创建带行级访问保护的 ORIX 数据表。

## 预约表单

当前页面中的预约入口已指向 Tally 表单：`https://tally.so/r/WOj0ZR`。如需更换表单，修改 `app/page.tsx` 里的 `waitlistUrl`。

## ORIX v0.2 私有空间

- `/login`：邮箱 + 密码登录入口，并提供测试注册。
- `/app`：人生总控台。
- `/app/log`：极轻 Daily Log，记录 XP / Gold。
- `/app/review`：Weekly Review。
- `/app/overlay`：视频浮层生成器。

当前 v0.2 只将个人记录保存到 Supabase，不在浏览器本地缓存 Daily Log、Gold 或复盘内容。每位已验证邮箱的用户只能读取和写入自己的数据；上线或录入真实数据前，必须先在空库中运行 `supabase/schema.sql` 并使用两个测试账号验证隔离策略。
