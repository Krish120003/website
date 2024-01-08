import Head from "next/head";
import Link from "next/link";
import React from "react";

import { MdArrowOutward } from "react-icons/md";
import { projects, technologies } from "../lib/data";
import { SiArchiveofourown, SiLinkedin } from "react-icons/si";

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
      <Link href={link} className="flex items-end underline">
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
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width" />

        {/* meta images */}
        <meta property="og:image" content="https://krishkrish.com/og.jpg" />
        <meta name="twitter:image" content="https://krishkrish.com/og.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lowercase dark:bg-neutral-900 dark:text-white">
        <main className="m-auto min-h-full max-w-3xl  p-12">
          <section className="space-y-2 pb-6">
            <h1 className="text-2xl font-bold md:pt-16 md:text-4xl">
              Hi there, I'm Krish
            </h1>
            <p className="dark:text-neutral-200">
              I'm a 20 year old computer science undergrad student from Canada.
              i spend my time learning and experimenting with web and machine
              learning technologies.
            </p>
            <p className=" dark:text-neutral-200">
              Currently, I lead a team of developers at{" "}
              <Link
                href="https://deltahacks.com"
                className="inline-flex items-center text-white underline"
              >
                DeltaHacks <MdArrowOutward />
              </Link>
              , and teach Python Programming at{" "}
              <span className="text-white">McMaster University</span>.
            </p>
          </section>
          <section className="pb-8">
            <h2 className="pb-1 text-xl font-semibold md:text-2xl">Links</h2>
            <ul className="space-y-1 underline">
              <li>
                <Link
                  href="https://www.linkedin.com/in/krish-krish/"
                  className="flex items-center"
                >
                  LinkedIn <MdArrowOutward />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Krish120003"
                  className="flex items-center"
                >
                  GitHub <MdArrowOutward />
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="pb-1 text-xl font-semibold md:text-2xl">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 dark:text-neutral-200">
              {projects.map((project) => (
                <div className="pb-4 pr-6">
                  <ProjectItem key={project.title} {...project} />
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold md:text-2xl">
              Technologies I use
            </h2>
            <ul className="grid grid-cols-2 space-y-1 pt-4 md:grid-cols-3 dark:text-neutral-200">
              {technologies.map((tech) => (
                <li key={tech.name} className="flex items-center gap-2">
                  {<tech.icon />}
                  {tech.name}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
