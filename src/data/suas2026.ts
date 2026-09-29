// Photos for the SUAS 2026 page (/projects/suas-2026).
// Drop image files into `public/images/suas-2026/` and list them here, e.g.
//   { src: "/images/suas-2026/flightline.jpg", caption: "On the flightline before our mission" },
// While this list is empty, the page shows placeholder frames.
export type Photo = { src: string; caption: string };

export const suasPhotos: Photo[] = [];

// How many placeholder frames to show while `suasPhotos` is empty.
export const placeholderCount = 4;
