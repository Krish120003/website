import fs from "fs";
import path from "path";
import matter from "gray-matter";
import z from "zod";

import { unified } from "unified";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";

const postsDirectory = path.join(process.cwd(), "posts");

const postMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
});

const postMetadataWithId = postMetadataSchema.extend({
  id: z.string(),
});

const postSchema = postMetadataWithId.extend({
  contentHtml: z.string(),
  readTime: z.number(),
});

export type PostMetadataType = z.infer<typeof postMetadataWithId>;
export type PostType = z.infer<typeof postSchema>;

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...postMetadataSchema.parse(matterResult.data),
    };
  });
  // Sort posts by date
  return postMetadataWithId.array().parse(
    allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    }),
  );
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const readTime = Math.ceil(contentHtml.split(" ").length / 200);

  // Combine the data with the id and contentHtml
  return postSchema.parse({
    id,
    contentHtml,
    readTime,
    ...matterResult.data,
  });
}
