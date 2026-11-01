/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { LowerSections } from "./lower-sections";
import styles from "./dental-homepage.module.css";

const origin = "https://lea1.imweb.me";
const asset = (name: string) => `/sites/lea1/${name}`;
const nav = [["진료 소개", "/clinic"], ["병원 소개", "/about"], ["의료진 소개", "/doctor"], ["프로모션", "/event"]];

function Icon({ name, className }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    arrow: "M5 13L13 5M7 5h6v6",
    prev: "M15 4l-8 8 8 8", next: "M9 4l8 8-8 8",
    calendar: "M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 14l2 2 4-4",
    book: "M12 7v14M2 3h5a4 4 0 0 1 5 4 4 4 0 0 1 5-4h5v14h-5a4 4 0 0 0-5 4 4 4 0 0 0-5-4H2Z",
    phone: "M7.5 3H4.8c-.9 0-1.6.8-1.5 1.7A16.5 16.5 0 0 0 19.3 20.7c.9.1 1.7-.6 1.7-1.5v-2.7l-4.2-1.8-2 2.2a13 13 0 0 1-6.7-6.7l2.2-2Z",
    headset: "M3 13v-2a9 9 0 0 1 18 0v8a3 3 0 0 1-3 3h-3M3 12h3v7H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1ZM21 12h-3v7h3a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1Z",
    menu: "M3 5h18M3 12h18M3 19h18", close: "M5 5l14 14M19 5 5 19",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    mail: "M3 5h18v14H3ZM3 6l9 7 9-7",
    instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 7h.01",
    youtube: "M3 6q9-2 18 0v12q-9 2-18 0ZM10 9l5 3-5 3Z",
    facebook: "M15 22v-9h3l1-4h-4V7q0-2 3-2h1V1h-3q-6 0-6 6v2H7v4h3v9",
  };
  return <svg className={className} viewBox={name === "arrow" ? "0 0 20 20" : "0 0 24 24"} fill="none" stroke="currentColor" strokeWidth={name === "arrow" ? 1.8 : 1.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}

function ActionLink({ children, href, light = false }: { children: ReactNode; href: string; light?: boolean }) {
  return <a href={href} className={`${styles.action} ${light ? styles.actionLight : ""}`}><span>{children}</span><span className={styles.actionIcon}><Icon name="arrow" /></span></a>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.visible = "true"; observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", close); };
  }, [open]);
  return <>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <button className={styles.menuButton} onClick={() => setOpen(true)} aria-label="메뉴 열기" aria-expanded={open}><Icon name="menu" /></button>
        <Link className={styles.logo} href="/" aria-label="밝은미래치과 홈"><img src={asset("85245501cae27.png")} alt="밝은미래치과" width="174" height="29" /></Link>
        <nav className={styles.desktopNav} aria-label="주 메뉴">{nav.map(([label, path]) => <a key={path} href={origin + path}>{label}</a>)}</nav>
        <Link className={styles.inquiry} href="/">온라인 견적 문의 <Icon name="arrow" /></Link>
        <Link className={styles.mobileCall} href="/" aria-label="온라인 견적 문의"><Icon name="headset" /></Link>
      </div>
    </header>
    {open && <div className={styles.menuOverlay}>
      <button className={styles.menuBackdrop} onClick={() => setOpen(false)} aria-label="메뉴 닫기" />
      <nav className={styles.mobileNav} aria-label="모바일 메뉴"><div className={styles.loginRow}><span>로그인이 필요합니다.</span><a href={`${origin}/?mode=login`}>로그인</a></div>{nav.map(([label,path]) => <a key={path} href={origin+path}>{label}</a>)}</nav>
      <button className={styles.closeMenu} onClick={() => setOpen(false)} aria-label="메뉴 닫기"><Icon name="close" /></button>
    </div>}
  </>;
}

const slides = [
  { image: "35c661d1-afcd-4fd3-bc4a-439e5ba4ab00.webp", eyebrow: "고난이도 치과치료 특화병원", title: ["오늘의 치료가", "오래도록 이어지도록"], cta: "진료안내 더보기" },
  { image: "f1f9c69c-34d0-41ec-9e9b-7ed642dc7abb.webp", eyebrow: "디지털 정밀 진단 시스템", title: ["보이지 않던 것까지", "먼저 확인합니다"], cta: "진단 시스템 보기" },
  { image: "0f87828f-1d1b-47bb-bca4-d023cf8192a7.webp", eyebrow: "전 진료과목 협진 진료", title: ["한 자리에서", "끝까지 함께합니다"], cta: "진료과목 보기" },
];

