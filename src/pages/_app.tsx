import { type AppType } from "next/dist/shared/lib/utils";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "~/styles/globals.css";
import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { env } from "~/env";

const isProd = process.env.NODE_ENV === "production";

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (!isProd) {
      return;
    }
    LogRocket.init("mg25jh/personal-website");

    setupLogRocketReact(LogRocket);
  }, []);

  return (
    <>
      <SpeedInsights />
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  );
};

export default MyApp;
