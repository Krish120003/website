import { type AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";

const LogRocket = dynamic(() => import("~/components/Logrocket"), {
  ssr: false,
});

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <LogRocket />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
