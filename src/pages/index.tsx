import Head from "next/head";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { MdArrowOutward, MdOutlineLibraryBooks } from "react-icons/md";
import { projects, technologies } from "../lib/data";
import { Layout } from "~/components/Layout";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { PopoverLink } from "~/components/PopoverLink";

interface ProjectItemProps {
  title: string;
  description: string;
  link: string;
  image?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  link,
  image,
}) => {
  return (
    <>
      <PopoverLink
        href={link}
        className="flex items-end pb-2 underline w-fit"
        image={image}
      >
        <h3>{title}</h3>
        <div className="pb-1">
          <MdArrowOutward />
        </div>
      </PopoverLink>
      <p>{description}</p>
    </>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>krish krish • home</title>
        <meta name="description" content="krish krish's personal website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krishkrish.com" />
        <meta property="og:title" content="krish krish • home" />

        <meta
          property="og:description"
          content="krish krish's personal website"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="krishkrish.com" />
        <meta property="twitter:url" content="https://krishkrish.com" />
        <meta name="twitter:title" content="krish krish • home" />
        <meta
          name="twitter:description"
          content="krish krish's personal website"
        />

        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width" />

        {/* meta images */}
        <meta property="og:image" content="https://krishkrish.com/og.jpg" />
        <meta name="twitter:image" content="https://krishkrish.com/og.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="pb-6 space-y-6">
          <h1 className="text-2xl font-bold font-serif-condensed md:pt-16 md:text-4xl">
            <div className="text-lg opacity-50">Hi there,</div> {"I'm"} Krish
          </h1>
          <p className="dark:text-neutral-200">
            cs undergrad weaving code into complex systems
          </p>
          <p className="dark:text-neutral-200">
            Incoming @{" "}
            <a
              href="https://www.linkedin.com/feed/update/urn:li:activity:7185751055345876992/"
              className="underline"
            >
              Bell
            </a>{" "}
            as an AI & Data Engineer Intern
          </p>
          {/* <p className="dark:text-neutral-200">
            Currently, I lead a team of developers at{" "}
            <PopoverLink
              href="https://deltahacks.com"
              className="inline-flex items-center font-semibold underline dark:text-white"
              image="/popovers/deltahacks.png"
            >
              DeltaHacks <MdArrowOutward />
            </PopoverLink>
            hosting a hackathon, and teach Python Programming at{" "}
            <span className="font-semibold dark:text-white">
              McMaster University
            </span>{" "}
            as a teaching assistant. I&apos;m looking for internship
            opportunities to learn and grow as a developer.
          </p>
          <p className="dark:text-neutral-200">
            Previously, I worked as a junior software developer at Synergy
            Machines, responsible for developing full stack dashboards for
            evironmental data analytics.
          </p> */}
        </section>
        <hr className="opacity-10" />
        <section className="py-6">
          <h2 className="pb-1 font-serif text-xl font-thin md:text-2xl dark:opacity-65">
            Links
          </h2>

          <ul className="font-mono">
            <li>
              <Link
                href="/blog"
                className="flex flex-col justify-between w-full py-1 transition-all  hover:text-red-600 md:flex-row md:items-center md:gap-2 md:py-0"
              >
                writings
                <span className="flex items-center font-sans text-sm opacity-50 gap-2">
                  <MdOutlineLibraryBooks />
                  Personal Blog
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/krish-krish/"
                className="flex flex-col justify-between w-full py-1 transition-all  hover:text-blue-700 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-blue-500"
              >
                linkedin.com/in/krish-krish
                <span className="flex items-center font-sans text-sm opacity-50 gap-2">
                  <SiLinkedin />
                  LinkedIn
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/Krish120003"
                className="flex flex-col justify-between w-full py-1 transition-all  hover:text-purple-600 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-purple-500"
              >
                github.com/Krish120003
                <span className="flex items-center font-sans text-sm opacity-50 gap-2">
                  <SiGithub />
                  Github
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/krish_resume.pdf"
                className="flex flex-col justify-between w-full py-1 transition-all hover:text-yellow-500 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-yellow-400"
              >
                resume.pdf
                <span className="flex items-center font-sans text-sm opacity-50 gap-2 ">
                  <FaFilePdf />
                  Resume
                </span>
              </Link>
            </li>
          </ul>

          {/* <ul className="underline space-y-1 dark:text-neutral-300">
            <li>
              <Link
                href="https://www.linkedin.com/in/krish-krish/"
                className="flex items-center py-1 w-fit gap-0 transition-all hover:gap-2 md:py-0"
              >
                <span className="flex items-center gap-1">
                  <SiLinkedin />
                  LinkedIn
                </span>
                <MdArrowOutward />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/Krish120003"
                className="flex items-center py-1 w-fit gap-0 transition-all hover:gap-2 md:py-0"
              >
                <span className="flex items-center gap-1">
                  <SiGithub />
                  GitHub
                </span>
                <MdArrowOutward />
              </Link>
            </li>
            <li>
              <Link
                href="/krish_resume.pdf"
                className="flex items-center py-1 w-fit gap-0 transition-all hover:gap-2 md:py-0"
              >
                <span className="flex items-center gap-1">
                  <FaFilePdf />
                  Resume
                </span>
                <MdArrowOutward />
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex items-center py-1 w-fit gap-0 transition-all hover:gap-2 md:py-0"
              >
                <span className="flex items-center gap-1">
                  <MdOutlineLibraryBooks />
                  Blog
                </span>{" "}
                <MdArrowOutward />
              </Link>
            </li>
          </ul> */}
        </section>
        <section className="py-6">
          <h2 className="pb-6 font-serif text-xl font-thin  md:text-2xl dark:opacity-65">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 dark:text-neutral-300">
            {projects.map((project) => (
              <div className="" key={project.title}>
                <ProjectItem {...project} />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="pb-1 font-serif text-xl font-thin  md:text-2xl dark:opacity-65">
            Technologies I Use
          </h2>
          <ul className="pt-4 grid grid-cols-2 space-y-1 md:grid-cols-3 dark:text-neutral-300">
            {technologies.map((tech) => (
              <li key={tech.name} className="flex items-center gap-2">
                {<tech.icon />}
                {tech.name}
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
