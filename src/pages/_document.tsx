import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="overflow-hidden">
      <Head />
      <body className="[*>]:font-sans overflow-auto bg-neutral-50 dark:bg-[#101010]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
