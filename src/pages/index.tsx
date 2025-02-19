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
import Image from "next/image";

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
        className="flex w-fit flex-col  p-2 pb-2"
        image={image}
      >
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
      </PopoverLink>
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
        <div className="grid grid-cols-12 gap-4 md:pt-8">
          <div className="col-span-12 md:col-span-4">
            <div className="top-35 py-6 md:fixed">
              <section className="space-y-2 pb-6">
                <h1 className="font-serif-display text-4xl font-bold  md:text-6xl">
                  {/* <div className="text-lg opacity-50">Hi there,</div> {"I'm"}{" "} */}
                  Krish
                </h1>
                <p className="dark:text-neutral-200">
                  i like to write code that runs fast
                </p>
              </section>
              <section className="py-6">
                <h2 className="pb-1 text-xl font-thin md:text-2xl dark:opacity-65">
                  Links
                </h2>
                <ul className="space-y-2 [&>li]:underline">
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
                      {/* <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse ">
                        Resume
                      </span> */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/krish-krish/"
                      className="flex w-full  items-center gap-2 transition-all hover:text-blue-700 dark:hover:text-blue-500"
                    >
                      <SiLinkedin />
                      linkedin.com/in/krish-krish
                      {/* <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                        LinkedIn
                      </span> */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/Krish120003"
                      className="flex w-full  items-center gap-2 transition-all hover:text-purple-600 dark:hover:text-purple-500"
                    >
                      <SiGithub />
                      github.com/Krish120003
                      {/* <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                        Github
                      </span> */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:krish120003@gmail.com"
                      className="flex w-full  items-center gap-2 transition-all hover:text-green-600 dark:hover:text-green-500"
                    >
                      <MdAlternateEmail />
                      krish120003@gmail.com
                      {/* <span className="flex items-center gap-2 font-sans text-sm opacity-50 md:flex-row-reverse">
                        Email
                      </span> */}
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 dark:text-neutral-300">
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
