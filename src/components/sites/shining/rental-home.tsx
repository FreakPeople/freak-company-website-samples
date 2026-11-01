"use client";

/* Source photography has intentional fixed crops. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

const asset = (name: string) => `/sites/shining/${name}`;
const navigation = [
  { title: "ABOUT", href: "#about" },
  { title: "BUSINESS", href: "#business" },
  { title: "PRODUCT", href: "#product" },
  { title: "CONTACT", href: "#contact" },
];
const notices = [
  { title: "프릭 스마트 클린 렌탈 서비스 안내", body: "생활 공간에 맞는 가전과 생활용품을 제안합니다. 필요한 제품과 이용 환경을 알려주시면 적합한 렌탈 서비스를 안내해 드립니다." },
  { title: "기업 맞춤 렌탈 안내", body: "기업 규모와 업무 환경에 필요한 제품을 함께 검토합니다. 이용 기간과 관리 범위에 대한 상담은 아래 문의 안내에서 확인하세요." },
  { title: "제품 관리와 서비스 지원", body: "렌탈 제품을 편리하게 이용할 수 있도록 관리와 지원 서비스를 제공합니다. 이용 중 궁금한 사항은 고객센터 문의 이메일로 알려주세요." },
  { title: "렌탈 유통 창업 상담", body: "B2C 렌탈 유통과 서비스 대행 사업을 소개합니다. 관심 있는 사업 분야와 상담 내용을 이메일로 남겨주시면 안내해 드립니다." },
];
const businesses = [
  { title: "B2C 창업 렌탈 유통", description: "B2C 렌탈 유통 창업으로 고객에게 일상에서 필요로 하는 제품을 간편하게 대여할 수 있는 솔루션을 제공합니다.", image: "business-1.jpg", id: 35 },
  { title: "서비스대행", description: "전문 업체의 지원을 통해 품질 높은 서비스를 제공받고, 보다 더 나은 성과를 기대할 수 있습니다.", image: "business-2.jpg", id: 34 },
  { title: "기업 렌탈", description: "경제적이고 유연한 자원 관리 방법으로, 기업의 효율성과 생산성을 높이는 데 도움을 줍니다.", image: "business-3.jpg", id: 33 },
];

function Arrow({ direction = "up" }: { direction?: "up" | "left" | "right" }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{direction === "up" ? <path d="M7 17 17 7M7 7h10v10" /> : <path d={direction === "left" ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />}</svg>;
}

function More({ href, label }: { href: string; label: string }) {
  return <a className="round-more" href={href} aria-label={label}><Arrow /></a>;
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let animation = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(value); return; }
      const start = performance.now();
      const frame = (now: number) => {
        const progress = Math.min((now - start) / 3000, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) animation = requestAnimationFrame(frame);
      };
      animation = requestAnimationFrame(frame);
    });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(animation); };
  }, [value]);
  return <span ref={ref}>{count.toLocaleString("en-US")}</span>;
}

export function RentalHome() {
  const [hero, setHero] = useState(0);
  const [businessPosition, setBusinessPosition] = useState(1);
  const [businessTransition, setBusinessTransition] = useState(true);
  const business = ((businessPosition - 1) % 3 + 3) % 3;
  const businessBusy = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const moveBusiness = (direction: number) => {
    if (businessBusy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBusinessTransition(false);
      setBusinessPosition((position) => ((position - 1 + direction + 3) % 3) + 1);
      return;
    }
    businessBusy.current = true;
    setBusinessTransition(true);
    setBusinessPosition((position) => position + direction);
  };
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("freakmakers@gmail.com");
      setCopyStatus("이메일 주소를 복사했습니다.");
    } catch {
      setCopyStatus("freakmakers@gmail.com 주소를 직접 복사해 주세요.");
    }
  };
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setHero((s) => (s + 1) % 3), 3500);
    return () => window.clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => moveBusiness(1), 2500);
    return () => window.clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="rental-site" ref={rootRef}>
    <a className="skip-link" href="#content">본문 바로가기</a>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menu ? "menu-open" : ""}`}>
      <a className="site-logo" href="#intro" aria-label="프릭렌탈 | FREAK rental"><img src={asset("freak-logo.svg")} width="154" height="24" alt="FREAK rental" /></a>
      <nav className="desktop-nav" aria-label="메인 메뉴">
        <ul>{navigation.map((nav) => <li key={nav.title}><a href={nav.href}>{nav.title}</a></li>)}</ul>
      </nav>
      <a className="contact-pill" href="#contact">Contact us <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M16 3l5 5M10 14l1-5 8-8 5 5-8 8Z" /></svg></a>
      <button className="menu-toggle" aria-label={menu ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}><span /><span /></button>
      {menu && <nav className="mobile-nav" id="mobile-menu" aria-label="모바일 메뉴">{navigation.map((nav) => <div key={nav.title}><a href={nav.href} onClick={() => setMenu(false)}>{nav.title}</a></div>)}</nav>}
    </header>
    <main id="content">
      <section id="intro" className="hero" aria-label="메인 슬라이드" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {[1, 2, 3].map((n, i) => <div key={n} className={`hero-image hero-image-${n} ${hero === i ? "active" : ""}`} />)}
        <div className="hero-copy">
          <p className="hero-eyebrow">Towards New Possibilities</p>
          <h1>당신의 삶에가치를 더하는<br /><strong>플랫폼 사업을 혁신합니다</strong></h1>
          <p className="hero-description">새로운 가능성을 향해 프릭렌탈 서비스는 더 높이 뻗어갑니다.</p>
          <div className="hero-controls"><button aria-label="메인 이전 슬라이드" onClick={() => setHero((hero + 2) % 3)}><Arrow direction="left" /></button><span className="hero-pagination"><b>{hero + 1}</b><span>/</span>3</span><button aria-label="메인 다음 슬라이드" onClick={() => setHero((hero + 1) % 3)}><Arrow direction="right" /></button></div>
        </div>
      </section>
      <section className="statistics" aria-label="기업 실적">
        {[{ en: "YEARS", ko: "국내 렌탈 시장 선도", value: 20, unit: "년차" }, { en: "PENENUE", ko: "렌탈 서비스 매출 성장", value: 1200, unit: "억" }, { en: "COMPANIES", ko: "전국 렌탈 서비스 기업", value: 102, unit: "개" }].map((stat, i) => <div className="stat" key={stat.en}><div className="stat-top"><div><p>{stat.en}</p>{stat.ko}</div><div className="stat-icon"><img src={asset(`icon-${i + 1}.png`)} alt="" /></div></div><div className="stat-number"><Counter value={stat.value} /> {stat.unit}</div></div>)}
      </section>
      <section className="business" id="business" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="business-inner"><div className="business-heading" data-reveal><div><p className="eyebrow">OUR BUSINESS</p><h2>렌탈 서비스를 통해 부담 없이<br /> <strong>최신 기술을 쉽게 이용할 수 있습니다.</strong></h2></div><div className="business-controls"><button aria-label="사업 이전 슬라이드" onClick={() => moveBusiness(-1)}><Arrow direction="left" /></button><button aria-label="사업 다음 슬라이드" onClick={() => moveBusiness(1)}><Arrow direction="right" /></button></div></div>
          <div className="business-slider" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 50) moveBusiness(delta > 0 ? -1 : 1); touchStart.current = null; }}>
            <div className={`business-track ${businessTransition ? "" : "reset"}`} style={{ transform: `translateX(calc(var(--slide-step) * -${businessPosition}))` }} onTransitionEnd={() => {
              businessBusy.current = false;
              if (businessPosition === 4 || businessPosition === 0) {
                setBusinessTransition(false);
                setBusinessPosition(businessPosition === 4 ? 1 : 3);
              }
            }}>{[2, 0, 1, 2, 0].map((itemIndex, offset) => { const item = businesses[itemIndex]; return <article className="business-card" key={`${offset}-${item.id}`}><div className="business-photo"><img src={asset(item.image)} alt={item.title} width="620" height="550" /></div><div className="business-info"><p className="business-pagination"><b>0{business + 1}</b><span> / 03</span></p><h3>{item.title}</h3><p>{item.description}</p><More href="#contact" label={`${item.title} 상담 안내`} /></div></article>; })}</div>
          </div>
        </div>
      </section>
      <section className="product" id="product"><div className="product-heading" data-reveal><p className="eyebrow">OUR PRODUCT</p><h2>단순한 제품 제공을 넘어서 고객의 삶의 질을 높이고<br /> <strong>새로운 경험을 선사하겠습니다.</strong></h2></div><div className="product-grid"><div className="product-photo"><div><h3>고객만족을 위한 철저한 관리와<br />신속한 서비스를 약속드립니다.</h3><p>지속인 관리, 지원 서비스로 신뢰할 수 있는 만족감을 드립니다.</p><More href="#contact" label="제품 상담 안내" /></div></div><div className="notices">{notices.map((notice) => <article className="notice" key={notice.title}><span className="notice-tag">NOTICE</span><h3>{notice.title}</h3><p>{notice.body}</p></article>)}</div></div></section>
      <section className="rental-about" id="about"><div className="about-heading" data-reveal><div><p className="eyebrow">FREAK RENTAL</p><h2>고객의 일상을 편리하고<br />풍요롭게 만들기위해 언제나<br />노력하겠습니다.</h2></div><p className="about-description">최신의 가전제품과 트렌디한 생활용품을 부담 없이 누릴 수 있도록<br />도와드리며, 고객의 라이프스타일에 최적화된 맞춤형 렌탈 솔루션을 제안하여,<br />고품질 제품과 빠르고 신뢰할 수 있는 서비스로 만족을 드립니다.</p></div><div className="team-photo"><img src={asset("section-3.jpg")} alt="함께 소통하며 일하는 프릭렌탈 팀" width="1842" height="683" /><a className="detail-view" href="#contact"><span><Arrow /></span>문의 안내</a></div></section>
      <section className="contact-section" id="contact"><div className="contact-heading" data-reveal><p className="eyebrow">CONTACT US</p><h2>고객의 다양한 니즈를 위해<br />최상의 렌탈 서비스를 제공합니다.</h2></div><div className="contact-row"><h3>제품문의</h3><p>유연한 계약 조건과 서비스로 고객의 부담을 덜어드리며, 지속적으로<br />관리하고 지원하는 서비스를 통해 안심하고 사용할 수 있습니다.</p><More href="#contact-info" label="제품문의 이메일 확인" /></div><div className="contact-row"><h3>고객센터</h3><p>고객의 필요와 라이프스타일에 최적화된 맞춤형 렌탈 솔루션을 제안하며,<br />고품질 제품과 빠르고 신뢰할 수 있는 서비스로 만족을 드립니다.</p><More href="#contact-info" label="고객센터 이메일 확인" /></div></section>
    </main>
    <footer className="site-footer"><div className="footer-inner"><div className="footer-top"><a href="#intro" aria-label="홈"><img src={asset("freak-logo.svg")} width="154" height="24" alt="FREAK rental" /></a><div><a href="#about">프릭 소개</a><a href="#business">서비스 안내</a><a href="#contact">문의하기</a></div></div><div className="footer-address" id="contact-info"><div><p>프릭렌탈 · FREAK rental<br />당신의 일상에 새로운 가치를 더하는 렌탈 파트너<br />이메일 : freakmakers@gmail.com</p><button className="email-copy" onClick={copyEmail}>이메일 주소 복사</button><p role="status">{copyStatus}</p></div><a className="brochure" href="#about">프릭 소개 <Arrow /></a></div><div className="copyright"><span>ⓒ 프릭렌탈 | FREAK rental</span><div><a href="#contact">CONTACT</a><a href="#intro">FREAK RENTAL</a></div></div></div></footer>
  </div>;
}
