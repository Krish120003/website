import Link from "next/link";
import { type PostMetadataType, getSortedPostsData } from "../../lib/posts";
import { Layout } from "~/components/Layout";
import { format } from "date-fns";
import Head from "next/head";

interface BlogProps {
  allPostsData: PostMetadataType[];
}

export default function Blog({ allPostsData }: BlogProps) {
  return (
    <Layout blog>
      <Head>
        <title>krish's blog</title>
      </Head>
      <h1 className="text-lg text-neutral-800 dark:text-neutral-100">
        Krish&apos;s Blog
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        I make occasional posts about what I&apos;m learning
      </p>
      <ul className="space-y-8 pt-8">
        {allPostsData.map(({ id, date, title, description }) => (
          <li key={id} className="transition-all">
            <Link
              href={`/blog/${id}`}
              className="underline decoration-neutral-500 transition-all hover:decoration-black dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
            >
              {title}
            </Link>
            <div className="text-md text-neutral-800 dark:text-white dark:opacity-65">
              {format(date, "LLL d, y")}
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
