import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
interface WorkListItemProps {
  logoSrc: string;
  company: string;
  companyWebsite?: string;
  position: string;
  startYear: number | string;
  endYear?: number;
}

const WorkListItem: React.FC<WorkListItemProps> = ({
  company,
  position,
  startYear,
  endYear,
  logoSrc,
  companyWebsite,
}) => {
  return (
    <div
      className={clsx(
        "flex justify-between overflow-hidden rounded-md p-2",
        {},
      )}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-lg [&_>img]:!shadow-none">
          <Image
            src={logoSrc}
            fill
            alt={`${company} logo`}
            className={clsx("pointer-events-none", {
              "dark:invert": company === "Vercel",
            })}
          ></Image>
        </div>
        <div style={{}}>
          <h3 className="text-current">{company}</h3>
          <p className="text-sm opacity-50">{position}</p>
        </div>
      </div>
      <div style={{}}>
        {startYear}
        {endYear && startYear !== endYear ? `-${endYear}` : ""}
      </div>
    </div>
  );
};

export default WorkListItem;