function Hero() {
  const [current, setCurrent] = useState(1);
  const [animated, setAnimated] = useState(true);
  const start = useRef<number | null>(null);
  const all = [slides[2], ...slides, slides[0]];
  useEffect(() => {
    const timer = setInterval(() => { setAnimated(true); setCurrent(i => i >= 4 ? 1 : i + 1); }, 5000);
    return () => clearInterval(timer);
  }, []);
  const move = (direction: number) => { setAnimated(true); setCurrent(i => Math.max(0, Math.min(4, i + direction))); };
  return <section className={styles.hero} aria-label="병원 소개 슬라이드" tabIndex={0}
    onKeyDown={e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}
    onPointerDown={e => { if (!(e.target as HTMLElement).closest("a")) { start.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); } }}
    onPointerUp={e => { if (start.current !== null && Math.abs(e.clientX - start.current) > 40) move(e.clientX < start.current ? 1 : -1); start.current = null; }}>
    <div className={styles.heroTrack} style={{ transform: `translateX(-${current * 100}%)`, transitionDuration: animated ? "600ms" : "0ms" }} onTransitionEnd={() => { if (current === 4 || current === 0) { setAnimated(false); setCurrent(current === 4 ? 1 : 3); } }}>
      {all.map((slide,i) => <div key={i} className={styles.heroSlide} aria-hidden={current !== i}>
        <img src={asset(slide.image)} alt="" fetchPriority={i === 1 ? "high" : "auto"} draggable={false} />
        <div className={styles.heroDim} />
        <div className={styles.heroCopy}><p>{slide.eyebrow}</p><h1>{slide.title[0]}<br />{slide.title[1]}</h1><ActionLink href={`${origin}/clinic`} light>{slide.cta}</ActionLink></div>
      </div>)}
    </div><div className={styles.heroBase} />
  </section>;
}

const services = [
  { image: "20e814d6-6926-450c-bdf3-e03b7c7ad331.webp", badge: "AESTHETIC", title: "당일 심미 치료", desc: "라미네이트, 레진, 크라운 등 심미 보철을 당일 완성합니다.", more: "바쁜 일상 속에서도 빠르게 미소를 되찾을 수 있습니다." },
  { image: "936a34c0-9482-4589-b148-17d911dee940.webp", badge: "IMPLANT", title: "임플란트", desc: "3D 구강 스캐너와 맞춤형 가이드를 적용해 식립 위치를 계획합니다.", more: "시술 후 관리까지 이어서 진행합니다." },
  { image: "2f5b65a6-079c-4aa0-8bc7-b4ead52dd474.webp", badge: "ORTHODONTICS", title: "교정치료", desc: "투명교정부터 설측교정까지 다양한 방법으로 아름다운 치열을 완성합니다.", more: "디지털 시뮬레이션으로 치료 결과를 미리 확인하세요." },
  { image: "c5c14bd2-cb96-4efe-b746-f8d53fe63bec.webp", badge: "WHITENING", title: "미백치료", desc: "치아 상태에 맞춰 전문가 미백과 자가 미백을 병행합니다.", more: "시술 전후 색조를 기록해 변화를 확인합니다." },
];

function Services() {
  const [active,setActive] = useState(0);
  const [paused,setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive(i => (i + 1) % services.length),4000);
    return () => clearInterval(timer);
  },[paused]);
  return <section className={styles.services}>
    <div className="lea-container"><Reveal className={styles.sectionHeading}><p>OUR SERVICES</p><h2>분야별 전문 진료를 소개합니다</h2><div>밝은미래치과는 모든 분야의 치과 전문의가 협진하여 환자<br />개개인에 맞는 최적의 치료 계획을 설계합니다.</div></Reveal>
      <div className={styles.serviceCards} aria-label="진료 과목" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {services.map((s,i) => <button key={s.badge} className={styles.serviceCard} data-open={active === i} onMouseEnter={() => setActive(i)} onFocus={() => { setPaused(true); setActive(i); }} onBlur={() => setPaused(false)} onClick={() => setActive(i)} aria-expanded={active === i}>
          <img src={asset(s.image)} alt="" loading="lazy" /><span className={styles.serviceGradient} /><span className={styles.serviceContent}><span className={styles.badge}>{s.badge}</span><span className={styles.serviceTitle}>{s.title}</span><span className={styles.serviceDesc}>{s.desc}<br />{s.more}</span></span>
        </button>)}
      </div>
    </div>
  </section>;
}

