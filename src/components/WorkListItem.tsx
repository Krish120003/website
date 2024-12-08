import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
interface WorkListItemProps {
  logoSrc: string;
  company: string;
  companyWebsite?: string;
  position: string;
  startYear: number;
  endYear: number;
  themeColor?: [number, number, number];
  themeColorHex?: string;
}

const WorkListItem: React.FC<WorkListItemProps> = ({
  company,
  position,
  startYear,
  endYear,
  logoSrc,
  companyWebsite,
  themeColor,
  themeColorHex,
}) => {
  const brightness = themeColor
    ? themeColor.reduce((a, b) => a + b, 0) / 3
    : -1;

  console.log(brightness);

  const colorAsHex: string = themeColor
    ? `#${themeColor[0].toString(16).padStart(2, "0")}${themeColor[1]
        .toString(16)
        .padStart(2, "0")}${themeColor[2]
        .toString(16)
        .padStart(2, "0")}`.toUpperCase()
    : "";

  console.log(company);

  return (
    <div
      className={clsx("flex justify-between overflow-hidden rounded-md p-2", {
        [`hover:bg-white hover:text-black`]: company === "McMaster University",
        [`hover:bg-[#CCFF00] hover:text-black`]: company === "Robinhood",
        [`hover:bg-[#01549A] hover:text-white`]: company === "Bell Canada",
      })}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-md">
          <Image
            src={logoSrc}
            fill
            alt={`${company} logo`}
            className="pointer-events-none"
          ></Image>
        </div>
        <div style={{}}>
          <h3 className="text-current">{company}</h3>
          <p className="text-sm opacity-50">{position}</p>
        </div>
      </div>
      <div style={{}}>
        {startYear}
        {startYear !== endYear ? `-${endYear}` : ""}
      </div>
    </div>
  );
};

export default WorkListItem;
