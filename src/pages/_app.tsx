import { type AppType } from "next/dist/shared/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "~/styles/globals.css";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { env } from "~/env";
import Head from "next/head";

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    ui_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <SpeedInsights />
      <PostHogProvider client={posthog}>
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
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  );
};

export default MyApp;
