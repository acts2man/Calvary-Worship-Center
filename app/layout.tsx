import type { Metadata } from "next";
import { SiteShell } from "@/components/calvary/shared";
import "./globals.css";
import "./calvary.css";
import "./brand.css";
export const metadata: Metadata = {
  title: { default: "Calvary Worship Center | A place for you. Sacramento, CA", template: "%s | Calvary Worship Center" },
  description: "All people. Transformed, enriched, involved. Join Calvary Worship Center in Sacramento on Sundays at 11 AM and Wednesdays at 7 PM.",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
