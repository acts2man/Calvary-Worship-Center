"use client";
import { SiteLink as Link } from "./site-link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, ArrowDown, MapPin, Play, Pause, X, Plus, Mail, Phone } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { church, image, heroVideo, heroPhotos, primaryNavigation, menuGroups } from "@/lib/calvary/config";
import messages from "@/lib/calvary/messages.json";

export function Action({ href, children, light = false, outline = false, className = "" }: { href: string; children: ReactNode; light?: boolean; outline?: boolean; className?: string }) {
  const external = href.startsWith("http");
  return <Link href={href} className={`button ${outline ? "outline" : light ? "light" : "gold"} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}><span>{children}</span><ArrowUpRight size={18} /></Link>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) { return <Link href={href} className="text-link">{children}<ArrowUpRight size={19} /></Link>; }
export function Eyebrow({ children, number }: { children: ReactNode; number?: string }) { return <p className="eyebrow">{number && <span>{number} / </span>}{children}</p>; }
export function Logo({ onClick }: { onClick?: () => void }) {
  return <Link className="logo" href="/" aria-label="Calvary Worship Center home" onClick={onClick}><img src="/images/calvary-logo.jpg" alt="Calvary Worship Center" width={200} height={200} fetchPriority="high" /></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const headerLinks: { label: string; href: string; children?: string[] }[] = [
    { label: "Home", href: "/" },
    ...primaryNavigation,
    { label: "Contact", href: "/contact" },
  ];
  useEffect(() => { setReady(true); }, []);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 35); fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el)); return () => observer.disconnect();
  }, [pathname]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">{headerLinks.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || item.children?.includes(pathname) ? "page" : undefined}>{item.label}</Link>)}</nav>
      <div className="header-actions"><Link href="/schedules" className="visit-button">Join us Sunday<ArrowUpRight size={16} /></Link>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetTrigger asChild><button className="menu-button" aria-label="Open menu" disabled={!ready}><span>Menu</span><span className="menu-lines"><i /><i /></span></button></SheetTrigger>
          <SheetContent side="right" className="full-menu" showCloseButton={false}><SheetTitle className="sr-only">Explore Calvary</SheetTitle><SheetDescription className="sr-only">Explore every page at Calvary Worship Center.</SheetDescription>
            <div className="menu-top"><Logo /><SheetClose asChild><button className="menu-close" aria-label="Close menu">Close <X size={22} /></button></SheetClose></div>
            <div className="menu-body"><div className="menu-primary"><nav aria-label="Explore Calvary">{headerLinks.map((item, i) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}><span className="menu-number">0{i + 1}</span><span>{item.label}</span><ArrowUpRight /></Link>)}</nav><div className="menu-actions"><Action href="/schedules">Times & location</Action><TextLink href="/donate">Giving</TextLink></div><p className="menu-service-note">Sunday worship · 11 AM<br />Wednesday Night · 7 PM</p></div>
              <nav className="menu-directory" aria-label="All pages">{menuGroups.map(group => <div className="menu-group" key={group.label}><span>{group.label}</span>{group.links.map(([label, href]) => <Link href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}<ArrowUpRight size={16} /></Link>)}</div>)}</nav>
            </div>
            <div className="menu-bottom"><span>Sacramento, California</span><a href="tel:+19163937000">916.393.7000</a><span>All people. One family.</span></div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
    <div key={pathname} className="page-enter">{children}</div>
    <Footer />
  </>;
}

export function Footer() { return <footer className="footer">
  <div className="wrap">
    <div className="footer-top"><div><Eyebrow>There’s a place for you here.</Eyebrow><h2>See you <em>Sunday.</em></h2><Action href="/schedules">Plan your visit</Action></div><div className="footer-address"><p>4911 47th Avenue<br />Sacramento, CA 95824</p><a href="tel:+19163937000">916.393.7000</a><a href="mailto:office@calvaryforyou.com">office@calvaryforyou.com</a><a href={church.directions} target="_blank" rel="noreferrer" className="text-link">Get directions<ArrowUpRight size={18} /></a></div></div>
    <div className="footer-links"><div><Link className="footer-group-title" href="/discover-calvary">DISCOVER CALVARY</Link><Link href="/about-us">About us</Link><Link href="/our-pastors">Our pastors</Link><Link href="/our-history">Our history</Link></div><div><Link className="footer-group-title" href="/get-connected">GET CONNECTED</Link><Link href="/ministries">Ministries</Link><Link href="/nextsteps">Next steps</Link><Link href="/contact">Contact us</Link></div><div><span>BE PART OF IT</span><Link href="/schedules">Times & location</Link><Link href="/donate">Giving</Link><Link href="/members">Member resources</Link></div><div><Link className="footer-group-title" href="/watch-and-listen">WATCH & LISTEN</Link><a href="https://www.instagram.com/saccalvary/" target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={14} /></a><a href="https://www.facebook.com/saccalvary" target="_blank" rel="noreferrer">Facebook<ArrowUpRight size={14} /></a><a href="https://twitter.com/saccalvary" target="_blank" rel="noreferrer">X / Twitter<ArrowUpRight size={14} /></a><Link href="/livestream">Livestream<ArrowUpRight size={14} /></Link><Link href="/media">Service library<ArrowUpRight size={14} /></Link></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Calvary Worship Center</span><span>SACRAMENTO, CA · EST. 1940</span><a href="#main">Back to top ↑</a></div>
  </div>
  <div className="footer-brand-band"><div className="footer-brand wrap"><Logo /><span>ALL PEOPLE.<br />TRANSFORMED. ENRICHED. INVOLVED.</span></div></div>
</footer>; }

export function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const photographic = !heroVideo || videoFailed;
  useEffect(() => { const query = window.matchMedia("(prefers-reduced-motion: reduce)"); const sync = () => setPaused(query.matches); sync(); query.addEventListener("change", sync); return () => query.removeEventListener("change", sync); }, []);
  useEffect(() => { if (paused || !photographic) return; const timer = setInterval(() => setSlide(s => (s + 1) % heroPhotos.length), 7500); return () => clearInterval(timer); }, [paused, photographic]);
  const move = (direction: number) => { setPaused(true); setSlide(s => (s + direction + heroPhotos.length) % heroPhotos.length); };
  return <section className="home-hero" aria-label="Welcome to Calvary Worship Center">
    <div className={`hero-media ${paused ? "is-paused" : ""}`}>{!photographic ? <video className="hero-video" src={heroVideo!} autoPlay muted loop playsInline poster={image(heroPhotos[0].n)} onError={() => setVideoFailed(true)} ref={el => { if (el) { if (paused) el.pause(); else el.play().catch(() => {}); } }} /> : heroPhotos.map((photo, i) => <img key={photo.n} src={image(photo.n)} alt={photo.alt} aria-hidden={i !== slide} style={{ "--photo-position": photo.position, "--photo-mobile-position": photo.mobilePosition } as CSSProperties} className={`hero-slide ${i === slide ? "active" : ""}`} fetchPriority={i === 0 ? "high" : "auto"} loading={i === 0 ? "eager" : "lazy"} />)}</div>
    <div className="hero-shade" />
    <div className="hero-content wrap"><div className="hero-meta"><span className="eyebrow">Sacramento, California</span><span className="hero-verse">ALL PEOPLE. ONE FAMILY.</span></div><h1>There’s a place<br /><em>for you.</em></h1><div className="hero-lower"><div><p>A real God. A real community.<br />A life transformed. Welcome to Calvary.</p><div className="hero-ctas"><Action href="/schedules">Find your Sunday</Action><Link className="watch-link" href="/livestream"><span className="play-circle"><Play size={13} fill="currentColor" /></span>Watch live</Link></div></div><div className="hero-side"><span>FAITH IS PERSONAL.<br />YOU DON’T HAVE TO WALK ALONE.</span><div className="hero-controls" role="group" aria-label="Hero slideshow controls">{photographic && <><button aria-label="Previous hero photo" onClick={() => move(-1)}><ArrowLeft size={18} /></button><span className="hero-count" aria-label={`Photo ${slide + 1} of ${heroPhotos.length}`}>{String(slide + 1).padStart(2, "0")} <span>/ {String(heroPhotos.length).padStart(2, "0")}</span></span><button aria-label="Next hero photo" onClick={() => move(1)}><ArrowRight size={18} /></button></>}<button className="pause-button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play hero motion" : "Pause hero motion"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div></div></div></div>
    <a href="#welcome" className="hero-scroll" aria-label="Explore the welcome section"><ArrowDown size={20} /></a>
  </section>;
}

export function PageHero({ label, title, emphasis, description, photo, number = "" }: { label: string; title: string; emphasis: string; description?: string; photo?: number; number?: string }) {
  return <section className={`page-hero ${photo !== undefined ? "with-photo" : ""}`}>{photo !== undefined && <><img src={image(photo)} alt="Life at Calvary Worship Center" /><div className="page-hero-shade" /></>}<div className="wrap"><Eyebrow number={number}>{label}</Eyebrow><h1>{title}<br /><em>{emphasis}</em></h1>{description && <p className="page-intro">{description}</p>}</div></section>;
}

export function PhotoStory({ compact = false }: { compact?: boolean }) {
  const photos = [
    { n: 21, title: "A warm welcome.", sub: "People who are glad you’re here." },
    { n: 29, title: "Worship with your whole heart.", sub: "Room to encounter the presence of God." },
    { n: 2, title: "A new beginning.", sub: "Lives made new in Jesus’ name." },
    { n: 28, title: "Better, together.", sub: "Different stories. One church family." },
    { n: 26, title: "One voice of praise.", sub: "A community lifting up Jesus." },
    { n: 11, title: "Faith for every season.", sub: "A place to grow, pray, and belong." },
    { n: 3, title: "A step of faith.", sub: "Celebrating new life together." },
    { n: 5, title: "Made new.", sub: "The joy of a new beginning." },
    { n: 6, title: "There’s room for you.", sub: "A familiar smile. A friendly hello." },
    { n: 8, title: "A song from the heart.", sub: "Giving God our praise." },
    { n: 12, title: "Lift your voice.", sub: "A church that loves to worship." },
    { n: 19, title: "We pray together.", sub: "Bringing every need to Jesus." },
    { n: 20, title: "Make room for prayer.", sub: "Quiet moments in His presence." },
    { n: 24, title: "Hope meets you here.", sub: "A place to seek God." },
    { n: 25, title: "Gathered in His name.", sub: "Many people. One purpose." },
    { n: 27, title: "Life across generations.", sub: "Sharing the journey of faith." },
    { n: 30, title: "The next generation.", sub: "Faith with a future." },
    { n: 13, title: "Standing with you.", sub: "A church family that cares." },
  ];
  return <section className={`story-section ${compact ? "compact" : ""}`}><div className="wrap section-heading reveal"><div><Eyebrow>Life at Calvary</Eyebrow><h2>This is what<br /><em>family looks like.</em></h2></div><p>Not just a place you go.<br />People you do life with.</p></div><Carousel opts={{ align: "start", loop: true }} className="photo-carousel" aria-label="Life at Calvary photo gallery"><CarouselContent>{photos.map(p => <CarouselItem key={p.n} className="story-slide"><div className="story-photo"><img src={image(p.n)} alt={p.title} loading="lazy" /><div className="story-caption"><h3>{p.title}</h3><p>{p.sub}</p></div></div></CarouselItem>)}</CarouselContent><div className="carousel-bottom wrap"><span>EVERY FACE. EVERY STORY. A PLACE TO BELONG.</span><div className="carousel-buttons"><CarouselPrevious /><CarouselNext /></div></div></Carousel></section>;
}

export function PreachingGallery() {
  return <section className="preaching-section"><div className="wrap section-heading reveal"><div><Eyebrow>From the Calvary pulpit</Eyebrow><h2>Rooted in the Word.<br /><em>Alive in our lives.</em></h2></div><TextLink href="/watch-and-listen">Watch & listen</TextLink></div><Carousel opts={{ align: "start", loop: true }} className="photo-carousel pulpit-carousel" aria-label="Preaching and ministry at Calvary"><CarouselContent>{[4, 9, 10, 14, 15, 16, 17, 22, 23].map(n => <CarouselItem key={n} className="pulpit-slide"><img src={image(n)} alt="Preaching and ministry on the Calvary platform" loading="lazy" /></CarouselItem>)}</CarouselContent><div className="carousel-bottom wrap"><span>WORSHIP. THE WORD. A LIFE OF FAITH.</span><div className="carousel-buttons"><CarouselPrevious /><CarouselNext /></div></div></Carousel></section>;
}

export function ServiceStrip() { return <div className="service-strip"><div className="wrap"><Link href="/schedules"><span className="strip-label">GATHER WITH US</span><span>Sunday <b>11 AM</b></span><span className="strip-divider" /><span>Wednesday Night <b>7 PM</b></span><ArrowUpRight size={18} /></Link><a href={church.directions} target="_blank" rel="noreferrer"><MapPin size={16} /><span>Sacramento, CA</span><ArrowUpRight size={17} /></a></div></div>; }

export function VisitBlock() { return <section className="visit-section wrap reveal"><div className="visit-photo"><img src={image(6)} alt="A friendly face at Calvary Worship Center" loading="lazy" /><span>COME AS YOU ARE.</span></div><div className="visit-copy"><Eyebrow>Your Sunday starts here</Eyebrow><h2>First time?<br /><em>You’re family.</em></h2><p>You don’t have to have it all figured out. Come experience heartfelt worship, Bible-centered teaching, and a community ready to welcome you.</p><div className="visit-times"><span>SUNDAY WORSHIP<strong>11:00 AM</strong></span><span>WEDNESDAY NIGHT<strong>7:00 PM</strong></span></div><Action href="/schedules">Times & directions</Action></div></section>; }

export function MessageCards({ limit = 3 }: { limit?: number }) {
  const [selected, setSelected] = useState<(typeof messages)[number] | null>(null);
  return <><div className="message-grid">{messages.slice(0, limit).map(m => <button className="message-card" key={m.url} onClick={() => setSelected(m)}><div className="message-image"><img src={m.image} alt="" loading="lazy" /><span className="message-play"><Play size={20} fill="currentColor" /></span><span className="message-tag">{m.date.startsWith("Sunday") ? "SUNDAY WORSHIP" : "BIBLE STUDY"}</span></div><div className="message-info"><p>{m.date}</p><h3>{m.title}<ArrowUpRight size={22} /></h3></div></button>)}</div><Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="video-modal"><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>{selected?.date}</DialogDescription>{selected && (selected.videoSrc ? <video key={selected.videoSrc} src={selected.videoSrc} poster={selected.image} title={selected.title} controls autoPlay playsInline preload="metadata" className="message-frame" /> : <iframe src={selected.url} title={selected.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="message-frame" />)}<a href={selected?.url} target="_blank" rel="noreferrer" className="text-link">Open video in a new tab<ArrowUpRight size={16} /></a></DialogContent></Dialog></>;
}

export function ContactForm({ mode = "contact" }: { mode?: "contact" | "nextsteps" | "flyer" }) {
  const [draft, setDraft] = useState<string | null>(null);
  const subject = mode === "nextsteps" ? "Next Steps enrollment" : mode === "flyer" ? "Event flyer request" : "Hello, Calvary";
  return <form className="contact-form" onSubmit={e => { e.preventDefault(); const data = new FormData(e.currentTarget); const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}\n${mode === "flyer" ? `Department: ${data.get("department")}\nEvent date: ${data.get("eventdate")}\nEvent time: ${data.get("eventtime")}\nContact person: ${data.get("contactperson")}\nHost: ${data.get("host")}\nNeeded by: ${data.get("neededby")}\nMedia formats: ${data.get("formats")}\nQuantities: ${data.get("quantities")}\n` : ""}\n${data.get("message")}`; const href = `mailto:${church.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; setDraft(href); window.location.href = href; }}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="First and last name" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div><label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="(916) 000-0000" /></label>{mode === "flyer" && <><div className="form-row"><label>Ministry / department<input name="department" required /></label><label>Event contact person<input name="contactperson" required /></label></div><div className="form-row"><label>Event date<input type="date" name="eventdate" required /></label><label>Event time<input type="time" name="eventtime" required /></label></div><div className="form-row"><label>Sponsored or hosted by<input name="host" required /></label><label>Date needed by<input type="date" name="neededby" required /></label></div><label>Media formats<input name="formats" placeholder="4×6, poster, business card, 8×11, or digital" required /></label><label>Number of each<input name="quantities" placeholder="e.g. 25 posters and one digital graphic" /></label></>}<label>{mode === "flyer" ? "Event details, cost, colors, and design" : "How can we help?"}<textarea name="message" rows={5} placeholder={mode === "nextsteps" ? "I’d like to learn more about Next Steps…" : mode === "flyer" ? "Event name, date, time, location, and the details to include…" : "A question, a prayer request, or simply hello…"} required maxLength={4000} /></label><button type="submit" className="button gold"><span>Compose email</span><ArrowUpRight size={18} /></button><p className="form-note">Opens your email app with your message ready to send to our church office.</p>{draft && <p role="status" className="form-status">Your email draft is ready. Send it from your email app, or <a href={draft}>open it again</a>. You can also call <a href="tel:+19163937000">916.393.7000</a>.</p>}</form>;
}

export function CopyEmail() { const [copied, setCopied] = useState(false); const [failed, setFailed] = useState(false); return <><button className="copy-email" onClick={async () => { try { await navigator.clipboard.writeText(church.email); setCopied(true); setTimeout(() => setCopied(false), 3000); } catch { setFailed(true); } }} aria-label="Copy giving email address"><span>office@calvaryforyou.com</span>{copied ? "Copied ✓" : "Copy +"}</button><span className="sr-only" role="status">{copied ? "Email address copied" : ""}</span>{failed && <p className="form-note">Select and copy the email address above.</p>}</>; }
