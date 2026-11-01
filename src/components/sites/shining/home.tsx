/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, Plus, X } from "lucide-react";
import styles from "./home.module.css";

const asset = (path: string) => `/sites/shining/sh_img/${path}`;
const navigation = [
  { title: "프릭라이프 소개", href: "#intro" },
  { title: "상품 안내", href: "#products" },
  { title: "서비스 안내", href: "#services" },
  { title: "공지·FAQ", href: "#updates" },
  { title: "문의 안내", href: "#contact" },
];
const products = [
  { title: "대표상품", text: "프릭라이프를\n대표하는 상품입니다" },
  { title: "인터넷보험", text: "온라인으로\n상품 정보를 살펴보세요" },
  { title: "상품비교", text: "내게 맞는 상품을\n찾아보세요" },
  { title: "고객상담", text: "궁금한 내용을\n함께 확인해보세요" },
];
const quickLinks = [
  { title: "상품 안내", href: "#products" },
  { title: "서비스 소개", href: "#services" },
  { title: "자주 묻는 질문", href: "#faq" },
  { title: "문의 안내", href: "#contact" },
];
const notices = [
  { tag: "뉴스", title: "프릭라이프 서비스 안내", date: "2022.12.06", description: "프릭라이프의 상품 구성과 서비스는 이 페이지의 상품 안내 및 서비스 안내에서 확인하실 수 있습니다." },
  { tag: "공지", title: "홈페이지를 오픈하였습니다.", date: "2022.12.06", description: "프릭라이프에 오신 것을 환영합니다. 상단 메뉴를 통해 소개, 상품, 서비스와 문의 안내를 한 페이지에서 살펴보세요." },
];
const questions = [
  { title: "어떤 상품을 확인할 수 있나요?", description: "상품 안내에서 대표상품, 인터넷보험, 상품비교 및 고객상담에 관한 소개를 확인할 수 있습니다." },
  { title: "상담은 어떻게 요청하나요?", description: "페이지 하단 문의 안내의 이메일 주소를 복사해 궁금한 내용을 보내주세요. 상품명과 문의 내용을 함께 적어주시면 안내에 도움이 됩니다." },
];

