import { type AppType } from "next/dist/shared/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "~/styles/globals.css";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { env } from "~/env";
import Head from "next/head";
import { Person, ProfilePage, WebSite, WithContext } from "schema-dts";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "development") {
  // checks that we are client-side
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    ui_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

export const jsonLdWebSite: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Krish's Website",
  url: "https://krish.gg",
  author: {
    "@type": "Person",
    name: "Krish",
    url: "https://krish.gg",
  },
  publisher: {
    "@type": "Person",
    name: "Krish",
    url: "https://krish.gg",
  },
  keywords: [
    "krish",
    "krish krish",
    "software engineer",
    "full-stack developer",
    "high performance",
    "web applications",
    "typescript",
  ],
};

export const jsonLdPerson: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Krish",
  additionalName: "Krish Krish",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "McMaster University",
      url: "https://mcmaster.ca",
    },
  ],
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Robinhood",
    url: "https://robinhood.com",
  },
  description:
    "Krish is a software engineer focused on high performance full-stack web applications.",
  url: "https://krish.gg",
  sameAs: [
    "https://www.linkedin.com/in/krish-krish",
    "https://github.com/Krish120003",
  ],
  image: "https://krish.gg/profile.jpeg",
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <SpeedInsights />
      <PostHogProvider client={posthog}>
        <Head>
          <title>krish&apos;s website</title>

          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="viewport" content="width=device-width" />

          <link rel="icon" href="/favicon.ico" />

          <script
            type="application/ld+json"
            id="jsonLdWebSite"
            key="jsonLdWebSite"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
          />
          <script
            type="application/ld+json"
            id="jsonLdPerson"
            key="jsonLdPerson"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
          />
        </Head>
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  );
};

export default MyApp;
