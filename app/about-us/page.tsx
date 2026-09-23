import type { Metadata } from "next";
import { ContentPage } from "@/components/calvary/pages";
export const metadata: Metadata = { title: "About us" };
export default function Page() { return <ContentPage slug="about-us" />; }