export function ShiningHome() {
  const [slide, setSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % 3), 4500);
    return () => window.clearInterval(timer);
  }, [slide]);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 30);
      setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add(styles.visible); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    root.current?.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileOpen]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("freakmakers@gmail.com");
      setCopyStatus("이메일 주소를 복사했습니다.");
    } catch {
      setCopyStatus("이메일 주소를 선택해 직접 복사해주세요: freakmakers@gmail.com");
    }
  }
  return (
    <div className={styles.site} ref={root}>
      <a className={styles.skip} href="#main">본문 바로가기</a>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${mobileOpen ? styles.menuOpen : ""}`}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
        <div className={styles.headerInner}>
          <a href="#intro" className={styles.logo} onClick={() => setMobileOpen(false)}><img src="/sites/shining/freak-logo.svg" alt="프릭라이프" width="180" height="38" /></a>
          <nav aria-label="주 메뉴" id="site-navigation" className={styles.navigation}>
            {navigation.map((item) => <div className={styles.navGroup} key={item.href}>
              <a href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</a>
            </div>)}
          </nav>
          <button className={styles.menuButton} onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"} aria-controls="site-navigation" aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
      <main id="main">
        <section className={styles.heroWrap} id="intro" aria-label="프릭라이프 소개">
          <div className={styles.hero}>
            {[1, 2, 3].map((number, index) => <div key={number} className={`${styles.heroImage} ${slide === index ? styles.activeSlide : ""}`} style={{ backgroundImage: `url(${asset(`index/main_banner/img0${number}.jpg`)})` }} aria-hidden="true" />)}
            <div className={styles.heroContent}>
              <h1><strong>프릭라이프가 여러분의</strong><br />든든한 길잡이가 되어드리겠습니다</h1>
              <div className={styles.pagination} aria-label="메인 이미지 선택">{[0, 1, 2].map((index) => <button key={index} className={slide === index ? styles.selected : ""} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-pressed={slide === index}>{`0${index + 1}`}</button>)}</div>
              <p className={styles.heroDescription}>마음으로 정성을 다하는 믿을 수 있는 프릭라이프<br />프릭라이프만의 고품격 서비스로 아름다운 동행이 되어드리겠습니다.</p>
            </div>
            <a className={styles.more} href="#products">상품 살펴보기</a>
          </div>
        </section>
        <section className={styles.products} id="products" aria-label="보험 상품 안내">
          <div className={styles.introduction}>
            <div className={styles.introCopy} data-reveal><h2>만나보세요!<br />프릭라이프와 함께<br /><span>원더풀 라이프</span></h2><p>진심을 품은 프릭라이프<br />내가 직접 설계하는 든든한 보험</p></div>
            <a className={styles.claim} href="#contact" data-reveal><span>궁금한 보장을</span><h3>빠르고 편리한 상담</h3><small>문의 안내 보기</small><img src={asset("include/inc01/bg_icon.png")} alt="" /></a>
          </div>
          <div className={styles.productGrid}>{products.map((product, index) => <article className={styles.product} data-reveal key={product.title}><img src={asset(`include/inc01/icon0${index + 1}.png`)} alt="" /><div><span>{product.title}</span><h3>{product.text}</h3></div><a href="#contact" aria-label={`${product.title} 문의 안내`}>문의 안내</a></article>)}</div>
        </section>
        <section className={styles.services} id="services" aria-label="고객 서비스">
          <div className={styles.inner}>
            <div className={styles.quick} data-reveal><h2><span>프릭라이프</span>빠른 안내 서비스</h2><div className={styles.quickLinks}>{quickLinks.map((item, index) => <a key={item.href} href={item.href}><img src={asset(`include/inc02/icon0${index + 1}.png`)} alt="" /><p>{item.title}</p></a>)}</div></div>
            <div className={styles.banner} data-reveal><h2>고객과 함께하는 라이프파트너 프릭라이프</h2><dl>{[["Since", "2007"], ["고객만족도", "1위"], ["등급평가", "AAA"]].map(([title, value]) => <div key={title}><dt>{title}</dt><dd>{value}</dd></div>)}</dl><img src={asset("include/inc02/bg_img.png")} alt="" /></div>
            <div className={styles.boards} id="updates" data-reveal>
              <div><h2>공지사항</h2><ul>{notices.map((notice) => <li key={notice.title}><details className={styles.boardEntry}><summary><span className={styles.tag}>{notice.tag}</span><span className={styles.subject}>{notice.title}</span><time>{notice.date}</time><Plus size={16} aria-hidden="true" /></summary><p>{notice.description}</p></details></li>)}</ul></div>
              <div id="faq"><h2>자주 묻는 질문</h2><ul>{questions.map((question) => <li key={question.title}><details className={styles.boardEntry}><summary><span className={styles.subject}>{question.title}</span><Plus size={16} aria-hidden="true" /></summary><p>{question.description}</p></details></li>)}</ul></div>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer} id="contact"><div className={styles.inner}><div className={styles.company}><div className={styles.phone}>이메일 문의 <span className={styles.email}>freakmakers@gmail.com</span><button className={styles.copyButton} type="button" onClick={copyEmail}>이메일 복사</button></div><p role="status" className={styles.copyStatus}>{copyStatus}</p><p>프릭라이프 · FREAK LIFE<br />고객의 일상에 든든한 가치를 더하는 라이프 파트너 · Freak Makers</p></div><div className={styles.copyright}><p>ⓒ FREAK LIFE. All rights reserved.</p><nav aria-label="하단 메뉴">{navigation.map((item) => <a key={item.href} href={item.href}>{item.title}</a>)}</nav></div></div></footer>
      {scrolled && <button className={styles.toTop} aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></button>}
    </div>
  );
}
