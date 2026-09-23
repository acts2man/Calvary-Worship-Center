import type { Metadata } from "next";
import { ContentPage } from "@/components/calvary/pages";
export const metadata: Metadata = { title: "Church calendar" };
export default function Page() { return <ContentPage slug="general-calendar" />; }
