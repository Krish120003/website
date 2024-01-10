import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[] | string;
  blog?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, blog }) => {
  const router = useRouter();
  // get the parent route, so we can use it to go back
  const parentRoute =
    router.asPath.split("/").slice(0, -1).join("/").trim() || "/";

  return (
    <div className="dark:bg-neutral-900 dark:text-white">
      <main className="m-auto min-h-full max-w-3xl px-12 pt-12">
        {blog ? (
          <Link
            href={parentRoute}
            className="flex items-center gap-1 pb-8 text-neutral-500 transition-all hover:gap-2 hover:text-neutral-700 dark:hover:text-neutral-300"
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
  );
};
