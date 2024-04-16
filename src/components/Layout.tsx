import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[] | string;
  blog?: boolean;
}

const ScrollIndicator = () => {
  const handleScroll = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scroll / height) * 100;
    document.documentElement.style.setProperty("--scroll", `${scrolled}%`);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed right-0 w-1 h-full origin-top transform-gpu bg-gradient-to-b from-neutral-800 to-neutral-950 md:left-0 dark:from-orange-50 dark:to-orange-200"
      style={{
        transform: "scaleY(var(--scroll))",
        transition: "transform 0.01s",
      }}
    ></div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, blog }) => {
  const router = useRouter();
  // get the parent route, so we can use it to go back
  const parentRoute =
    router.asPath.split("/").slice(0, -1).join("/").trim() || "/";

  return (
    <>
      <ScrollIndicator />
      <div className="font-serif h-fit dark:text-white">
        <main className="max-w-2xl min-h-full px-12 pt-12 m-auto">
          {blog ? (
            <Link
              href={parentRoute}
              className="flex items-center mb-8 gap-1 opacity-60 transition-all hover:gap-2 hover:opacity-90"
            >
              <IoMdArrowBack />
              Back
            </Link>
          ) : null}
          {children}
          <footer className="flex flex-col justify-between py-8 mt-8 border-t border-black opacity-20 transition-opacity hover:opacity-50 md:flex-row dark:border-white">
            <div>&copy; {new Date().getFullYear()} Krish Krish</div>
            <Link href="mailto:hello@krishkrish.com">hello@krishkrish.com</Link>
          </footer>
        </main>
      </div>
    </>
  );
};
