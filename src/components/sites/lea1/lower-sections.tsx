"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./lower-sections.module.css";

const asset = (filename: string) => `/sites/lea1/${filename}`;

const cases = [
  { before: "2d8128fd-8c0f-4790-b697-f434c6ea699f.png", after: "5c12edcb-54b6-44bf-a772-7df4de868e01.png", first: "변색된 치아를 자연스럽고", second: "환하게 개선한 ", emphasis: "미백 사례", desc: "전문 미백 시술로 누렇게 변색된 치아를 밝고 깨끗하게 되돌린 케이스입니다.", tags: ["치아미백", "전문미백", "홈블리칭"] },
  { before: "213519c5-7c3d-4994-ae68-510d509ccaaa.png", after: "0e565995-fcfb-4e23-af81-937d3178d51e.png", first: "벌어진 치아들을 가지런하게", second: "교정한 ", emphasis: "라미네이트 사례", desc: "앞니 사이 틈을 자연스러운 형태와 색으로 채워 정돈한 케이스입니다.", tags: ["라미네이트", "심미보철"] },
  { before: "fef13afd-685b-48a1-a64d-50485650237a.png", after: "eccb7dbe-11db-459d-ad1b-343767763004.png", first: "삐뚤어진 치열을 바르게", second: "잡아준 ", emphasis: "투명교정 사례", desc: "장치가 눈에 띄지 않는 방식으로 치열을 단계적으로 정렬한 케이스입니다.", tags: ["투명교정", "치아교정"] },
  { before: "de48c4ce-50cc-4be0-b218-67e5d40bb6be.png", after: "555c82d0-8dfd-46d8-b6ed-1b9163823469.png", first: "상실된 어금니를 튼튼하게", second: "되살린 ", emphasis: "임플란트 사례", desc: "잇몸뼈 상태를 확인한 뒤 식립 위치를 계획해 저작 기능을 회복한 케이스입니다.", tags: ["임플란트", "어금니", "보철"] },
  { before: "79acd1e9-1510-494e-a7d9-c3186a71aecf.png", after: "f71eeeaf-f1ad-4940-8982-ff2a10944ab2.png", first: "변색된 치아를 자연스럽고", second: "환하게 개선한 ", emphasis: "미백 사례", desc: "전문 미백 시술로 누렇게 변색된 치아를 밝고 깨끗하게 되돌린 케이스입니다", tags: ["치아미백", "전문미백"] },
  { before: "c6a8a93e-31f5-4aa3-90e1-861af8626a99.png", after: "e2b6015d-729f-4d09-9b1c-eae1e36d0e9e.png", first: "틈이 벌어진 치아를 가지런하게", second: "교정한 ", emphasis: "라미네이트 사례", desc: "얇은 세라믹 라미네이트로 치아 형태와 색상을 동시에 개선한 케이스입니다", tags: ["라미네이트", "심미보철", "치아성형"] },
];

const doctors = [
  { name: "김도윤 원장", photo: "2f2c0ddd-dd28-4cb4-8522-eabccee1d373.png", credentials: ["서울대학교 치의학대학원 졸업", "대한치과의사협회 정회원", "대한구강악안면외과학회 정회원", "대한치과보존학회 종신회원", "대한임플란트학회 인정의"] },
  { name: "최수현 부원장", photo: "e9c8a992-e904-467b-989f-d274510cea5f.png", credentials: ["연세대학교 치의학대학원 졸업", "대한치과교정학회 인정의", "대한심미치과학회 정회원", "대한소아치과학회 종신회원", "대한치과보철학회 정회원"] },
];

const gallery = [
  "4777df53-b8c0-484c-baf1-bdd5cf40a442.webp",
  "3fbe6fda-352e-4b97-a3d4-25a166c8c366.webp",
  "ba5cb158-f8ef-4110-ae0f-f77685f9b931.webp",
  "349e60c1-9b71-4809-a40f-4e1d4282b3e4.webp",
];