function Strengths() {
  return <section className={styles.strengths}><Reveal className={`lea-container ${styles.strengthsRow}`}>
    <div className={styles.strengthsCopy}><p className={styles.eyebrow}>OUR STRENGTHS</p><h2>오래 유지되는<br />치아를 위한 맞춤 진료</h2><p className={styles.strengthsDesc}>한 번의 치료로 끝나는 것이 아니라, 오랫동안 건강하게 유지될 수 있는<br className={styles.desktopBreak} /> 치아를 목표로 합니다. 밝은미래치과는 정밀 진단과 체계적인 치료 계획을<br className={styles.desktopBreak} /> 통해 재치료 없는 튼튼한 결과를 약속드리며, 치료 후에도 꾸준한 관리와<br className={styles.desktopBreak} /> 정기 검진으로 환자분의 구강 건강을 끝까지 책임집니다.</p><ActionLink href={`${origin}/clinic`}>병원소개 보러가기</ActionLink></div>
    <div className={styles.strengthsImage}><img src={asset("ef75fa8e-20ac-4da8-ad01-c92263e6083b.webp")} alt="환자와 상담하는 치과 의료진" loading="lazy" /></div>
  </Reveal></section>;
}

const steps = [
  ["당일 내원, 당일 치료로 신속 치료", "정밀 검진을 통해 치아와 잇몸 상태를 꼼꼼히 확인하고, 검사 결과를 바탕으로 필요한 치료 방향을 안내합니다.", "cc154c4a-e4e8-49d7-811f-5dc319029590.webp"],
  ["결과를 함께 보며 설명드리는 1:1 상담", "촬영한 검진 자료를 화면으로 함께 확인하며 치료 범위와 기간, 비용까지 이해하기 쉽게 설명드립니다.", "d1c7d24f-1d3e-4bd6-a602-e4ff92fbb793.webp"],
  ["한 사람에게 맞춘 정밀한 치료 진행", "상담에서 정한 계획대로 치료를 진행하며, 단계마다 상태를 확인해 꼭 필요한 과정만 거치도록 합니다.", "abf71fde-862b-44b5-8d7e-d95ddcd72cad.webp"],
  ["치료 후에도 이어지는 사후 관리", "치료가 끝난 뒤에도 정기 점검과 관리 안내를 통해 오래 건강한 상태를 유지할 수 있도록 돕습니다.", "fb5e4c76-ca00-4a2a-8ce4-009eeb5ca982.webp"],
];
const prices = [
  { title:"치아교정", desc:["서울대, 연세대 전문의","추가비용이 없는 투명한 가격"], items:[["세라믹 교정","290만원"],["월분납 교정","14만원 (24개월 기준)"],["인비절 라인","500만원"]] },
  { title:"임플란트", desc:["자연치아 보존원칙","고난이도 케이스 치료"], items:[["일반임플란트","59만원"],["뼈이식임플란트","30만원"],["전체임플란트","650만원 (3회 기준)"]] },
  { title:"앞니 심미치료", desc:["아이돌, 배우 앞니치료 주치의","최소한의 치아삭제 원칙"], items:[["화이트니","38만원"],["전문가미백","25만원 (3회 기준)"],["전문가미백","25만원 (3회 기준)"]] },
];

function SignatureSystem() {
  const [active,setActive] = useState(0);
  const [paused,setPaused] = useState(false);
  const start = useRef<number | null>(null);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive(i => (i + 1) % steps.length),3500);
    return () => clearInterval(timer);
  },[paused]);
  const move = (d:number) => setActive(i => (i+d+steps.length)%steps.length);
  return <section className={styles.signature}>
    <Reveal className={`${styles.sectionHeading} ${styles.signatureHeading}`}><p>SIGNATURE SYSTEM</p><h2>밝은미래치과만의 특화된<br />원데이 임플란트 진료 시스템</h2></Reveal>
    <Reveal className={styles.wideContainer}>
      <div className={styles.step} aria-label="진료 단계 안내" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onPointerDown={e => { start.current=e.clientX; }} onPointerUp={e => { if (start.current !== null && Math.abs(e.clientX-start.current)>40) move(e.clientX<start.current ? 1 : -1); start.current=null; }}>
        <div className={styles.stepPanel}><div className={styles.stepTexts}>{steps.map(([title,desc],i)=><div key={title} className={styles.stepText} data-active={active===i} aria-hidden={active!==i}><p className={styles.stepNumber}>0{i+1}</p><h3>{title}</h3><p className={styles.stepDescription}>{desc}</p></div>)}</div>
          <div className={styles.stepNav}><button onClick={()=>move(-1)} aria-label="이전 단계"><Icon name="prev" /></button><button onClick={()=>move(1)} aria-label="다음 단계"><Icon name="next" /></button></div>
          <div className={styles.stepDots}>{steps.map((_,i)=><button key={i} aria-label={`${i+1}단계 보기`} aria-pressed={active===i} onClick={()=>setActive(i)} />)}</div>
        </div>
        <div className={styles.stepVisual}>{steps.map(([, ,image],i)=><div className={styles.stepImage} data-active={active===i} key={image}><img src={asset(image)} alt={`${i+1}단계 진료 이미지`} loading="lazy" /><span /></div>)}</div>
      </div>
    </Reveal>
    <Reveal className={`${styles.wideContainer} ${styles.prices}`}><div className={styles.priceCards} aria-label="비용 안내" tabIndex={0}>{prices.map((p,i)=><article className={styles.priceCard} key={p.title}><div className={styles.priceTop}><h3>{i===1 && <span>EVENT</span>}{p.title}</h3><p>{p.desc[0]}<br />{p.desc[1]}</p></div><ul>{p.items.map(([label,price],j)=><li key={j}><span><small>✓</small>{label}</span><strong>{price}</strong></li>)}</ul></article>)}</div></Reveal>
  </section>;
}

