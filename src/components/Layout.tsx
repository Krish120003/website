import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { cn } from "~/lib/utils";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[] | string;
  back?: boolean;
  blog?: boolean;
}

const ScrollIndicator = () => {
  const handleScroll = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = height > 0 ? (window.scrollY / height) * 100 : 0;
    document.documentElement.style.setProperty("--scroll-indicator", `${100 - scrolled}%`);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div aria-hidden="true" className="scroll-indicator" style={{ clipPath: "inset(0 0 var(--scroll-indicator) 0)" }} />;
};

export const Layout: React.FC<LayoutProps> = ({ children, blog, back }) => {
  const router = useRouter();
  const parentRoute = router.asPath.split("/").slice(0, -1).join("/").trim() || "/";

  return (
    <>
      <ScrollIndicator />
      <div className="newspaper-shell">
        <header className="site-masthead">
          <div className="masthead-meta"><span>VOL. 01</span><span>{blog ? "THE TECHNICAL EDITION" : "EST. 2020"}</span><span>KRISH.GG</span></div>
          <Link href="/" className="masthead-name">The Krish Journal</Link>
          <div className="masthead-rule" />
        </header>
        <main className={cn("newspaper-main", { "article-context": blog })}>
          {back ? <Link href={parentRoute} className="back-link"><IoMdArrowBack aria-hidden="true" />{blog ? "All Posts" : "Home"}</Link> : null}
          {children}
          <footer className="site-footer">
            <span>© {new Date().getFullYear()} Krish Krish</span>
            <span>Printed on the internet · krish.gg</span>
          </footer>
        </main>
      </div>
    </>
  );
};
