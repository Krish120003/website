import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Layout } from "~/components/Layout";
import { format } from "date-fns";
export default function Post({
  postData: { title, id, date, contentHtml, readTime },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout blog>
        <div className="">
          <h1 className="text-xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          <div className="py-1 text-sm dark:text-neutral-400">
            Published {format(date, "LLL d, y")} • {readTime} minute read
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="prose-md prose prose-neutral w-full max-w-none pt-8 dark:prose-invert"
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