function VisitUs() {
  return <section className={styles.visit} id="visit"><div className="lea-container">
    <Reveal className={styles.sectionHeading}><p>VISIT US</p><h2>오시는 길 &amp; 진료 시간</h2></Reveal>
    <Reveal><div className={styles.map} role="img" aria-label="서울 강남구 테헤란로 501 주변 약도" /></Reveal>
    <Reveal className={styles.visitCards}>
      <div className={styles.visitCard}><h3>교통 안내</h3><dl><div><dt>지하철</dt><dd>2호선 강남역 3번 출구 도보 5분</dd></div><div><dt>버스</dt><dd>강남역 하차 · 146, 341, 360번</dd></div><div><dt>주차</dt><dd>건물 지하 2층 주차장 (1시간 무료)</dd></div></dl></div>
      <div className={styles.visitCard}><h3>진료 시간</h3><dl><div><dt>월·화·목·금</dt><dd>09:00 ~ 18:00</dd></div><div><dt>수·토</dt><dd>09:00 ~ 20:00</dd></div><div className={styles.holiday}><dt>일 / 공휴일</dt><dd>휴진</dd></div></dl></div>
    </Reveal>
  </div></section>;
}

function QuickMenu() {
  return <aside className={styles.quickMenu} aria-label="바로가기 메뉴">{[["calendar","예약하기",`${origin}/booking`,""],["book","공식블로그","/",""],["phone","전화상담","tel:023454562","02-345-4562"]].map(([icon,label,href,sub])=><a key={label} href={href}><Icon name={icon} /><span><b>{label}</b>{sub&&<small>{sub}</small>}</span></a>)}</aside>;
}

function Footer() {
  const groups=[{title:"진료 안내",path:"/clinic",items:["임플란트","교정치료","심미치료","보존치료","예방치료"]},{title:"병원 소개",path:"/about",items:["인사말","의료진 소개","첨단 장비","클리닉 갤러리","언론 보도"]},{title:"고객 센터",path:"/event",items:["온라인 예약","자주 묻는 질문","진료 전 안내","개인정보처리방침","이용약관"]}];
  return <><div className={styles.footerSpacer} /><footer className={styles.footer}><div className={styles.footerInner}><div className={styles.footerInfo}><Link href="/" className={styles.footerBrand}><img src={asset("938b9c41-e655-4fe7-9965-979fd5eee2ad.webp")} alt="" width="20" height="20" />밝은미래치과</Link><ul className={styles.contacts}><li><Icon name="pin" /><span>서울특별시 강남구 테헤란로 123, OO빌딩 6층</span></li><li><Icon name="phone" /><span>02-1234-5678</span></li><li><Icon name="mail" /><span>info@brightfuture-dental.kr</span></li></ul><div className={styles.socials}>{["instagram","youtube","facebook"].map((name,i)=><a key={name} href="https://remaintemp2.imweb.me/" aria-label={["인스타그램","유튜브","페이스북"][i]}><Icon name={name} /></a>)}</div></div><div className={styles.footerLinks}>{groups.map(group=><div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item=><li key={item}><a href={origin+group.path}>{item}</a></li>)}</ul></div>)}</div></div><p className={styles.aiNotice}>현 사이트에서 사용된 이미지는 생성형 AI를 활용하여 제작되었습니다</p></footer>
    
  </>;
}

export function DentalHomepage() {
  return <><Header /><main><Hero /><Services /><Strengths /><SignatureSystem /><LowerSections /><VisitUs /></main><Footer /><QuickMenu /></>;
}
