import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[] | string;
  blog?: boolean;
}

const Background = () => {
  const imgSrc = "https://i.imgur.com/93PRbNf.png";

  return (
    <aside className="fixed -z-10 h-full max-h-full w-full overflow-hidden opacity-50 invert dark:bg-black dark:invert-0">
      <img src={imgSrc} className="bg-big" />

      <img
        src={imgSrc}
        className="animate-spin-20s bg-small absolute w-1/2 mix-blend-screen"
      />
      <img
        src={imgSrc}
        className="bg-small animate-spin-20s animation-delay--5000 absolute bottom-0 right-0 w-full mix-blend-screen"
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
      <div className="h-fit  dark:text-white">
        <Background key="background" />
        <main className="m-auto min-h-full max-w-3xl px-12 pt-12">
          {blog ? (
            <Link
              href={parentRoute}
              className="mb-8 flex items-center gap-1 text-neutral-500 transition-all hover:gap-2 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <IoMdArrowBack />
              Back
            </Link>
          ) : null}
          {children}
          <footer className="mt-8 flex flex-col justify-between border-t py-8 text-neutral-500 md:flex-row dark:border-neutral-500">
            <div>&copy; {new Date().getFullYear()} Krish Krish</div>
            <Link href="mailto:hello@krishkrish.com">hello@krishkrish.com</Link>
          </footer>
        </main>
      </div>
    </>
  );
};
