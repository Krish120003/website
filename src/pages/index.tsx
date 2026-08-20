import Head from "next/head";
import Link from "next/link";
import React from "react";

import { MdArrowOutward } from "react-icons/md";
import { ProjectItemType, projects, technologies } from "../lib/data";
import { Layout } from "~/components/Layout";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import { ProfilePage, WithContext } from "schema-dts";
import { jsonLdWebSite } from "./_app";
import { jsonLdPerson } from "./_app";

interface HomeProps {
  edition: string;
}

/* A single work "story" laid out like a newspaper article. */
const WorkStory: React.FC<ProjectItemType & { kicker: string }> = ({
  title,
  description,
  link,
  image,
  kicker,
}) => {
  return (
    <article className="border-t border-current/20 pt-4">
      <Link href={link} className="group block">
        <p className="mb-1 font-news text-[0.7rem] uppercase tracking-[0.2em] opacity-60">
          {kicker}
        </p>
        <h3 className="flex items-start justify-between gap-2 font-serif-display text-2xl leading-tight group-hover:underline">
          <span className="text-balance">{title}</span>
          <MdArrowOutward className="mt-1 shrink-0 text-base opacity-50" />
        </h3>
        {image && (
          <div className="news-photo my-3">
            <Image
              src={image}
              alt={title}
              className="aspect-video w-full object-cover object-center"
              width={800}
              height={450}
              placeholder="blur"
            />
          </div>
        )}
        <p className="font-news text-[0.95rem] leading-snug opacity-80">
          {description}
        </p>
      </Link>
    </article>
  );
};

export default function Home({ edition }: HomeProps) {
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

  const [lead, ...rest] = projects;

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
        <div className="mx-auto max-w-6xl font-news">
          {/* ---------------- Masthead ---------------- */}
          <header className="pt-2">
            <div className="flex items-center justify-between border-b border-current pb-1 text-[0.7rem] uppercase tracking-[0.18em] opacity-70">
              <span>Vol. MMXXVI — No. 1</span>
              <span className="hidden sm:inline">krish.gg</span>
              <span>{edition}</span>
            </div>

            <h1 className="border-b-4 border-double border-current py-3 text-center font-serif-display text-6xl leading-none md:text-8xl">
              The Krish Times
            </h1>

            <div className="flex items-center justify-between border-b border-current py-1 text-[0.7rem] uppercase tracking-[0.18em] opacity-70">
              <span>Late Edition</span>
              <span className="italic">
                &ldquo;i like to write code that runs fast&rdquo;
              </span>
              <span className="hidden sm:inline">Price: Free</span>
            </div>
          </header>

          {/* ---------------- Top section: lead + rails ---------------- */}
          <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-12 md:divide-x md:divide-current/30">
            {/* Left rail — directory / links */}
            <aside className="md:col-span-3 md:pr-6">
              <h2 className="mb-2 border-b border-current pb-1 text-center font-serif-display text-lg uppercase tracking-widest">
                Directory
              </h2>
              <ul className="space-y-2 text-[0.95rem]">
                <li>
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 hover:text-red-600 hover:underline"
                  >
                    <FaFilePdf className="opacity-0" />
                    the blog &rarr; /blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/krish_resume.pdf"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaFilePdf />
                    /resume.pdf
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/dotkrish"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <SiX />
                    @dotkrish
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/krish-krish/"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <SiLinkedin />
                    in/krish-krish
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Krish120003"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <SiGithub />
                    Krish120003
                  </Link>
                </li>
              </ul>

              <div className="mt-6 border-y border-current py-3 text-center">
                <p className="font-serif-display text-sm uppercase tracking-widest">
                  Weather
                </p>
                <p className="mt-1 text-[0.85rem] opacity-75">
                  Terminal, dark mode. Coffee likely.
                </p>
              </div>
            </aside>

            {/* Center — the lead story */}
            <section className="md:col-span-9 md:pl-6">
              <p className="text-center text-[0.7rem] uppercase tracking-[0.25em] opacity-60">
                Profile &middot; Engineering
              </p>
              <h2 className="mt-1 text-balance text-center font-serif-display text-4xl leading-[0.95] md:text-6xl">
                Engineer Builds Software That Runs Fast
              </h2>
              <p className="mt-2 text-center text-[0.8rem] uppercase tracking-widest opacity-70">
                By Krish Krish &middot; Staff Correspondent
              </p>
              <hr className="my-4 border-current opacity-30" />
              <div className="news-columns font-news text-[1rem] leading-relaxed">
                <p className="dropcap">
                  Krish is a software engineer focused on high performance,
                  full-stack web applications — the kind of work where
                  milliseconds are measured and every render is accounted for.
                  His days are spent chasing the shortest path between an idea
                  and a fast, reliable product.
                </p>
                <p className="mt-3">
                  His recent dispatches range from high-performance trading
                  charts at Robinhood to hand-written parsers, open-source
                  infrastructure clones, and hackathon-winning robots. A running
                  theme unites them: code that respects the machine and the
                  person waiting on it. Read on for the full record of ventures
                  below, or consult the Directory for ways to reach the desk.
                </p>
              </div>
            </section>
          </div>

          {/* ---------------- Work section ---------------- */}
          <section className="border-t-4 border-double border-current pt-4">
            <div className="mb-6 flex items-center justify-between border-b border-current pb-2">
              <h2 className="font-serif-display text-2xl uppercase tracking-widest">
                Work &amp; Ventures
              </h2>
              <span className="hidden text-[0.7rem] uppercase tracking-[0.2em] opacity-60 sm:inline">
                Selected Reports
              </span>
            </div>

            {/* Lead work story */}
            {lead && (
              <div className="mb-6 grid grid-cols-1 gap-5 border-b border-current pb-6 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="mb-1 font-news text-[0.7rem] uppercase tracking-[0.2em] opacity-60">
                    Front Page
                  </p>
                  <Link href={lead.link} className="group block">
                    <h3 className="flex items-start justify-between gap-3 text-balance font-serif-display text-3xl leading-tight group-hover:underline md:text-5xl">
                      <span>{lead.title}</span>
                      <MdArrowOutward className="mt-2 shrink-0 text-2xl opacity-50" />
                    </h3>
                    <p className="mt-3 font-news text-lg leading-snug opacity-85">
                      {lead.description}
                    </p>
                  </Link>
                </div>
                {lead.image && (
                  <div className="md:col-span-5">
                    <Link href={lead.link} className="news-photo block">
                      <Image
                        src={lead.image}
                        alt={lead.title}
                        className="aspect-video w-full object-cover object-center"
                        width={800}
                        height={450}
                        placeholder="blur"
                      />
                    </Link>
                    <p className="mt-1 font-news text-[0.75rem] italic opacity-60">
                      Pictured: {lead.title}.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Remaining stories in a newspaper grid */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <WorkStory key={project.title} {...project} kicker="Report" />
              ))}
            </div>
          </section>

          {/* ---------------- Technologies ---------------- */}
          <section className="mt-4 border-y-4 border-double border-current py-4">
            <h2 className="mb-3 text-center font-serif-display text-xl uppercase tracking-[0.3em]">
              Tools of the Trade
            </h2>
            <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-8 gap-y-1 text-[0.95rem] sm:grid-cols-3 md:grid-cols-5">
              {technologies.map((tech) => (
                <li key={tech.name} className="flex items-center gap-2">
                  <tech.icon />
                  {tech.name}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const edition = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    props: { edition },
  };
}