const videos = [
  { image: "8f072cad-70e0-4b61-be23-d027aa921064.png", title: "임플란트에 대한 모든 것", desc: "서울대·연세대 출신 전문의가 직접 짚어주는 수술 핵심 과정부터 부작용 없이 오래 사용하는 임플란트 관리 노하우의 모든 것" },
  { image: "84d0b82d-7cb4-4c7a-b44a-a262ee54b5ea.png", title: "프릭미래치과 방문 후기", desc: "첫 방문 상담부터 수술, 회복까지의 전 과정을 환자의 시선으로 숨김없이 생생하게 전해드리는 리얼 진료 후기 인터뷰" },
  { image: "8b119c35-8cc4-48d2-a5e3-c08832b309f0.png", title: "통증 줄이는 치과 치료의 비밀", desc: "치과 방문이 무서운 분들을 위한 단계별 맞춤형 무통 마취와 통증과 두려움을 덜어주는 안심 케어 시스템을 공개합니다" },
];

function Reveal({ children, fade = false, className = "" }: { children: ReactNode; fade?: boolean; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.dataset.ready = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.visible = "true";
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={element} className={`${styles.reveal} ${fade ? styles.fade : ""} ${className}`}>{children}</div>;
}

function Heading({ eyebrow, children, description, left = false }: { eyebrow: string; children: ReactNode; description?: ReactNode; left?: boolean }) {
  return <div className={`${styles.heading} ${left ? styles.left : ""}`}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h2>{children}</h2>
    {description && <p className={styles.description}>{description}</p>}
  </div>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a className={`${styles.moreLink} ${light ? styles.lightLink : ""}`} href={href}>
    {children}<span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
  </a>;
}

function ClinicGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const element = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  useEffect(() => {
    if (!element.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % gallery.length), 3000);
    return () => window.clearInterval(timer);
  }, [paused, inView]);
  const change = (direction: number) => setActive(index => (index + direction + gallery.length) % gallery.length);
  return <div ref={element} className={styles.gallery} aria-label="병원 시설 갤러리" role="region" tabIndex={0}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1); } }}>
    <div className={styles.galleryMain} onTouchStart={event => { startX.current = event.touches[0].clientX; }} onTouchEnd={event => {
      if (startX.current !== null) { const distance = event.changedTouches[0].clientX - startX.current; if (Math.abs(distance) > 35) change(distance > 0 ? -1 : 1); }
      startX.current = null;
    }}>
      {gallery.map((photo, index) => <figure key={photo} className={styles.galleryPhoto} data-active={active === index} aria-hidden={active !== index}>
        <img src={asset(photo)} alt={`프릭미래치과 시설 ${index + 1}`} loading="lazy" />
      </figure>)}
      <button type="button" className={`${styles.galleryArrow} ${styles.previous}`} aria-label="이전 사진" onClick={() => change(-1)}><svg viewBox="0 0 16 28" aria-hidden="true"><path d="M13 2L3 14l10 12" /></svg></button>
      <button type="button" className={`${styles.galleryArrow} ${styles.next}`} aria-label="다음 사진" onClick={() => change(1)}><svg viewBox="0 0 16 28" aria-hidden="true"><path d="M3 2l10 12L3 26" /></svg></button>
    </div>
    <div className={styles.galleryThumbs}>
      {gallery.map((photo, index) => <button type="button" key={photo} className={styles.galleryThumb} aria-label={`시설 사진 ${index + 1} 보기`} aria-pressed={active === index} onClick={() => setActive(index)}>
        <img src={asset(photo)} alt="" loading="lazy" /><span />
      </button>)}
    </div>
  </div>;
}

