import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// const interRegular = fetch(
//   new URL("../../../public/fonts/Inter-Regular.ttf", import.meta.url),
// ).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("../../../public/fonts/LibreCaslonText-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  try {
    const [interBoldD] = await Promise.all([
      //   interRegular,
      interBold,
    ]);

    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "krish's blog";

    const hasPublishTime = searchParams.has("publishTime");
    const publishTime = hasPublishTime
      ? searchParams.get("publishTime")?.slice(0, 100)
      : "";

    const hasReadingTime = searchParams.has("readingTime");
    const readingTime = hasReadingTime
      ? searchParams.get("readingTime")?.slice(0, 100)
      : "";

    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 400)
      : "";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#171717",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "left",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "column",
            flexWrap: "nowrap",
            padding: "4em",
          }}
        >
          <div
            style={{
              //   backgroundColor: "#ff0000",
              display: "flex",
              flexDirection: "column",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   justifyItems: "center",
              color: "white",
            }}
          >
            <h1
              style={{
                // fontWeight: "bold",
                fontSize: "4em",
                fontFamily: "sans-serif",
                margin: "0",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "2em",
                opacity: 0.45,
              }}
            >
              {description}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "normal",
            }}
          >
            <p
              style={{
                margin: "0",
                fontFamily: "unset",
                color: "white",
                opacity: 0.75,
                fontSize: "1.5em",
              }}
            >
              {publishTime}
            </p>
            <p
              style={{
                margin: "0",
                fontFamily: "sans-serif",
                color: "white",
                opacity: 0.75,
                fontSize: "1.5em",
              }}
            >
              {readingTime} minute read
            </p>
            <p
              style={{
                margin: "0",
                fontFamily: "sans-serif",
                color: "white",
                opacity: 0.75,
                fontSize: "1.5em",
              }}
            >
              krish&apos;s blog • krishkrish.com
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          //   {
          //     name: "Inter",
          //     data: interRegularD,
          //     style: "normal",
          //     weight: 400,
          //   },
          {
            name: "Inter",
            data: interBoldD,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log("Error", e);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
