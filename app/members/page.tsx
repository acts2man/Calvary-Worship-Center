import type { Metadata } from "next";
import { ContentPage } from "@/components/calvary/pages";
export const metadata: Metadata = { title: "Member resources" };
export default function Page() { return <ContentPage slug="members" />; }
