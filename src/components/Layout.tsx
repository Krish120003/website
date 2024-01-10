import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[] | string;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="dark:bg-neutral-900 dark:text-white">
      <main className="m-auto min-h-full max-w-3xl px-8 pt-12">
        {children}
        <footer className="mt-8 flex flex-col justify-between border-t py-8 md:flex-row">
          <div>&copy; {new Date().getFullYear()} Krish Krish</div>
          <Link href="mailto:hello@krishkrish.com">hello@krishkrish.com</Link>
        </footer>
      </main>
    </div>
  );
};
