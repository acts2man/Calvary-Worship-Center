import type { Metadata } from "next";
import { ContentPage } from "@/components/calvary/pages";
export const metadata: Metadata = { title: "Our pastors" };
export default function Page() { return <ContentPage slug="our-pastors" />; }
