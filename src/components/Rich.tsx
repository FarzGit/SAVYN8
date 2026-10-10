import { Fragment } from "react";

/** Renders copy where `*word*` becomes the accent serif italic. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className="accent">
            {p.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain-text version for metadata and aria labels. */
export const plain = (text: string) => text.replace(/\*/g, "");
