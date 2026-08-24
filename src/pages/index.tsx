import Head from "next/head";
import Link from "next/link";
import React from "react";
import { MdArrowOutward, MdOutlineLibraryBooks } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Image from "next/image";
import { ProfilePage, WithContext } from "schema-dts";
import { ProjectItemType, projects, technologies } from "../lib/data";
import { Layout } from "~/components/Layout";
import { jsonLdPerson, jsonLdWebSite } from "./_app";

const ProjectItem: React.FC<ProjectItemType> = ({ title, description, link, image }) => (
  <article className="group border-t border-[var(--rule)] pt-3">
    <Link href={link} className="flex flex-col gap-3 text-[var(--ink)] no-underline">
      {image && <Image src={image} alt={title} className="aspect-video object-cover object-center" width={800} height={450} placeholder="blur" />}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-2xl leading-tight underline decoration-[var(--rule)] underline-offset-4 group-hover:decoration-[var(--accent)]">{title}</h3>
        <MdArrowOutward className="mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" />
      </div>
      <p className="m-0 text-sm text-[var(--muted-ink)]">{description}</p>
    </Link>
  </article>
);

export default function Home() {
  const jsonLdProfilePage: WithContext<ProfilePage> = { "@context": "https://schema.org", "@type": "ProfilePage", name: "Krish's Website", url: "https://krish.gg", author: jsonLdPerson, publisher: jsonLdPerson, isPartOf: jsonLdWebSite, mainEntityOfPage: jsonLdWebSite, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://krish.gg" }] }, about: "Krish is a software engineer focused on high performance full-stack web applications.", isAccessibleForFree: true };
  return <>
    <Head>
      <title>{"krish's personal website • home"}</title><meta property="og:title" content="krish's personal website • home" /><meta name="description" content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect." /><meta property="og:description" content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect." /><meta property="og:type" content="website" /><meta property="og:url" content="https://www.krish.gg" /><meta property="og:image" content="https://www.krish.gg/og.jpg" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:image" content="https://www.krish.gg/og.jpg" />
      <script type="application/ld+json" id="jsonLdProfilePage" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }} />
    </Head>
    <Layout>
      <div className="flex items-end justify-between gap-4 border-b border-[var(--rule)] pb-4"><span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-ink)]">Tuesday, August 24, 2026</span><span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-ink)]">Front Page</span></div>
      <section className="grid gap-8 py-8 md:grid-cols-[1fr_2fr] md:gap-12">
        <div><p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.18em] text-[var(--accent)]">Independent software engineer</p><h1 className="m-0 font-serif text-6xl leading-[.9] tracking-tight md:text-8xl">Krish<br /><span className="text-[var(--accent)]">Krish</span></h1><p className="mt-6 max-w-xs text-lg leading-relaxed text-[var(--muted-ink)]">I like to write code that runs fast.</p></div>
        <div className="border-y-4 border-double border-[var(--ink)] py-5"><p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--muted-ink)]">The lead story</p><h2 className="m-0 max-w-3xl font-serif text-4xl leading-[1.02] md:text-6xl">Building useful things for the web, one careful commit at a time.</h2><p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted-ink)]">A collection of selected work, technical writing, and the tools I use to turn ideas into fast, reliable software.</p></div>
      </section>
      <div className="grid gap-10 border-t border-[var(--ink)] pt-8 md:grid-cols-[1fr_2fr] md:gap-12"><aside><p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.18em] text-[var(--accent)]">Dispatches & links</p><ul className="m-0 flex flex-col gap-3 p-0 text-sm [&>li]:list-none"><li><Link href="/blog" className="flex items-center gap-2 underline"><MdOutlineLibraryBooks />The technical blog</Link></li><li><Link href="/krish_resume.pdf" className="flex items-center gap-2 underline"><FaFilePdf />Resume.pdf</Link></li><li><Link href="https://x.com/dotkrish" className="flex items-center gap-2 underline"><SiX />@dotkrish</Link></li><li><Link href="https://www.linkedin.com/in/krish-krish/" className="flex items-center gap-2 underline"><SiLinkedin />LinkedIn</Link></li><li><Link href="https://github.com/Krish120003" className="flex items-center gap-2 underline"><SiGithub />GitHub</Link></li></ul></aside><section><div className="mb-5 flex items-baseline justify-between border-b border-[var(--rule)] pb-2"><h2 className="m-0 font-serif text-3xl">Selected work</h2><span className="font-mono text-xs uppercase text-[var(--muted-ink)]">Portfolio</span></div><div className="grid gap-8 sm:grid-cols-2">{projects.map((project) => <ProjectItem {...project} key={project.title} />)}</div></section></div>
      <section className="mt-12 border-y border-[var(--ink)] py-5"><div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><h2 className="m-0 font-serif text-3xl">Technologies I use</h2><ul className="m-0 grid flex-1 gap-x-6 gap-y-2 p-0 text-sm sm:grid-cols-2 md:max-w-2xl md:grid-cols-3">{technologies.map((tech) => <li key={tech.name} className="flex list-none items-center gap-2 text-[var(--muted-ink)]"><tech.icon aria-hidden="true" />{tech.name}</li>)}</ul></div></section>
    </Layout>
  </>;
}
export async function getStaticProps() { return { props: {} }; }
