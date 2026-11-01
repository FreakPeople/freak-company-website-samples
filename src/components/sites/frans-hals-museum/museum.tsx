"use client";

/* The reference media is local so it can be replaced independently of the UI. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Pause, Play } from "lucide-react";
import content from "./content.json";
import "./museum.css";

const asset = (name: string) => `/sites/frans-hals-museum/${name}`;
const navigation = [["Visit", "#visit"], ["Collection", "#collection"], ["Families", "#families"], ["About us", "#about"]];
const secondary = [["Featured artist", "#artists"], ["Contact", "#contact"]];

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
    <div className="museum-container section-heading"><h2>{title}</h2></div>
    <div className="museum-rail" ref={rail} onScroll={updateBounds} tabIndex={0} aria-label={`${title} cards`}>
      {content.filter(card => card.group === group).map(card => <article className="museum-card" key={card.image}>
        <img src={asset(card.image)} alt={card.alt} loading="lazy" />
        {group === "family" && <span className="activity-badge">{card.texts[0]}</span>}
        <div className="museum-card-caption">{group === "art" ? <><strong>{card.texts[0]}</strong><span>{card.texts[1]}</span><span>{card.texts[2]}</span></> : <><span>{card.texts[1]}</span><strong>{card.texts[2]}</strong></>}</div>
      </article>)}
    </div>
    <div className="museum-container carousel-controls"><button onClick={() => move(-1)} disabled={bounds.start} aria-label={`Scroll ${title} left`}><ArrowLeft /></button><button onClick={() => move(1)} disabled={bounds.end} aria-label={`Scroll ${title} right`}><ArrowRight /></button></div>
  </section>;
}

export function Museum() {
  const [menu, setMenu] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [copyNotice, setCopyNotice] = useState("");
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
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("freakmakers@gmail.com");
      setCopyNotice("Email address copied.");
    } catch {
      setCopyNotice("Select and copy the address: freakmakers@gmail.com");
    }
  }
  function header(inMenu = false) {
    return <div className={`museum-header museum-container ${inMenu ? "menu-header" : ""}`}>
      <a href="#top" onClick={() => setMenu(false)} className="museum-logo" aria-label="Back to top"><img src={asset("freak-logo.svg")} alt="FREAK ART MUSEUM" /></a>
      {!inMenu && <nav className="desktop-navigation" aria-label="Main">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>}
      <div className="header-actions"><a className="museum-button tickets" href="#contact" onClick={() => setMenu(false)}>Contact</a><button ref={inMenu ? undefined : menuButton} className="menu-button" aria-label={inMenu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="museum-menu" onClick={() => { setMenu(!menu); if (menu) menuButton.current?.focus(); }}>{inMenu ? <X size={42} strokeWidth={2} /> : <><span className="menu-lines" /><span>Menu</span></>}</button></div>
    </div>;
  }
  return <div className="museum-site">
    <a className="skip-link" href="#content">Skip to main content</a>
    <div className="museum-hero" id="top">
      <video ref={video} poster={asset("freak-museum-exterior.png")} autoPlay muted loop playsInline aria-label="A visit to the FREAK ART MUSEUM" ><source src={asset("freak-hero-mobile.mp4")} media="(max-width: 767px)" type="video/mp4" /><source src={asset("freak-hero.mp4")} type="video/mp4" /></video><div className="hero-shade" />
      {header()}<h1 className="sr-only">FREAK ART MUSEUM — Art, curiosity & new perspectives</h1>
      <button className="video-control" onClick={toggleVideo} aria-label={paused ? "Play video" : "Pause video"}>{paused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}</button>
    </div>
    <main id="content">
      <div className="museum-primary">
        <section className="museum-container museum-introduction" id="visit"><img className="intro-image" src={asset("welcome.jpg")} alt="Two visitors looking at a painting at the FREAK ART MUSEUM" /><div className="intro-copy"><h2>Welcome to the FREAK ART MUSEUM</h2><p>FREAK ART MUSEUM brings art and fresh perspectives together. Explore expressive portraits, remarkable stories and works that connect the past with the present. Discover artists including Frans Hals, Judith Leyster, Charley Toorop and a new generation of creative voices.</p><p>Discover classical, modern and contemporary art with the curiosity and imagination of Freak Makers.</p><a className="museum-button" href="#collection">Explore the highlights</a></div></section>
        <Carousel group="art" title="Our highlights" /><Carousel group="family" title="For families & children" />
      </div>
      <section className="museum-feature dark-feature" id="artists"><div className="museum-container feature-card"><img src={asset("about-frans.jpg")} alt="Frans Hals, The Officers of the St George Militia Company, 1639" loading="lazy" /><div className="feature-copy"><div><p>Who was the 17th-century painter?</p><h2>About Frans Hals</h2></div><p className="feature-description">Expressive portraits, vivid brushwork and stories that invite a closer look.</p></div></div></section>
      <section className="museum-feature green-feature" id="about"><div className="museum-container feature-card"><img src={asset("freak-museum-exterior.png")} alt="Exterior of the FREAK ART MUSEUM" loading="lazy" /><div className="feature-copy"><div><p>Art, curiosity & new perspectives</p><h2>About the FREAK ART MUSEUM</h2></div><p className="feature-description">A place for art, fresh perspectives and shared discoveries. Explore our highlights and family activities above.</p></div></div></section>
    </main>
    <footer className="museum-footer" id="contact">
      <div className="museum-container footer-top">
        <div><h2>FREAK ART MUSEUM</h2><p>Freak Makers · Art & culture</p><p>Open Tuesday – Sunday</p><p>11 am – 5 pm</p></div>
        <nav aria-label="Footer">{[...navigation, ...secondary].map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="newsletter"><h2>Get in touch</h2><p>For exhibition and visit enquiries</p><p className="contact-email">freakmakers@gmail.com</p><button type="button" className="museum-button" onClick={copyEmail}>Copy email address</button><p role="status" className="newsletter-notice">{copyNotice}</p></div>
      </div>
      <div className="museum-container footer-bottom"><p>© FREAK ART MUSEUM · Freak Makers</p><a href="#top" aria-label="Back to top"><img className="footer-wordmark" src={asset("freak-makers.svg")} alt="FREAK MAKERS" /></a><a href="#visit">Back to introduction ↑</a></div>
    </footer>
    {menu && <div id="museum-menu" className="museum-menu" role="dialog" aria-modal="true" aria-label="Menu" ref={menuPanel}>{header(true)}<div className="menu-content"><nav aria-label="Main menu">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav><nav className="direct-links" aria-label="Explore"><h2>Explore</h2>{secondary.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav><a className="museum-button mobile-menu-tickets" href="#contact" onClick={() => setMenu(false)}>Contact</a></div><div className="museum-container menu-address"><h2>FREAK ART MUSEUM</h2><p>Freak Makers · Art & culture</p><p>Open Tuesday to Sunday<br />from 11 am till 5 pm</p></div></div>}
    {cookieVisible && <div className="cookie-backdrop"><div className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookies-heading"><h2 id="cookies-heading">Cookies</h2><p>We use cookies to make the website work properly, to measure usage and to show relevant advertisements, for example. If you click ‘Agree’, you accept all cookies. Rather not? Then we only place functional and anonymous analytical cookies.</p><div><button className="museum-button" onClick={()=>chooseCookies("accepted")}>Accept</button><button className="cookie-reject" onClick={()=>chooseCookies("necessary")}>No, rather not</button></div></div></div>}
  </div>;
}
