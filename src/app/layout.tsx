import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "밝은미래치과",
  description: "정밀 진단과 체계적인 치료 계획, 밝은미래치과",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      {/* Browser tools may inject body attributes (for example, ap-style) before hydration. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
