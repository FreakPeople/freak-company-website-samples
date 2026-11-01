"use client";

/* The reference media is local so it can be replaced independently of the UI. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Search, X, Pause, Play } from "lucide-react";
import content from "./content.json";
import "./museum.css";

const asset = (name: string) => `/sites/frans-hals-museum/${name}`;
const brandUrl = "https://www.freakmakers.co.kr";
const destination = (path: string) => {
  if (path.includes("collection")) return "#collection";
  if (path.includes("families") || path.includes("see-and-do") || path.includes("education")) return "#families";
  if (path.includes("about-frans")) return "#artists";
  if (path.includes("about-us") || path.includes("research")) return "#about";
  if (path.includes("visit-us")) return "#visit";
  return `${brandUrl}/#contact`;
};
const navigation = [["Visit", "/en/visit-us"], ["See & do", "/en/see-and-do"], ["Collection", "/en/collection"], ["About us", "/en/about-us"]];
const secondary = [["Families & children", "/en/families-and-children"], ["Groups & tours", "/en/visit-us/groups"], ["Projects & research", "/en/research"], ["Space rental", "/en/about-us/events-and-space-rental"], ["Education", "/en/education"], ["Support us", "/en/support-us"]];

function Carousel({ group, title }: { group: string; title: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });
  function updateBounds() {
    const el = rail.current;
    if (el) setBounds({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }
  function move(direction: number) {
    const el = rail.current;
    if (el) el.scrollBy({ left: direction * ((el.firstElementChild?.getBoundingClientRect().width ?? 320) + 24), behavior: "smooth" });
  }
  return <section className="museum-carousel" id={group === "art" ? "collection" : "families"} aria-label={title}>
    <div className="museum-container section-heading"><h2>{title}</h2>{group === "art" && <a className="museum-button outline" href={destination("/en/collection")}>Discover our collection</a>}</div>
    <div className="museum-rail" ref={rail} onScroll={updateBounds} tabIndex={0} aria-label={`${title} cards`}>
      {content.filter(card => card.group === group).map(card => <a className="museum-card" key={card.image} href={card.href}>
        <img src={asset(card.image)} alt={card.alt} loading="lazy" />
        {group === "family" && <span className="activity-badge">{card.texts[0]}</span>}
        <div className="museum-card-caption">{group === "art" ? <><strong>{card.texts[0]}</strong><span>{card.texts[1]}</span><span>{card.texts[2]}</span></> : <><span>{card.texts[1]}</span><strong>{card.texts[2]}</strong></>}</div>
      </a>)}
    </div>
    <div className="museum-container carousel-controls"><button onClick={() => move(-1)} disabled={bounds.start} aria-label={`Scroll ${title} left`}><ArrowLeft /></button><button onClick={() => move(1)} disabled={bounds.end} aria-label={`Scroll ${title} right`}><ArrowRight /></button></div>
  </section>;
}

export function Museum() {
  const [menu, setMenu] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [newsletterNotice, setNewsletterNotice] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setCookieVisible(!localStorage.getItem("freak-museum-cookie-choice")));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!menu && !cookieVisible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = menu ? menuPanel.current : document.querySelector<HTMLElement>(".cookie-dialog");
    panel?.querySelector<HTMLElement>("button,a")?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape" && menu) { setMenu(false); menuButton.current?.focus(); }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>('a[href],button,input')].filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", keydown); };
  }, [menu, cookieVisible]);
  function chooseCookies(choice: string) { localStorage.setItem("freak-museum-cookie-choice", choice); setCookieVisible(false); }
  async function toggleVideo() {
    if (!video.current) return;
    if (video.current.paused) { try { await video.current.play(); setPaused(false); } catch { setPaused(true); } }
    else { video.current.pause(); setPaused(true); }
  }
  function header(inMenu = false) {
    return <div className={`museum-header museum-container ${inMenu ? "menu-header" : ""}`}>
      <a href="/en" className="museum-logo" aria-label="Go to home"><img src={asset("freak-logo.svg")} alt="FREAK ART MUSEUM" /></a>
      {!inMenu && <nav className="desktop-navigation" aria-label="Main">{navigation.map(([label, path]) => <a key={path} href={destination(path)}>{label}</a>)}</nav>}
      <div className="header-actions"><a className="search-link" aria-label="Start search" href={destination("/en/search")}><Search size={32} strokeWidth={1.6} /></a><div className="language"><a href={brandUrl} lang="ko">KO</a><a href="/en" aria-current="page">EN</a></div><a className="museum-button tickets" href={destination("/en/tickets-and-opening-hours")}>Order tickets</a><button ref={inMenu ? undefined : menuButton} className="menu-button" aria-label={inMenu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="museum-menu" onClick={() => { setMenu(!menu); if (menu) menuButton.current?.focus(); }}>{inMenu ? <X size={42} strokeWidth={2} /> : <><span className="menu-lines" /><span>Menu</span></>}</button></div>
    </div>;
  }
  return <div className="museum-site">
    <a className="skip-link" href="#content">Skip to main content</a>
    <div className="museum-hero">
      <video ref={video} poster={asset("freak-museum-exterior.png")} autoPlay muted loop playsInline aria-label="A visit to the FREAK ART MUSEUM" ><source src={asset("freak-hero-mobile.mp4")} media="(max-width: 767px)" type="video/mp4" /><source src={asset("freak-hero.mp4")} type="video/mp4" /></video><div className="hero-shade" />
      {header()}<h1 className="sr-only">FREAK ART MUSEUM — Art, curiosity & new perspectives</h1>
      <button className="video-control" onClick={toggleVideo} aria-label={paused ? "Play video" : "Pause video"}>{paused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}</button>
    </div>
    <main id="content">
      <div className="museum-primary">
        <section className="museum-container museum-introduction" id="visit"><img className="intro-image" src={asset("welcome.jpg")} alt="Two visitors looking at a painting at the FREAK ART MUSEUM" /><div className="intro-copy"><h2>Welcome to the FREAK ART MUSEUM</h2><p>FREAK ART MUSEUM brings art and fresh perspectives together. Explore expressive portraits, remarkable stories and works that connect the past with the present. Discover artists including Frans Hals, Judith Leyster, Charley Toorop and a new generation of creative voices.</p><p>Discover classical, modern and contemporary art with the curiosity and imagination of Freak Makers.</p><a className="museum-button" href={destination("/en/visit-us")}>Plan your visit</a></div></section>
        <Carousel group="art" title="Our highlights" /><Carousel group="family" title="For families & children" />
      </div>
      <section className="museum-feature dark-feature" id="artists"><a className="museum-container feature-card" href={destination("/en/about-us/about-frans-hals")}><img src={asset("about-frans.jpg")} alt="Frans Hals, The Officers of the St George Militia Company, 1639" loading="lazy" /><div className="feature-copy"><div><p>Who was the 17th-century painter?</p><h2>About Frans Hals</h2></div><span className="museum-button">Learn more</span></div></a></section>
      <section className="museum-feature green-feature" id="about"><a className="museum-container feature-card" href={destination("/en/about-us")}><img src={asset("freak-museum-exterior.png")} alt="Exterior of the FREAK ART MUSEUM" loading="lazy" /><div className="feature-copy"><div><p>Art, curiosity & new perspectives</p><h2>About the FREAK ART MUSEUM</h2></div><span className="museum-button">Read more</span></div></a></section>
    </main>
    <footer className="museum-footer"><div className="museum-container footer-top"><div><h2>FREAK ART MUSEUM</h2><p>Freak Makers · Art & culture</p><p>Open Tuesday – Sunday</p><p>11 am – 5 pm</p></div><nav aria-label="Footer">{[["Support us","support-us"],["News","news"],["Press","press"],["Work at","work-at"],["Contact","contact"]].map(([label,path]) => <a key={path} href={destination(`/en/${path}`)}>{label}</a>)}</nav><div className="newsletter"><h2>Stay informed</h2><p>Subscribe to our newsletter</p><form onSubmit={(event) => { event.preventDefault(); setNewsletterNotice(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" name="email" required placeholder="example@email.com" /><button type="submit" className="museum-button">Subscribe</button></form>{newsletterNotice && <p className="newsletter-notice" role="status">For exhibition news, please <a href="mailto:freakmakers@gmail.com">contact FREAK ART MUSEUM</a>.</p>}</div></div><div className="museum-container footer-bottom"><nav className="legal-links" aria-label="Legal">{[["About Freak Makers","introduce"],["Contact","contact"],["Freak Makers","home"]].map(([label,path])=><a key={path} href={path === "introduce" ? `${brandUrl}/introduce` : path === "home" ? brandUrl : `${brandUrl}/#contact`}>{label}</a>)}</nav><div className="partners"><a href={brandUrl} aria-label="Freak Makers"><img src={asset("freak-makers.svg")} alt="FREAK MAKERS" /></a></div><nav className="social-links" aria-label="Freak Makers links"><a href={brandUrl} aria-label="Freak Makers website">F</a><a href="mailto:freakmakers@gmail.com" aria-label="Email FREAK ART MUSEUM">@</a></nav></div></footer>
    {menu && <div id="museum-menu" className="museum-menu" role="dialog" aria-modal="true" aria-label="Menu" ref={menuPanel}>{header(true)}<div className="menu-content"><nav aria-label="Main menu">{navigation.map(([label,path])=><a key={path} href={destination(path)}>{label}</a>)}</nav><nav className="direct-links" aria-label="Directly to"><h2>Directly to</h2>{secondary.map(([label,path])=><a key={path} href={destination(path)}>{label}</a>)}</nav><a className="museum-button mobile-menu-tickets" href={destination("/en/tickets-and-opening-hours")}>Order tickets</a><a className="mobile-menu-search" href={destination("/en/search")}><Search /> Search</a></div><div className="museum-container menu-address"><h2>FREAK ART MUSEUM</h2><p>Freak Makers · Art & culture</p><p>Open Tuesday to Sunday<br />from 11 am till 5 pm</p></div></div>}
    {cookieVisible && <div className="cookie-backdrop"><div className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookies-heading"><h2 id="cookies-heading">Cookies</h2><p>We use cookies to make the website work properly, to measure usage and to show relevant advertisements, for example. If you click ‘Agree’, you accept all <a href={destination("/en/cookie-statement")}>cookies</a>. Rather not? Then we only place functional and anonymous analytical cookies.</p><div><button className="museum-button" onClick={()=>chooseCookies("accepted")}>Accept</button><button className="cookie-reject" onClick={()=>chooseCookies("necessary")}>No, rather not</button></div></div></div>}
  </div>;
}
