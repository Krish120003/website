import type { GetServerSideProps } from "next";
import { generateRssFeed } from "~/lib/rss";

export default function RssFeed() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rss = await generateRssFeed();

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.write(rss);
  res.end();

  return {
    props: {},
  };
};
