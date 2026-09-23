import type { Metadata } from "next";
import { ContentPage } from "@/components/calvary/pages";
export const metadata: Metadata = { title: "Times & location" };
export default function Page() { return <ContentPage slug="schedules" />; }
