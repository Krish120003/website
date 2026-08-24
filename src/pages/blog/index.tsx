import Link from "next/link";
import { type PostMetadataType, getSortedPostsData } from "../../lib/posts";
import { Layout } from "~/components/Layout";
import Head from "next/head";
import { formatDateDigits, formatDateISO } from "~/lib/utils";
import { WithContext, Blog as BlogType, CollectionPage } from "schema-dts";
import { BreadcrumbList } from "schema-dts";
import { jsonLdPerson } from "../_app";
import { jsonLdWebSite } from "../_app";

interface BlogProps {
  allPostsData: PostMetadataType[];
}

export default function Blog({ allPostsData }: BlogProps) {
  const hostUrl = "https://krish.gg";
  const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: hostUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${hostUrl}/blog`,
      },
    ],
  };

  const jsonLdBlog: WithContext<BlogType> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Krish's Blog",
    url: `${hostUrl}/blog`,
    author: jsonLdPerson,
    publisher: jsonLdPerson,
    isPartOf: jsonLdWebSite,
    mainEntityOfPage: jsonLdWebSite,
  };

  const jsonLdCollectionPage: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Krish's Blog",
    url: `${hostUrl}/blog`,
    author: jsonLdPerson,
    hasPart: allPostsData
      .filter((e) => e.hidden !== true)
      .map((e) => ({
        "@type": "BlogPosting",
        name: e.title,
        headline: e.title,
        description: e.description,
        url: `${hostUrl}/blog/${e.id}`,
        author: jsonLdPerson,
        publisher: jsonLdPerson,
        datePublished: formatDateISO(e.date),
      })),
  };

  return (
    <Layout back>
      <Head>
        <title>krish&apos;s technical blog</title>
        <meta
          name="description"
          content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect."
        />

        <meta property="og:title" content="krish's technical blog" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.krish.gg/blog" />
        <meta
          property="og:description"
          content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect."
        />
        <meta name="description" content="krish's technical website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.krish.gg" />
        <meta property="twitter:url" content="https://www.krish.gg" />
        <meta name="twitter:title" content="krish's technical blog" />
        <meta
          name="twitter:description"
          content="I'm Krish — software engineer focused on writing code that runs fast. Explore my work, blog, and ways to connect."
        />
        {/* meta images */}
        <meta property="og:image" content="https://www.krish.gg/og.jpg" />
        <meta name="twitter:image" content="https://www.krish.gg/og.jpg" />

        <script
          type="application/ld+json"
          id="jsonLdBreadcrumbList"
          key="jsonLdBreadcrumbList"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBreadcrumbList),
          }}
        />
        <script
          type="application/ld+json"
          id="jsonLdBlog"
          key="jsonLdBlog"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBlog),
          }}
        />
        <script
          type="application/ld+json"
          id="jsonLdCollectionPage"
          key="jsonLdCollectionPage"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdCollectionPage),
          }}
        />
      </Head>
      <div className="flex items-end justify-between gap-4 border-b border-[var(--rule)] pb-5">
        <div><p className="mb-2 font-mono text-xs font-bold uppercase tracking-[.18em] text-[var(--accent)]">The technical edition</p><h1 className="m-0 font-serif text-5xl leading-none md:text-7xl">Krish&apos;s Blog</h1><p className="mt-3 text-sm text-[var(--muted-ink)]">Occasional dispatches about what I&apos;m learning.</p></div>
        <a href="/rss.xml" className="font-mono text-xs font-bold uppercase tracking-widest underline">RSS</a>
      </div>
      <section className="py-8"><div className="mb-4 flex items-baseline justify-between border-b-4 border-double border-[var(--ink)] pb-2"><h2 className="m-0 font-serif text-3xl">Latest stories</h2><span className="font-mono text-xs uppercase text-[var(--muted-ink)]">Filed chronologically</span></div><ul className="m-0 flex flex-col p-0">{allPostsData.filter((e) => e.micro !== true && e.hidden !== true).map(({ id, date, title }) => <li key={id} className="grid gap-2 border-b border-[var(--rule)] py-4 md:grid-cols-[9rem_1fr]"><div className="font-mono text-xs uppercase tracking-wider text-[var(--muted-ink)]">{formatDateDigits(date)}</div><Link href={`/blog/${id}`} className="font-serif text-2xl leading-tight underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--accent)]">{title}</Link></li>)}</ul></section>
      <section className="border-t border-[var(--ink)] pt-6"><p className="mb-1 font-mono text-xs font-bold uppercase tracking-[.18em] text-[var(--accent)]">Notebook</p><h2 className="m-0 font-serif text-3xl">Micro blogs</h2><p className="mb-4 text-sm text-[var(--muted-ink)]">Concise technical snippets from my experiences.</p><ul className="m-0 flex flex-col p-0">{allPostsData.filter((e) => e.micro === true && e.hidden !== true).map(({ id, date, title }) => <li key={id} className="grid gap-2 border-b border-[var(--rule)] py-3 md:grid-cols-[9rem_1fr]"><div className="font-mono text-xs uppercase text-[var(--muted-ink)]">{formatDateDigits(date)}</div><Link href={`/blog/${id}`} className="underline decoration-[var(--rule)] underline-offset-4 hover:decoration-[var(--accent)]">{title}</Link></li>)}</ul></section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
