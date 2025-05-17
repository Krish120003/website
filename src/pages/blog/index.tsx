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
      <div>
        <h1 className="font-serif-display text-2xl text-neutral-800 dark:text-neutral-100">
          {"Krish's Blog"}
        </h1>
        <p className="text-neutral-600 opacity-70 dark:text-neutral-400">
          I make occasional posts about what I&apos;m learning
        </p>
        <hr className="m-auto my-4 border-neutral-400 dark:border-white dark:opacity-10" />
      </div>
      {/* <h2>Posts</h2> */}
      <ul className="space-y-2 md:space-y-0">
        {allPostsData
          .filter((e) => e.micro !== true && e.hidden !== true)
          .map(({ id, date, title, description }) => (
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
              {/* <p className="dark:text-neutral-300">{description}</p> */}
            </li>
          ))}
      </ul>

      <hr className="m-auto  my-8 max-w-xl border-transparent" />

      <h2>Micro blogs</h2>
      <p className="mb-2 text-sm text-neutral-600 opacity-70 dark:text-neutral-400">
        Concise technical snippets from my experiences
      </p>
      <ul className="space-y-2 md:space-y-0">
        {allPostsData
          .filter((e) => e.micro === true && e.hidden !== true)
          .map(({ id, date, title, description }) => (
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
              {/* <p className="dark:text-neutral-300">{description}</p> */}
            </li>
          ))}
      </ul>
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
