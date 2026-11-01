import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "샤이닝 - 기업 홈페이지 샘플",
  description: "당신의 삶에 가치를 더하는 플랫폼. 고객의 라이프스타일에 최적화된 맞춤형 렌탈 서비스를 제공합니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
