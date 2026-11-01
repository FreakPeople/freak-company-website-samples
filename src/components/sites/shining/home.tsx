/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import styles from "./home.module.css";

const origin = "https://co1108.shiningcorp.com";
const asset = (path: string) => `/sites/shining/sh_img/${path}`;
const destination = (path: string) => `${origin}${path}`;
const groups = [
  { title: "회사소개", links: [["회사소개", "/sh_page/page6.php"], ["회사연혁", "/sh_page/page7.php"], ["조직도", "/sh_page/page8.php"], ["오시는 길", "/bbs/board.php?bo_table=table21"]] },
  { title: "사업안내", links: [["홈페이지제작", "/sh_page/page10.php"], ["모바일웹", "/sh_page/page11.php"]] },
  { title: "서비스 분야", links: [["갤러리 A타입", "/bbs/board.php?bo_table=table13"], ["갤러리 B타입", "/bbs/board.php?bo_table=table35"], ["갤러리 C타입", "/bbs/board.php?bo_table=table36"], ["갤러리 D타입", "/bbs/board.php?bo_table=table41"]] },
  { title: "마케팅 최적화", links: [["마케팅 최적화", "/sh_page/page15.php"]] },
  { title: "고객센터", links: [["공지사항", "/bbs/board.php?bo_table=table42"], ["문의사항", "/bbs/board.php?bo_table=table43"], ["사내소식", "/bbs/board.php?bo_table=table44"]] },
];
const products = [
  { title: "대표상품", text: "샤이닝라이프를\n대표하는 상품입니다" },
  { title: "인터넷보험", text: "인터넷으로\n직접 가입하세요!" },
  { title: "상품비교", text: "내게맞는 상품을\n찾아보세요" },
  { title: "소비자포털", text: "개인정보 관리 및\n1:1 모니터링" },
];

