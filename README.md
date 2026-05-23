# 宙序 ORIX 官网 v0.1

宙序是一个极简人生推进系统。第一版官网用于说明产品理念、展示核心功能，并收集预约用户。

## 本地运行

```bash
corepack enable
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。

如果你的电脑还没有 Node.js，先安装 Node.js LTS；如果不想用 pnpm，也可以执行 `npm install` 和 `npm run dev`。

## 上线

推荐部署到 Vercel：

1. 将本项目推送到 GitHub。
2. 在 Vercel 导入仓库。
3. 添加已购买的域名。
4. 按 Vercel 提示在域名服务商后台配置 DNS。

## 预约表单

当前页面中的预约入口已指向 Tally 表单：`https://tally.so/r/WOj0ZR`。如需更换表单，修改 `app/page.tsx` 里的 `waitlistUrl`。
