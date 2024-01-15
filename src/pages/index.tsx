import Head from "next/head";
import Link from "next/link";
import React from "react";

import {
  MdArrowOutward,
  MdLaptopChromebook,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { projects, technologies } from "../lib/data";
import { Layout } from "~/components/Layout";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";

interface ProjectItemProps {
  title: string;
  description: string;
  link: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <>
      <Link href={link} className="flex items-end pb-2 underline">
        <h3>{title}</h3>
        <div className="pb-1">
          <MdArrowOutward />
        </div>
      </Link>
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
        <section className="space-y-6 pb-6">
          <h1 className="text-2xl font-bold md:pt-16 md:text-4xl">
            Hi There, {"I'm"} Krish
          </h1>
          <p className="dark:text-neutral-200">
            {"I'm"} a 20 year old computer science undergrad student from
            Canada. I spend my time learning and experimenting with web and
            machine learning technologies.
          </p>
          <p className="dark:text-neutral-200">
            Currently, I lead a team of developers at{" "}
            <Link
              href="https://deltahacks.com"
              className="inline-flex items-center font-semibold underline dark:text-white"
            >
              DeltaHacks <MdArrowOutward />
            </Link>
            hosting a hackathon, and teach Python Programming at{" "}
            <span className="font-semibold dark:text-white">
              McMaster University
            </span>{" "}
            as a teaching assistant.
          </p>
          <p className="dark:text-neutral-200">
            Previously, I worked as a junior software developer at Synergy
            Machines, responsible for developing full stack dashboards for
            evironmental data analytics.
          </p>
        </section>
        <section className="py-6">
          <h2 className="pb-1 text-xl font-semibold md:text-2xl">Links</h2>
          <ul className="space-y-1 underline dark:text-neutral-300">
            <li>
              <Link
                href="https://www.linkedin.com/in/krish-krish/"
                className="flex w-fit items-center gap-0 py-1 transition-all hover:gap-2 md:py-0"
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
                className="flex w-fit items-center gap-0 py-1 transition-all hover:gap-2 md:py-0"
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
                className="flex w-fit items-center gap-0 py-1 transition-all hover:gap-2 md:py-0"
              >
                <span className="flex items-center gap-1">
                  <FaFilePdf />
                  Resume
                </span>
                <MdArrowOutward />
              </Link>
            </li>
            {/* <li>
              <Link
                href="/blog"
                className="flex w-fit items-center gap-0 py-1 transition-all hover:gap-2 md:py-0"
              >
                <span className="flex items-center gap-1">
                  <MdOutlineLibraryBooks />
                  Blog
                </span>{" "}
                <MdArrowOutward />
              </Link>
            </li> */}
          </ul>
        </section>
        <section className="py-6">
          <h2 className="pb-6 text-xl font-semibold md:text-2xl">Projects</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 dark:text-neutral-300">
            {projects.map((project) => (
              <div className="" key={project.title}>
                <ProjectItem {...project} />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold md:text-2xl">
            Technologies I Use
          </h2>
          <ul className="grid grid-cols-2 space-y-1 pt-4 md:grid-cols-3 dark:text-neutral-300">
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
