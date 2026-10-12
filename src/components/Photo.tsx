import type { PhotoAsset } from "@/content/photos";

/**
 * Photo that fills its (relatively positioned) parent; give the parent a size or aspect ratio.
 * Lazy by default; pass `priority` for above-the-fold images.
 */
export function Photo({
  photo,
  className = "",
  priority = false,
  decorative = false,
  sizes = "100vw",
}: {
  photo: PhotoAsset;
  className?: string;
  priority?: boolean;
  /** true when nearby text already says what the photo shows */
  decorative?: boolean;
  /** Rendered width hint so the browser picks the right file from srcSet */
  sizes?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      alt={decorative ? "" : photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}

