import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="[*>]:font-sans bg-neutral-100 dark:bg-[#101010]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
