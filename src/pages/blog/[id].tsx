import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { InferGetStaticPropsType } from "next";
import { Layout } from "~/components/Layout";
import { formatDate, formatDateISO } from "~/lib/utils";
import Link from "next/link";
import { BlogPosting, BreadcrumbList } from "schema-dts";
import { WithContext } from "schema-dts";
import { jsonLdPerson } from "../_app";
import { jsonLdWebSite } from "../_app";

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

  const jsonLdBlogPosting: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: title,
    headline: title,
    url: `${hostUrl}/blog/${id}`,
    author: jsonLdPerson,
    publisher: jsonLdPerson,
    isPartOf: jsonLdWebSite,
    mainEntityOfPage: jsonLdWebSite,
    datePublished: formatDateISO(date),
    dateModified: formatDateISO(date),
    description: description,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    image: ogImageUrl,
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${hostUrl}/blog/${id}`,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{`krish's blog • ${title}`}</title>
        <meta property="description" content={description} />
        <meta property="og:title" content={`krish's blog • ${title}`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${hostUrl}/blog/${id}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="krish.gg" />
        <meta property="twitter:url" content={`${hostUrl}/blog/${id}`} />
        <meta property="twitter:description" content={description} />

        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />

        {/* meta images */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="twitter:image" content={ogImageUrl} />

        <script
          type="application/ld+json"
          id="jsonLdBlogPosting"
          key="jsonLdBlogPosting"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBlogPosting),
          }}
        />
        <script
          type="application/ld+json"
          id="jsonLdBreadcrumbList"
          key="jsonLdBreadcrumbList"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBreadcrumbList),
          }}
        />
      </Head>
      {/* <ScrollToTopButton /> */}
      <Layout blog back sticky>
        <div className="m-auto grid w-auto max-w-2xl grid-cols-1 gap-4  lg:max-w-none lg:grid-cols-3">
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
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="prose-md prose prose-neutral col-span-2 m-auto w-full dark:prose-invert [&>p>img]:m-auto"
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
