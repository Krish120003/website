import Head from "next/head";
import Link from "next/link";
import React from "react";

import {
  MdAlternateEmail,
  MdArrowOutward,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { projects, technologies } from "../lib/data";
import { Layout } from "~/components/Layout";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { PopoverLink } from "~/components/PopoverLink";
import WorkListItem from "~/components/WorkListItem";

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
        className="flex w-fit items-end pb-2 underline"
        image={image}
      >
        <h3 className="">{title}</h3>
        <div className="pb-1">
          <MdArrowOutward />
        </div>
      </PopoverLink>
      <p className="text-neutral-600 dark:text-neutral-500">{description}</p>
    </>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{"krish's personal website • home"}</title>
        <meta property="og:title" content="krish's personal website • home" />

        <meta name="description" content="krish's personal website" />
        <meta property="og:description" content="krish's personal website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.krish.gg" />
        <meta property="og:title" content="krish's personal website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.krish.gg" />
        <meta property="twitter:url" content="https://www.krish.gg" />
        <meta name="twitter:title" content="krish's personal website" />
        <meta name="twitter:description" content="krish's personal website" />
        {/* meta images */}
        <meta property="og:image" content="https://www.krish.gg/og.jpg" />
        <meta name="twitter:image" content="https://www.krish.gg/og.jpg" />
      </Head>
      <Layout>
        <section className="space-y-2 pb-6">
          <h1 className="font-serif-display text-4xl font-bold md:pt-16 md:text-6xl">
            <div className="text-lg opacity-50">Hi there,</div> {"I'm"} Krish
          </h1>
          <p className="dark:text-neutral-200">
            i like to write code that runs fast
          </p>
          <p className="dark:text-neutral-200">
            software engineering intern @{" "}
            <a
              href="https://www.linkedin.com/feed/update/urn:li:activity:7185751055345876992/"
              className="underline"
            >
              Bell Canada
            </a>
          </p>
        </section>
        <hr className="opacity-10" />
        <section className="py-6">
          <h2 className="pb-1 text-xl font-thin md:text-2xl dark:opacity-65">
            Links
          </h2>

          <ul className="font-mono">
            <li>
              <Link
                href="/blog"
                className="flex w-full flex-col justify-between transition-all hover:text-red-600 md:flex-row md:items-center md:gap-2 md:py-0"
              >
                writings
                <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                  <MdOutlineLibraryBooks />
                  Personal Blog
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/krish-krish/"
                className="flex w-full flex-col justify-between transition-all hover:text-blue-700 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-blue-500"
              >
                linkedin.com/in/krish-krish
                <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                  <SiLinkedin />
                  LinkedIn
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/Krish120003"
                className="flex w-full flex-col justify-between transition-all hover:text-purple-600 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-purple-500"
              >
                github.com/Krish120003
                <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                  <SiGithub />
                  Github
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/krish_resume.pdf"
                className="flex w-full flex-col justify-between transition-all hover:text-yellow-500 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-yellow-400"
              >
                resume.pdf
                <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse ">
                  <FaFilePdf />
                  Resume
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="mailto:krish120003@gmail.com"
                className="flex w-full flex-col justify-between transition-all hover:text-green-600 md:flex-row md:items-center md:gap-2 md:py-0 dark:hover:text-green-500"
              >
                krish120003@gmail.com
                <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                  <MdAlternateEmail />
                  Email
                </span>
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className=" pb-1 text-xl font-thin md:text-2xl dark:opacity-65">
            Work
          </h2>
          <ul className="-mx-2">
            <li className="">
              <WorkListItem
                company="Robinhood"
                position="Incoming Summer SWE Intern"
                startYear={2025}
                endYear={2025}
                logoSrc={"/logos/robinhood.png"}
                themeColor={[200, 200, 0]}
                themeColorHex="#C80000"
              />
            </li>
            <li>
              <WorkListItem
                company="Hitachi Rail"
                position="Incoming Software Analyst Intern"
                startYear={2025}
                endYear={2025}
                logoSrc={"/logos/hitachirail.png"}
              />
            </li>

            <li className="">
              <WorkListItem
                company="Bell Canada"
                position="Software Engineering Intern"
                startYear={2024}
                endYear={2024}
                logoSrc={"/logos/bell.png"}
              />
            </li>
            <li className="">
              <WorkListItem
                company="McMaster University"
                position="Teaching Assistant"
                startYear={2023}
                endYear={2024}
                logoSrc={"/logos/mcmaster.png"}
              />
            </li>
          </ul>
        </section>

        <section className="py-6">
          <h2 className="pb-6 font-sans text-xl font-thin md:text-2xl dark:opacity-65">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 dark:text-neutral-300">
            {projects.map((project) => (
              <div className="" key={project.title}>
                <ProjectItem {...project} />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="pb-1 text-xl font-thin md:text-2xl dark:opacity-65">
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

export async function getStaticProps() {
  return {
    props: {},
  };
}
