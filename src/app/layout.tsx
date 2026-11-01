import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "FREAK rental",
  title: "프릭렌탈 | FREAK rental",
  description: "프릭렌탈, 당신의 삶에 가치를 더하는 플랫폼. 고객의 라이프스타일에 최적화된 맞춤형 렌탈 서비스를 제공합니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      {/* Browser tools may add body attributes such as ap-style before hydration.
          Suppress only this element's warning; descendants remain checked. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
