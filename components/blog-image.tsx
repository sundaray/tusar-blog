import Image from "next/image";

type BlogImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function BlogImage({
  src,
  alt,
  width,
  height,
  caption,
}: BlogImageProps) {
  return (
    <figure className="my-6 flex flex-col items-center">
      <Image src={src} alt={alt} width={width} height={height} />
      {caption && (
        <figcaption className="text-muted-foreground mt-4 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