export function ShiningHome() {
  const [slide, setSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
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
  return (
    <div className={styles.site} ref={root}>
      <a className={styles.skip} href="#main">본문 바로가기</a>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${mobileOpen ? styles.menuOpen : ""}`}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}><img src={asset("hd/top_menu/logo.png")} alt="샤이닝라이프" width="161" height="34" /></Link>
          <nav aria-label="주 메뉴" className={styles.navigation}>
            {groups.map((group) => <div className={styles.navGroup} key={group.title}>
              <a href={destination(group.links[0][1])}>{group.title}</a>
              <div className={styles.submenu}>{group.links.map(([title, path]) => <a key={title} href={destination(path)}>{title}</a>)}</div>
            </div>)}
          </nav>
          <div className={styles.account}><a href={destination("/bbs/login.php")}>로그인</a><a href={destination("/bbs/register.php")}>회원가입</a></div>
          <button className={styles.menuButton} onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
      <main id="main">
        <section className={styles.heroWrap} aria-label="샤이닝라이프 소개">
          <div className={styles.hero}>
            {[1, 2, 3].map((number, index) => <div key={number} className={`${styles.heroImage} ${slide === index ? styles.activeSlide : ""}`} style={{ backgroundImage: `url(${asset(`index/main_banner/img0${number}.jpg`)})` }} aria-hidden="true" />)}
            <div className={styles.heroContent}>
              <h1><strong>샤이닝라이프가 여러분의</strong><br />든든한 길잡이가 되어드리겠습니다</h1>
              <div className={styles.pagination} aria-label="메인 이미지 선택">{[0, 1, 2].map((index) => <button key={index} className={slide === index ? styles.selected : ""} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-pressed={slide === index}>{`0${index + 1}`}</button>)}</div>
              <p className={styles.heroDescription}>마음으로 정성을 다하는 믿을 수 있는 샤이닝라이프<br />샤이닝라이프만의 고품격 서비스로 아름다운 동행이 되어드리겠습니다.</p>
            </div>
            <a className={styles.more} href={destination("/bbs/board.php?bo_table=table15")}>자세히보기</a>
          </div>
        </section>
        <section className={styles.products} aria-label="보험 상품 안내">
          <div className={styles.introduction}>
            <div className={styles.introCopy} data-reveal><h2>만나보세요!<br />신한라이프와 함께<br /><span>원더풀 라이프</span></h2><p>진심을 품은 샤이닝라이프<br />내가 직접 설계하는 든든한 보험</p></div>
            <a className={styles.claim} href={destination("/sh_page/page6.php")} data-reveal><span>쉽고 간편한</span><h3>실손보험 빠른청구</h3><small>바로가기</small><img src={asset("include/inc01/bg_icon.png")} alt="" /></a>
          </div>
          <div className={styles.productGrid}>{products.map((product, index) => <a className={styles.product} data-reveal key={product.title} href={destination("/sh_page/page6.php")}><img src={asset(`include/inc01/icon0${index + 1}.png`)} alt="" /><div><span>{product.title}</span><h3>{product.text}</h3></div><small>자세히보기</small></a>)}</div>
        </section>
        <section className={styles.services} aria-label="고객 서비스">
          <div className={styles.inner}>
            <div className={styles.quick} data-reveal><h2><span>샤이닝라이프</span>빠른 조회 서비스</h2><div className={styles.quickLinks}>{["사이버창구", "계약조회", "지점안내", "전자민원접수"].map((title, index) => <a key={title} href={destination("/sh_page/page6.php")}><img src={asset(`include/inc02/icon0${index + 1}.png`)} alt="" /><p>{title}</p></a>)}</div></div>
            <div className={styles.banner} data-reveal><h2>고객과 함께하는 라이프파트너 샤이닝라이프</h2><dl>{[["Since", "2007"], ["고객만족도", "1위"], ["등급평가", "AAA"]].map(([title, value]) => <div key={title}><dt>{title}</dt><dd>{value}</dd></div>)}</dl><img src={asset("include/inc02/bg_img.png")} alt="빠른조회서비스" /></div>
            <div className={styles.boards} data-reveal>
              <div><h2>공지사항<a href={destination("/bbs/board.php?bo_table=table42")} aria-label="공지사항 더보기"><Plus size={16} /></a></h2><ul>{[["뉴스", "하반기 결산 안내", "3"], ["공지", "홈페이지를 오픈하였습니다.", "2"]].map(([tag, title, id]) => <li key={id}><a href={destination(`/bbs/board.php?bo_table=table42&wr_id=${id}`)}><span className={styles.tag}>{tag}</span><span className={styles.subject}>{title}</span><time>2022.12.06</time></a></li>)}</ul></div>
              <div><h2>자주하는질문<a href={destination("/bbs/board.php?bo_table=table43")} aria-label="자주하는질문 더보기"><Plus size={16} /></a></h2><ul>{[["디자인 시안에서만 결정하는 경우 중복되는 사이..", "2"], ["무료 홈페이지 제작 어떻게 가능한가요?", "1"]].map(([title, id]) => <li key={id}><a href={destination(`/bbs/board.php?bo_table=table43&wr_id=${id}`)}><span className={styles.subject}>{title}</span><time>2022.12.05</time></a></li>)}</ul></div>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}><div className={styles.inner}><div className={styles.company}><div className={styles.phone}>대표전화 <a href="tel:15446062">1544-6062</a><span>평일 오전 9시-오후 6시</span></div><p>경기 부천시 원미구 신흥로 223 신중동역 랜드마크 푸르지오 시티 101동 오피스 49층 상호 : 샤이닝 대표 : 오성민 사업자 번호 : 130-37-46318(등록2007년)<br />통신판매업종신고 : 제2010-경기부천-924호 대표번호 : 1544-6062 팩스 : 0505-200-6060 이메일 : hdweb@hdweb.co.kr</p></div><div className={styles.copyright}><p>ⓒ 샤이닝 - 기업 홈페이지 샘플</p><div><a href={destination("/sh_page/sh_stipulation.php")} target="_blank" rel="noreferrer">이용약관</a><a href={destination("/sh_page/sh_privacy.php")} target="_blank" rel="noreferrer">개인정보취급방침</a><a href={destination("/admin/admin.login.php")} target="_blank" rel="noreferrer">관리자로그인</a><a href="https://www.hdweb.co.kr/" target="_blank" rel="noreferrer">HDWEB</a></div></div></div></footer>
      {scrolled && <button className={styles.toTop} aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></button>}
    </div>
  );
}
