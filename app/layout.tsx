import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "宙序 ORIX | 极简人生推进系统",
  description:
    "宙序 ORIX 是一个极简人生推进系统，帮助你用部门制重新整理学业、工作、创业、健康、投资与内容。",
  openGraph: {
    title: "宙序 ORIX | Life is under construction",
    description: "不是学到，就是赚到。让人生重新有序。",
    url: "https://cosmosense.online",
    siteName: "宙序 ORIX",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "宙序 ORIX | 极简人生推进系统",
    description: "Life is under construction. 让人生重新有序。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
