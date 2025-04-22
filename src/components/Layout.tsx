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
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scroll / height) * 100;
    const inverseScrolled = 100 - scrolled;
    document.documentElement.style.setProperty("--scroll", `${scrolled}`);
    document.documentElement.style.setProperty(
      "--scroll-indicator",
      `${inverseScrolled}%`,
    );
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed  h-full w-1 origin-top transform-gpu bg-gradient-to-b from-neutral-800 to-neutral-950  dark:from-orange-50 dark:to-sky-400"
      style={{
        clipPath: "inset(0 0 var(--scroll-indicator) 0)",
      }}
    ></div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, blog, back }) => {
  const router = useRouter();
  // get the parent route, so we can use it to go back
  const parentRoute =
    router.asPath.split("/").slice(0, -1).join("/").trim() || "/";

  return (
    <>
      <ScrollIndicator />
      <div className="h-fit font-serif dark:text-white">
        <main
          className={cn(
            "m-auto flex min-h-full max-w-screen-2xl flex-col px-8",
          )}
        >
          {back ? (
            <div className="py-8">
              <Link
                href={parentRoute}
                className="mb-2 flex items-center gap-1 opacity-60 transition-all hover:gap-2 hover:opacity-90 lg:fixed lg:mb-8"
              >
                <IoMdArrowBack />
                {blog ? "All Posts" : "Home"}
              </Link>
            </div>
          ) : null}
          {children}
          <footer className="mt-8 flex flex-col justify-between border-t border-black py-8 opacity-20 transition-opacity hover:opacity-50 md:flex-row dark:border-white">
            <div>&copy; {new Date().getFullYear()} Krish Krish</div>
          </footer>
        </main>
      </div>
    </>
  );
};