export function LowerSections() {
  return <>
    <section className={styles.results} id="results" aria-label="치료 전후 사례">
      <div className="lea-container">
        <Reveal><Heading eyebrow="CLINICAL RESULTS" description={<>프릭미래치과는 모든 분야의 치과 전문의가 협진하여<br />환자 개개인에 맞는 최적의 치료 계획을 설계합니다.</>}>
          수많은 환자들의<br /><span>생생한 시술 결과입니다</span>
        </Heading></Reveal>
        <Reveal fade><div className={styles.resultsGrid}>{cases.map(item => <article className={styles.resultCard} key={item.before}>
          <div className={styles.comparison}>
            <div className={styles.beforePhoto}><img src={asset(item.before)} alt="치료 전 사진" loading="lazy" /><span className={styles.beforeLabel}>치료전</span></div>
            <div className={styles.afterPhoto}><img src={asset(item.after)} alt="치료 후 사진" loading="lazy" /><span className={styles.afterLabel}>치료후</span></div>
          </div>
          <div className={styles.resultBody}>
            <div><h3>{item.first}<br />{item.second}<span>{item.emphasis}</span>입니다.</h3><p>{item.desc}</p></div>
            <ul className={styles.tags}>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </div>
        </article>)}</div></Reveal>
        <p className={styles.resultNotice}><span>※ 본 사진은 환자분의 동의를 받아 게재되었으며, 개인별 시술 결과는 다를 수 있습니다.<br /></span><strong>&nbsp;정확한 진단과 치료 계획은 내원 후 상담을 통해 안내드립니다.</strong></p>
      </div>
    </section>
    <section className={styles.team} id="team" aria-label="의료진 소개">
      <div className="lea-container">
        <Reveal><div className={styles.teamHeading}>
          <Heading eyebrow="MEDICAL TEAM" left description="각 분야별 전문의가 체계적인 진단과 치료 계획을 통해 최상의 결과를 약속합니다.">다양한 경험과 전문성을<br />갖춘 우수한 의료진</Heading>
          <ArrowLink href="#clinic-gallery">병원 시설 둘러보기</ArrowLink>
        </div></Reveal>
        <Reveal><div className={styles.doctors}>{doctors.map(doctor => <article className={styles.doctorCard} key={doctor.name}>
          <div className={styles.doctorPhoto}><img src={asset(doctor.photo)} alt={doctor.name} loading="lazy" /></div>
          <div className={styles.doctorInfo}>
            <div className={styles.doctorBio}><div><h3>{doctor.name}</h3><p className={styles.doctorRole}>치과 전문의</p></div><ul>{doctor.credentials.map(line => <li key={line}>{line}</li>)}</ul></div>
            <p className={styles.doctorTag}>충치부터 임플란트까지<br />정밀하고 섬세한 치과 진료</p>
          </div>
        </article>)}</div></Reveal>
      </div>
    </section>
    <section className={styles.clinic} id="clinic-gallery" aria-label="병원 시설">
      <div className="lea-container">
        <Reveal><Heading eyebrow="OUR CLINIC" description="환자분의 편안함과 안전을 위해 최첨단 장비와 쾌적한 환경을 갖추고 있습니다.">환자를 위한 최적의 치료 환경</Heading></Reveal>
        <Reveal fade><ClinicGallery /></Reveal>
      </div>
    </section>
    <section className={styles.youtube} id="dental-guide" aria-label="치과 진료 가이드">
      <div className="lea-container">
        <Reveal><Heading eyebrow="DENTAL GUIDE">궁금했던 치과 치료,<br />진료 가이드로 확인하세요</Heading></Reveal>
        <Reveal><div className={styles.videoGrid}>{videos.map(video => <article className={styles.videoCard} key={video.title}>
          <div className={styles.videoCover}>
            <img src={asset(video.image)} alt="" loading="lazy" />
          </div>
          <div className={styles.videoText}><h3>{video.title}</h3><p>{video.desc}</p></div>
        </article>)}</div></Reveal>
      </div>
    </section>
  </>;
}
