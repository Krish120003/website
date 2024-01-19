import { type AppType } from "next/dist/shared/lib/utils";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "~/styles/globals.css";
import { useEffect } from "react";

const isProd = process.env.NODE_ENV === "production";

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
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
