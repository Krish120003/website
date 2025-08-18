import Link from "next/link";
import { type PostMetadataType, getSortedPostsData } from "../../lib/posts";
import { Layout } from "~/components/Layout";
import Head from "next/head";
import Image from "next/image";
import { formatDateDigits, formatDateISO } from "~/lib/utils";
import { WithContext, Blog as BlogType, CollectionPage } from "schema-dts";
import { BreadcrumbList } from "schema-dts";
import { jsonLdPerson } from "../_app";
import { jsonLdWebSite } from "../_app";
import { useState } from "react";

interface BlogProps {
  allPostsData: PostMetadataType[];
}

export default function Blog({ allPostsData }: BlogProps) {
  // Temporary image mapping for prototyping
  const postImageMap: Record<string, string> = {
    "blur-placeholders-for-gifs-nextjs": "/work/gitfaster.png",
    "composing-decorators-python": "/work/particle_system.png",
    "cpp-neural-nets": "/work/cpp_neural_network.png",
    "i-made-an-ai-app": "/work/integrity.jpg",
    "json-parser-in-rust": "/assets/json-parser-in-rust/json_number.png",
    "making-a-vercel-clone": "/work/zercel.png",
    "zercel_gcp_batch_builds": "/work/zercel.png",
  };

  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

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

  // Build news-style groupings
  const visiblePosts = allPostsData.filter((p) => p.hidden !== true);
  const longformPosts = visiblePosts.filter((p) => p.micro !== true);
  const microPosts = visiblePosts.filter((p) => p.micro === true);

  const defaultFeatured = longformPosts[0];
  const hoveredPost = hoveredPostId ? longformPosts.find(p => p.id === hoveredPostId) : null;
  const featured = hoveredPost || defaultFeatured;
  const moreStories = [...longformPosts, ...longformPosts]

  // left column is half, right is half
  const middle = Math.ceil(moreStories.length / 2);
  const leftCol = moreStories.slice(0, middle + 1);
  // right column is the second half
  const rightCol = moreStories.slice(middle + 1);

  const featureImg = featured ? (postImageMap[featured.id] || "/work/zercel.png") : "/work/zercel.png"; // generic fallback hero

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

      {/* News masthead */}
      <div className="flex items-end justify-between border-b border-neutral-300 pb-2 dark:border-neutral-800">
        <h1 className="font-serif-display text-4xl tracking-tight text-neutral-800 dark:text-neutral-100">
          Krish's Blog
        </h1>
        <span className="hidden text-xs uppercase text-neutral-500 md:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Top grid: left rail / feature / right rail */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-12 border-b min-h-[75vh]">
        {/* Left rail: recents */}
        <aside className="hidden md:col-span-3 md:block border-r">
          <div className="sticky top-4 space-y-3">
            <h2 className="font-serif-display text-xl text-neutral-800 dark:text-neutral-100 pt-8">
              Recents
            </h2>
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {longformPosts.slice(0, 6).map((p) => (
                <li
                  key={p.id}
                  className="py-3 pr-2"
                  onMouseEnter={() => setHoveredPostId(p.id)}
                  onMouseLeave={() => setHoveredPostId(null)}
                >
                  <Link
                    href={`/blog/${p.id}`}
                    className="block text-sm font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-800 dark:text-neutral-100 dark:decoration-neutral-700 dark:hover:decoration-neutral-400"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {p.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Feature */}
        <div className="md:col-span-9">
          {featured ? (
            <Link href={`/blog/${featured.id}`} className="group block">
              <div className="relative overflow-hidden rounded-md pt-8">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={featureImg}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover shadow-none"
                    priority
                  />
                  {/* grid overlay light mode */}

                </div>
                <div className="space-y-3 p-4 md:p-6">
                  <h2 className="font-serif-display text-3xl leading-tight tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-100 md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="max-w-3xl text-neutral-700 dark:text-neutral-300">
                    {featured.description}
                  </p>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {formatDateDigits(featured.date)}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="rounded-md border border-neutral-200 p-6 dark:border-neutral-800">
              <p className="text-neutral-600 dark:text-neutral-400">No posts yet.</p>
            </div>
          )}
        </div>

        {/* Right rail: micro blogs (styled like recents)
        <aside className="md:col-span-3 border-l pl-4">
          <div className="sticky top-4 space-y-3">
            <h2 className="font-serif-display text-xl text-neutral-800 dark:text-neutral-100 pt-8 ">
              Micro blogs
            </h2>
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {microPosts.slice(0, 6).map((p) => (
                <li key={p.id} className="py-3">
                  <Link
                    href={`/blog/${p.id}`}
                    className="block text-sm font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-800 dark:text-neutral-100 dark:decoration-neutral-700 dark:hover:decoration-neutral-400"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {p.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside> */}
      </section>

      {/* More stories grid */}
      {moreStories.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-serif-display text-xl text-neutral-800 dark:text-neutral-100 opacity-50">
            More?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left column on md+, single column on mobile */}
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 md:border-r">
              {leftCol.slice(1).map((p) => (
                <li key={p.id} className="py-4 first:pt-0">
                  <Link
                    href={`/blog/${p.id}`}
                    className="group block"
                  >
                    <h3 className="text-lg font-medium text-neutral-900 group-hover:underline dark:text-neutral-100">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                      {formatDateDigits(p.date)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right column - flows below on mobile, side-by-side on md+ */}
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 ">
              {rightCol.map((p) => (
                <li key={p.id} className="py-4 first:pt-0 pl-6">
                  <Link
                    href={`/blog/${p.id}`}
                    className="group block"
                  >
                    <h3 className="text-lg font-medium text-neutral-900 group-hover:underline dark:text-neutral-100">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                      {formatDateDigits(p.date)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}


      {/*
      <hr className="m-auto my-8 max-w-xl border-neutral-300 dark:border-neutral-800" />


      {microPosts.length > 0 && (
        <section>
          <h2 className="font-serif-display text-xl text-neutral-800 dark:text-neutral-100">
            Micro blogs
          </h2>
          <p className="mb-3 text-sm text-neutral-600 opacity-70 dark:text-neutral-400">
            Concise technical snippets from my experiences
          </p>
          <ul className="space-y-2 md:space-y-0">
            {microPosts.map(({ id, date, title }) => (
              <li key={id} className="flex flex-col md:flex-row md:gap-8">
                <div className="text-md font-mono text-neutral-800  dark:text-white dark:opacity-65">
                  {formatDateDigits(date)}
                </div>
                <Link
                  href={`/blog/${id}`}
                  className="flex-1 underline decoration-neutral-500 transition-all hover:decoration-black  dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )} */}
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
