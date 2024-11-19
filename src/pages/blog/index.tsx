import Link from "next/link";
import { type PostMetadataType, getSortedPostsData } from "../../lib/posts";
import { Layout } from "~/components/Layout";
import Head from "next/head";
import { formatDate, formatDateDigits } from "~/lib/utils";

interface BlogProps {
  allPostsData: PostMetadataType[];
}

export default function Blog({ allPostsData }: BlogProps) {
  return (
    <Layout back>
      <Head>
        <title>krish&apos;s technical blog</title>
        <meta property="og:title" content="krish's technical blog" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.krish.gg/blog" />
        <meta property="og:description" content="krish's technical blog" />
        <meta name="description" content="krish's technical website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="www.krish.gg" />
        <meta property="twitter:url" content="https://www.krish.gg" />
        <meta name="twitter:title" content="krish's technical blog" />
        <meta name="twitter:description" content="krish's technical blog" />
        {/* meta images */}
        <meta property="og:image" content="https://www.krish.gg/og.jpg" />
        <meta name="twitter:image" content="https://www.krish.gg/og.jpg" />
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
      <ul className="grid grid-cols-12 gap-4">
        {allPostsData.map(({ id, date, title, description }) => (
          <li key={id} className="contents">
            <div className="text-md col-span-4 font-mono text-neutral-800 md:col-span-2 dark:text-white dark:opacity-65">
              {formatDateDigits(date)}
            </div>
            <Link
              href={`/blog/${id}`}
              className="col-span-8 underline decoration-neutral-500 transition-all hover:decoration-black md:col-span-9 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
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
