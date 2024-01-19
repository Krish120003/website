import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

import React, { useEffect } from "react";
const isProd = process.env.NODE_ENV === "production";

const Logrocket = () => {
  useEffect(() => {
    if (!isProd) {
      return;
    }
    LogRocket.init("mg25jh/personal-website");

    setupLogRocketReact(LogRocket);
  }, []);
  return <></>;
};

export default Logrocket;
