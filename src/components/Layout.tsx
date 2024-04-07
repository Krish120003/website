import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[] | string;
  blog?: boolean;
}

const Background = () => {
  const imgSrc = "/k.png";

  return <></>;

  return (
    <aside className="fixed -z-10 h-full max-h-full w-full overflow-hidden opacity-50 invert dark:bg-black dark:invert-0">
      <img src={imgSrc} className="bg-big" />

      <img
        src={imgSrc}
        className="bg-small absolute w-1/2 animate-spin-20s mix-blend-screen"
      />
      <img
        src={imgSrc}
        className="bg-small absolute bottom-0 right-0 w-full animate-spin-20s mix-blend-screen animation-delay--5000"
      />
    </aside>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, blog }) => {
  const router = useRouter();
  // get the parent route, so we can use it to go back
  const parentRoute =
    router.asPath.split("/").slice(0, -1).join("/").trim() || "/";

  return (
    <>
      <div className="h-fit dark:text-white">
        <Background key="background" />
        <main className="m-auto min-h-full max-w-4xl px-12 pt-12">
          {blog ? (
            <Link
              href={parentRoute}
              className="mb-8 flex items-center gap-1 opacity-60 transition-all hover:gap-2 hover:opacity-90"
            >
              <IoMdArrowBack />
              Back
            </Link>
          ) : null}
          {children}
          <footer className="mt-8 flex flex-col justify-between border-t border-black py-8 opacity-35 transition-opacity hover:opacity-75 md:flex-row dark:border-white">
            <div>&copy; {new Date().getFullYear()} Krish Krish</div>
            <Link href="mailto:hello@krishkrish.com">hello@krishkrish.com</Link>
          </footer>
        </main>
      </div>
    </>
  );
};
