import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { InferGetStaticPropsType } from "next";
import { Layout } from "~/components/Layout";
import { format } from "date-fns";
export default function Post({
  postData: { title, date, contentHtml, readTime },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`krish's blog • ${title}`}</title>
      </Head>
      <Layout blog>
        <div className="">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          <div className="py-1 text-sm dark:opacity-80">
            Published {format(date, "LLL d, y")} • {readTime} minute read
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="prose-md prose prose-neutral w-full max-w-none pt-8 dark:prose-invert [&>p>img]:m-auto"
          />
        </div>
      </Layout>
    </>
  );
}

interface Params {
  id: string;
}

export async function getStaticProps({ params }: { params: Params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
