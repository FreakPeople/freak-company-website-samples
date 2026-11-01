import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "샤이닝 - 기업 홈페이지 샘플",
  description: "마음으로 정성을 다하는 믿을 수 있는 샤이닝라이프",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      {/* Browser tools may inject body attributes such as ap-style before hydration.
          Suppress only this element's attribute warnings; descendants remain checked. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
