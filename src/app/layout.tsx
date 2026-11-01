import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  applicationName: "FREAK ART MUSEUM",
  title: "FREAK ART MUSEUM | Art by Freak Makers",
  description: "Discover classical, modern and contemporary art at FREAK ART MUSEUM. A fresh perspective by Freak Makers.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Browser extensions may add body attributes before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
