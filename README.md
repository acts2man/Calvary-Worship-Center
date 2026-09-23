# Calvary Worship Center

A responsive React / Vinext website for Calvary Worship Center, Sacramento.

## Content

The site includes Home, Discover Calvary, Get Connected, Watch & Listen, About Us, Our Pastors, Our History, Times & Location, Ministries, Next Steps, Giving, Messages, Livestream, Contact, Members, Calendar, and Event Flyer Requests.

Church photography and pastoral portraits come from the supplied Calvary archive. Service titles, dates, and archive links are preserved in `lib/calvary/messages.json`. Ministry leadership and beliefs follow the official church site. Church contact information and external destinations are in `lib/calvary/config.ts`.

## Hero video

Set `heroVideo` in `lib/calvary/config.ts` to the final approved MP4 or WebM video URL. The hero includes autoplay, mute, looping, inline mobile playback, a pause control, reduced-motion handling, and a photographic fallback. Until the video is supplied, the homepage uses six supplied preaching and worship photographs with crossfades.

## Forms and media

Contact, Next Steps, and flyer forms validate required information and compose an email to office@calvaryforyou.com. Visitors send that draft from their email app; these forms do not claim a server-side delivery. Giving opens the church’s existing Church Center page. Zelle / Venmo use the office email shown on the original site.

Messages play the original provider’s public MP4 streams in an accessible dialog with controls and links to the original archive. The archive list reflects the supplied September 2026 snapshot; the full archive link remains available for newer services. Live broadcasts use Calvary’s existing Christian World Media player. The calendar embeds the existing church Google Calendar in Pacific time.

## Development

Use the project’s existing pnpm lockfile. `pnpm dev` runs the site and `pnpm build` creates the Worker-compatible bundle. The Sites supervised preview owns local preview startup in the managed environment. Hosting identity is recorded in `.openai/hosting.json`.

## Design

The supplied Calvary logo is preserved at `public/images/calvary-logo.jpg`. Burgundy, white, and warm neutral theme tokens are in `app/globals.css`; the shared layout is in `app/calvary.css` and brand-specific/mobile rules are in `app/brand.css`. Page content is in `components/calvary/pages.tsx` and `components/calvary/hub-pages.tsx`; navigation, hero, carousels, video dialogs, and forms are in `components/calvary/shared.tsx`.

All 17 pages have explicit routes. Native anchor links keep navigation functional before hydration and through the hosted access gateway. The original 31 church photos appear across the hero, life-at-Calvary carousel, and pulpit gallery. Wednesday gatherings are labeled Wednesday Night.
