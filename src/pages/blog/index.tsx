import Link from "next/link";
import { type PostMetadataType, getSortedPostsData } from "../../lib/posts";
import { Layout } from "~/components/Layout";
import Head from "next/head";
import { formatDate } from "~/lib/utils";

interface BlogProps {
  allPostsData: PostMetadataType[];
}

export default function Blog({ allPostsData }: BlogProps) {
  return (
    <Layout back>
      <Head>
        <title>krish&apos;s blog</title>
      </Head>
      <div>
        <div className="text-lg text-neutral-800 opacity-70 dark:text-neutral-100">
          Krish&apos;s Blog
        </div>
        <p className="text-neutral-600 opacity-70 dark:text-neutral-400">
          I make occasional posts about what I&apos;m learning
        </p>
        <hr className="m-auto my-4 border-neutral-400 dark:border-white dark:opacity-10" />
      </div>
      <ul className="space-y-8">
        {allPostsData.map(({ id, date, title, description }) => (
          <li key={id} className="transition-all">
            <Link
              href={`/blog/${id}`}
              className="underline decoration-neutral-500 transition-all hover:decoration-black dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
            >
              {title}
            </Link>
            <div className="text-md text-neutral-800 dark:text-white dark:opacity-65">
              {formatDate(date)}
            </div>
            <p className="dark:text-neutral-300">{description}</p>
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
