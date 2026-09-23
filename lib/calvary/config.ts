// Add Calvary's final hero video URL here. The photographic hero works until then.
export const heroVideo: string | null = null;
export const church = {
  name: "Calvary Worship Center", address: "4911 47th Avenue", city: "Sacramento, CA 95824",
  phone: "916.393.7000", email: "office@calvaryforyou.com",
  give: "https://saccalvary.churchcenter.com/giving",
  live: "https://www.christianworldmedia.com/1301-1251-/embed-html5/f7/livestream.html",
  archive: "https://www.christianworldmedia.com/sermon-catalog-1301-1251-fluid/embed.html",
  directions: "https://www.google.com/maps/search/?api=1&query=Calvary+Worship+Center+4911+47th+Avenue+Sacramento+CA+95824",
};
export const pages: Record<string, string> = {
  "discover-calvary": "Discover Calvary", "get-connected": "Get Connected", "watch-and-listen": "Watch & Listen",
  "about-us": "About us", "our-pastors": "Our pastors", "our-history": "Our history",
  schedules: "Times & location", donate: "Giving", ministries: "Ministries", nextsteps: "Next steps",
  media: "Messages", livestream: "Watch live", members: "Member resources", contact: "Contact us",
  "general-calendar": "Church calendar", "event-flyers-request": "Event flyer request",
};
export const primaryNavigation = [
  { label: "Discover Calvary", href: "/discover-calvary", children: ["/about-us", "/our-pastors", "/our-history"] },
  { label: "Get Connected", href: "/get-connected", children: ["/ministries", "/nextsteps", "/contact", "/members", "/general-calendar", "/event-flyers-request"] },
  { label: "Watch & Listen", href: "/watch-and-listen", children: ["/media", "/livestream"] },
];
export const menuGroups = [
  { label: "Discover", links: [["About us", "/about-us"], ["Our pastors", "/our-pastors"], ["Our history", "/our-history"]] },
  { label: "Connect", links: [["Ministries", "/ministries"], ["Next Steps", "/nextsteps"], ["Contact us", "/contact"]] },
  { label: "Watch", links: [["Service library", "/media"], ["Watch live", "/livestream"]] },
  { label: "Church family", links: [["Member resources", "/members"], ["Church calendar", "/general-calendar"], ["Event flyer request", "/event-flyers-request"]] },
];
export const heroPhotos = [
  { n: 18, position: "58% 35%", mobilePosition: "58% 28%", alt: "Preaching from the pulpit at Calvary" },
  { n: 7, position: "50% 32%", mobilePosition: "50% 20%", alt: "The Word being preached at Calvary" },
  { n: 0, position: "50% 30%", mobilePosition: "50% 18%", alt: "A message from the Calvary pulpit" },
  { n: 1, position: "54% 35%", mobilePosition: "50% 26%", alt: "Worship and ministry on the Calvary platform" },
  { n: 29, position: "50% 42%", mobilePosition: "60% 40%", alt: "Our church family worshipping together" },
  { n: 26, position: "50% 40%", mobilePosition: "60% 35%", alt: "Calvary’s musicians and singers leading worship" },
];
export const image = (n: number) => `/images/calvary-${String(n).padStart(2, "0")}.webp`;
