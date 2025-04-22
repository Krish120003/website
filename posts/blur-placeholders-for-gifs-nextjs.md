---
title: Blur Placeholders for GIFs in Next.js
date: "2025-04-21"
description: "Next.js only supports blur placeholders for static imgs, so we can use that to create a blur placeholder for GIFs."
micro: true
---

Next.js supports [blur placeholders](https://nextjs.org/docs/app/building-your-application/optimizing/images#blur-placeholder) for static images, but not for GIFs. However, we can use the same technique to create a blur placeholder for GIFs.

Next.js support auto-generating blur hashes on static image imports, such as

```ts
import myPng from "../public/my.png";

function MyComponent() {
    ...
      <Image src={myPng} .../>
    ...
}
```

This import is typed as `StaticImageData`, which has a `blurDataURL` property.

```ts
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
```

With GIF's, the `blurDataURL` is `undefined`. However, if we just save one frame of the GIF as a PNG/JPEG, we can just use static imports for both, and use the `blurDataURL` from the JPEG as the placeholder for the GIF.

```ts
import myGif from "../public/my.gif";
import myPng from "../public/my.png";

const myImg = {
  ...myGif,
  blurDataURL: myPng.blurDataURL,
};

function MyComponent() {
    ...
      <Image src={myImg} .../>
    ...
}
```

This way, we can use the `blurDataURL` from the static image import as the placeholder for the GIF. The GIF will be loaded as usual, and the static image will be used as a placeholder until the GIF is fully loaded.

This simple hack is especially useful for those large GIFs that take a while to load.

Thanks for reading! Questions? Feel free to message me on [Twitter](https://twitter.com/n0tkr1sh)!
