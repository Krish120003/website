import Head from "next/head";
import Link from "next/link";
import React from "react";

import {
  MdAlternateEmail,
  MdArrowOutward,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { ProjectItemType, projects, technologies } from "../lib/data";
import { Layout } from "~/components/Layout";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import { ProfilePage, WithContext } from "schema-dts";
import { jsonLdWebSite } from "./_app";
import { jsonLdPerson } from "./_app";
import WorkListItem from "~/components/WorkListItem";

const ProjectItem: React.FC<ProjectItemType> = ({
  title,
  description,
  link,
  image,
}) => {
  return (
    <>
      <a href={link} className="flex w-fit flex-col p-2 pb-2" target="_blank">
        {image && (
          <Image
            src={image}
            alt={title}
            className="mb-4 aspect-video rounded-lg object-cover object-center"
            width={800}
            height={450}
            placeholder="blur"
          />
        )}
        <div className="flex items-end justify-between gap-2 underline">
          <h3 className="">{title}</h3>
          <div className="pb-1">
            <MdArrowOutward />
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-500">{description}</p>
      </a>
    </>
  );
};

export default function Home() {
  const jsonLdProfilePage: WithContext<ProfilePage> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Krish's Website",
    url: "https://krish.gg",
    author: jsonLdPerson,
    publisher: jsonLdPerson,
    isPartOf: jsonLdWebSite,
    mainEntityOfPage: jsonLdWebSite,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://krish.gg",
        },
      ],
    },
    about:
      "Krish is a software engineer focused on high performance full-stack web applications.",
    isAccessibleForFree: true,
  };

  return (
    <>
      <Head>
        <title>{"krish's personal website • home"}</title>
        <meta property="og:title" content="krish's personal website • home" />

        <meta
          name="description"
          content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect."
        />

        <meta
          property="og:description"
          content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.krish.gg" />
        <meta property="og:title" content="krish's personal website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.krish.gg" />
        <meta property="twitter:url" content="https://www.krish.gg" />
        <meta name="twitter:title" content="krish's personal website" />
        <meta
          name="twitter:description"
          content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect."
        />
        {/* meta images */}
        <meta property="og:image" content="https://www.krish.gg/og.jpg" />
        <meta name="twitter:image" content="https://www.krish.gg/og.jpg" />

        <script
          type="application/ld+json"
          id="jsonLdProfilePage"
          key="jsonLdProfilePage"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdProfilePage),
          }}
        />
      </Head>
      <Layout>
        <div className="grid grid-cols-12 gap-4 md:pt-8">
          <div className="col-span-12  md:col-span-4">
            <div className="top-35  py-6 md:fixed">
              <section className="space-y-2 pb-6">
                <h1 className="font-serif-display text-4xl font-bold  md:text-6xl">
                  {/* <div className="text-lg opacity-50">Hi there,</div> {"I'm"}{" "} */}
                  Krish
                </h1>
                <p className="dark:text-neutral-200">
                  i like to write code that runs fast
                </p>
              </section>
              <section className=" py-6 ">
                <h2 className="pb-1 text-xl font-thin md:text-2xl dark:opacity-65">
                  Links
                </h2>
                <ul className="space-y-2 [&>li:hover]:underline">
                  <li>
                    <Link
                      href="/blog"
                      className="flex w-full items-center gap-2 transition-all hover:text-red-600"
                    >
                      <MdOutlineLibraryBooks />
                      /blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/krish_resume.pdf"
                      className="flex w-full items-center gap-2 transition-all hover:text-yellow-500 dark:hover:text-yellow-400"
                    >
                      <FaFilePdf />
                      /resume.pdf
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://x.com/dotkrish"
                      className="flex w-full items-center gap-2 transition-all hover:text-blue-400 dark:hover:text-blue-500"
                    >
                      <SiX />
                      @dotkrish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/krish-krish/"
                      className="flex w-full  items-center gap-2 transition-all hover:text-blue-700 dark:hover:text-blue-500"
                    >
                      <SiLinkedin />
                      linkedin.com/in/krish-krish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/Krish120003"
                      className="flex w-full  items-center gap-2 transition-all hover:text-purple-600 dark:hover:text-purple-500"
                    >
                      <SiGithub />
                      github.com/Krish120003
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <section className="py-6">
              <h2 className="pb-6 font-sans text-xl font-thin md:text-2xl dark:opacity-65">
                Work
              </h2>
              <div className="pb-8">
                <WorkListItem
                  logoSrc={"/logos/vercel-dark.svg"}
                  company={"Vercel"}
                  position={"Software Engineer"}
                  startYear={"Soon"}
                />
                <WorkListItem
                  logoSrc={"/logos/robinhood.png"}
                  company={"Robinhood"}
                  position={"Software Developer Intern"}
                  startYear={2025}
                  endYear={2025}
                />
                <WorkListItem
                  logoSrc={"/logos/hitachirail.png"}
                  company={"Hitachi Rail"}
                  position={"Software Analyst Intern"}
                  startYear={2025}
                  endYear={2025}
                />
                <WorkListItem
                  logoSrc={"/logos/bell.png"}
                  company={"Bell Canada"}
                  position={"AI & Data Engineering Intern"}
                  startYear={2024}
                  endYear={2024}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 dark:text-neutral-300">
                {projects
                  .filter((project) => !project.hidden)
                  .map((project) => (
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
          </div>
        </div>

        {/* <div className="fixed right-4 top-4 rounded-lg bg-black/10 px-2 py-1 text-sm backdrop-blur-sm dark:bg-white/10">
          <span className="sm:hidden">sm</span>
          <span className="hidden sm:inline md:hidden">md</span>
          <span className="hidden md:inline">lg</span>
        </div> */}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
