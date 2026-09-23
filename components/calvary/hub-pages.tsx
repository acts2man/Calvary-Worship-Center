"use client";
import { ArrowUpRight, Play, CalendarDays, Users, MessageCircle, Footprints } from "lucide-react";
import { SiteLink as Link } from "./site-link";
import { Action, TextLink, Eyebrow, PageHero, PhotoStory, VisitBlock, MessageCards } from "./shared";
import { church, image } from "@/lib/calvary/config";

export function DiscoverPage() {
  return <main id="main" className="hub-page">
    <PageHero label="Discover Calvary" title="A living faith." emphasis="A place to belong." photo={18} description="Meet the people, the purpose, and the faith at the heart of Calvary Worship Center." />
    <section className="hub-intro wrap reveal"><Eyebrow>Welcome to the family</Eyebrow><div><h2>All people.<br /><em>One shared hope.</em></h2><p>We’re an Apostolic Pentecostal church in Sacramento, bringing many cultures and generations together around Jesus. Our mission is to see all people transformed, enriched, and involved.</p></div></section>
    <section className="hub-destinations wrap" aria-label="Get to know Calvary">
      {[
        { href: "/about-us", src: image(13), label: "OUR FAITH", title: "What we believe.", copy: "Our purpose, our beliefs, and the welcome you’ll find here.", alt: "Prayer together at Calvary" },
        { href: "/our-pastors", src: "/images/pastor-fair.webp", label: "OUR LEADERS", title: "Hearts for people.", copy: "Meet Pastor Troy and Jennifer Fair and our pastoral team.", alt: "Pastor Troy and Jennifer Fair" },
        { href: "/our-history", src: image(11), label: "OUR STORY", title: "Faith across generations.", copy: "Explore Calvary’s Sacramento story, beginning in 1940.", alt: "Generations worshipping at Calvary" },
      ].map(c => <Link className="hub-destination reveal" href={c.href} key={c.href}><div className="hub-card-image"><img src={c.src} alt={c.alt} loading="lazy" /></div><div className="hub-card-copy"><span className="eyebrow">{c.label}</span><h3>{c.title}</h3><p>{c.copy}</p><span className="hub-card-link">Explore<ArrowUpRight size={20} /></span></div></Link>)}
    </section>
    <section className="hub-word-band wrap reveal"><img src={image(9)} alt="Bible-centered preaching at Calvary" loading="lazy" /><div><Eyebrow>Faith for everyday life</Eyebrow><h2>The Word.<br /><em>At the center.</em></h2><p>Heartfelt worship. Bible-centered preaching. A church family growing together in the presence of God.</p><Action href="/watch-and-listen">Watch & listen</Action></div></section>
    <VisitBlock />
  </main>;
}

export function ConnectedPage() {
  const paths = [
    { href: "/nextsteps", icon: Footprints, label: "START HERE", title: "Take your next step.", copy: "Discover your purpose and find your place in the Calvary family. Next Steps meets Mondays at 7 PM.", action: "Explore Next Steps" },
    { href: "/ministries", icon: Users, label: "FIND YOUR PEOPLE", title: "Life is better together.", copy: "From children and youth to adults, connect groups, and serving teams—there’s room for you.", action: "Find a ministry" },
    { href: "/general-calendar", icon: CalendarDays, label: "BE PART OF IT", title: "See what’s coming.", copy: "Keep up with gatherings and events in the Calvary church family.", action: "Open the church calendar" },
    { href: "/contact", icon: MessageCircle, label: "SAY HELLO", title: "Start a conversation.", copy: "Have a question or a prayer request? Our church office is here to help you get connected.", action: "Contact our team" },
  ];
  return <main id="main" className="hub-page">
    <PageHero label="Get Connected" title="You have a story." emphasis="You have a place." photo={28} description="A first Sunday, a new friendship, a place to serve. Your next chapter can start right here." />
    <section className="connection-section wrap"><div className="section-heading reveal"><div><Eyebrow>There’s a next step for you</Eyebrow><h2>Come closer.<br /><em>Grow together.</em></h2></div><p>You don’t have to know everyone.<br />You just have to start somewhere.</p></div><div className="connection-grid">{paths.map(c => <Link key={c.href} href={c.href} className="connection-card reveal"><c.icon size={30} strokeWidth={1.3} /><Eyebrow>{c.label}</Eyebrow><h3>{c.title}</h3><p>{c.copy}</p><span className="hub-card-link">{c.action}<ArrowUpRight size={20} /></span></Link>)}</div></section>
    <PhotoStory compact />
    <section className="hub-member-bar wrap reveal"><div><Eyebrow>Already part of Calvary?</Eyebrow><h3>Your church family resources.</h3><p>Find the calendar and request a flyer for your ministry event.</p></div><Action href="/members" outline>Member resources</Action></section>
    <VisitBlock />
  </main>;
}

export function WatchPage() {
  return <main id="main" className="hub-page">
    <PageHero label="Watch & Listen" title="A word of hope." emphasis="Wherever you are." photo={14} description="Join a service live, revisit a message, or carry the Word with you through your week." />
    <section className="watch-feature wrap reveal"><div className="watch-feature-image"><img src={image(26)} alt="Calvary’s worship team leading a service" loading="lazy" /><Link href="/livestream" aria-label="Open the Calvary livestream" className="large-play"><Play size={27} fill="currentColor" /></Link></div><div className="watch-feature-copy"><Eyebrow>Gather with us online</Eyebrow><h2>One church.<br /><em>Beyond the walls.</em></h2><p>Worship with the Calvary family from wherever you’re joining us.</p><div className="watch-service-times"><span>Sunday worship<strong>11:00 AM</strong></span><span>Wednesday Night<strong>7:00 PM</strong></span></div><p className="time-zone">All times Pacific. The player is live during services.</p><Action href="/livestream">Watch live</Action></div></section>
    <section className="messages-section wrap"><div className="section-heading reveal"><div><Eyebrow>From the Calvary pulpit</Eyebrow><h2>A message<br /><em>for your week.</em></h2></div><TextLink href="/media">Explore the service library</TextLink></div><MessageCards limit={6} /></section>
    <section className="watch-archive-band"><div className="wrap"><div><Eyebrow>Keep the Word close</Eyebrow><h2>Return to a message.<br /><em>Share the hope.</em></h2><p>Explore more worship services and Bible teaching in Calvary’s video archive.</p></div><div className="button-row"><Action href="/media">Browse messages</Action><Action href={church.archive} outline>Full archive</Action></div></div></section>
  </main>;
}
