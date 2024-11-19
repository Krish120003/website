import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>krish&apos;s website</title>
        <meta name="description" content="krish's personal website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.krish.gg" />
        <meta property="og:title" content="krish's personal website" />

        <meta property="og:description" content="krish's personal website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.krish.gg" />
        <meta property="twitter:url" content="https://www.krish.gg" />
        <meta name="twitter:title" content="krish's personal website" />
        <meta name="twitter:description" content="krish's personal website" />

        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width" />

        {/* meta images */}
        <meta property="og:image" content="https://www.krish.gg/og.jpg" />
        <meta name="twitter:image" content="https://www.krish.gg/og.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-neutral-100 dark:bg-neutral-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
