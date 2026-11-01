import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Frans Hals Museum | Haarlem’s museum of fine arts",
  description: "Discover 16th- and 17th-century, modern and contemporary art at the Frans Hals Museum in Haarlem.",
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
