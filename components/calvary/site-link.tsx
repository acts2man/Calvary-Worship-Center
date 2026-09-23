import type { ComponentProps } from "react";

// Use native navigation so every page remains reachable before hydration,
// through the hosted access gateway, and when opening a link directly.
export function SiteLink(props: ComponentProps<"a">) {
  return <a {...props} />;
}
