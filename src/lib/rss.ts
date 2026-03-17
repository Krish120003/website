import { Feed } from "feed";
import { getPostData, getSortedPostsData } from "~/lib/posts";

const SITE_URL = "https://krish.gg";
const RSS_URL = `${SITE_URL}/rss.xml`;

export async function generateRssFeed() {
  const feed = new Feed({
    id: SITE_URL,
    link: SITE_URL,
    title: "Krish's Blog",
    description: "I make occasional posts about what I'm learning",
    language: "en",
    favicon: `${SITE_URL}/favicon.ico`,
    image: `${SITE_URL}/og.jpg`,
    copyright: `All rights reserved ${new Date().getUTCFullYear()}, Krish`,
    feedLinks: {
      rss2: RSS_URL,
    },
    author: {
      name: "Krish",
      link: SITE_URL,
    },
  });

  const posts = getSortedPostsData().filter((post) => !post.hidden);
  const postsWithContent = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      ...(await getPostData(post.id)),
    })),
  );

  for (const post of postsWithContent) {
    const url = `${SITE_URL}/blog/${post.id}`;

    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.description,
      content: post.contentHtml,
      author: [
        {
          name: "Krish",
          link: SITE_URL,
          email: "hello@krishkrish.com",
        },
      ],
      date: new Date(post.date),
    });
  }

  return feed.rss2();
}
