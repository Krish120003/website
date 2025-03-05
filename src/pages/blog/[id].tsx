import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { InferGetStaticPropsType } from "next";
import { Layout } from "~/components/Layout";
import { formatDate } from "~/lib/utils";
import Link from "next/link";

function Author() {
  return (
    <Link className="-mb-4 lg:mt-32 " href="/">
      <div className="max-w-full rounded-xl border border-neutral-400 bg-neutral-50 p-4 dark:border-white/10 dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <img
            src="/me.jpg"
            alt="Author photo"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="font-serif-display text-lg font-medium">Krish</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              CS @ McMaster
              <br />
              looking for summer internships
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Post({
  postData: {
    title,
    date,
    contentHtml,
    readTime,
    description,
    id,
    tableOfContents,
  },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const publishDateFormatted = formatDate(date);

  const hostUrl = "https://krish.gg";
  // const hostUrl = "http://localhost:3000";

  const escapedTitle = encodeURIComponent(title);
  const escapedDescription = encodeURIComponent(description);
  const escapedPublishDate = encodeURIComponent(publishDateFormatted);
  const escapedReadTime = encodeURIComponent(readTime);

  const ogImageUrl = `${hostUrl}/api/og?title=${escapedTitle}&description=${escapedDescription}&publishTime=${escapedPublishDate}&readingTime=${escapedReadTime}`;

  return (
    <>
      <Head>
        <title>{`krish's blog • ${title}`}</title>
        <meta property="description" content={description} />
        <meta property="og:title" content={`krish's blog • ${title}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://krish.gg/blog/${id}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="krish.gg" />
        <meta property="twitter:url" content={`https://krish.gg/blog/${id}`} />
        <meta property="twitter:description" content={description} />

        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />

        {/* meta images */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="twitter:image" content={ogImageUrl} />
      </Head>
      {/* <ScrollToTopButton /> */}
      <Layout blog back>
        <div className="grid grid-cols-1 gap-4  lg:grid-cols-3">
          <div className="top-28 col-span-1 self-baseline py-4 lg:sticky">
            <h1 className="text-balance font-serif-display text-4xl font-semibold leading-tight tracking-tight">
              {title}
            </h1>
            <div className="py-2 font-serif dark:opacity-80">
              {publishDateFormatted} • {readTime} minute read 
            </div>

            {tableOfContents && tableOfContents.length > 60 && (
              <aside className="lg:py-4">
                <span className="font-serif opacity-80">Table of Contents</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: tableOfContents,
                  }}
                ></div>
              </aside>
            )}
            <hr className="m-auto my-4 border-neutral-400 lg:hidden dark:border-white dark:opacity-10" />

            <div className="-mb-4 mt-32 hidden lg:block ">
              <Author />
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="prose-md prose prose-neutral col-span-2 m-auto w-full dark:prose-invert [&>p>img]:m-auto"
          />
          <div className="lg:hidden">
            <Author />
          </div>
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
