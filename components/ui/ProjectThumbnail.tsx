"use client";

import Image from "next/image";
import { useState } from "react";
import ProjectArt from "./ProjectArt";

type Props = {
  slug: string;
  thumbnail: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function ProjectThumbnail({ slug, thumbnail, alt, className = "", priority = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ProjectArt slug={slug} className={`absolute inset-0 size-full ${className}`} />;
  }

  return (
    <Image
      src={thumbnail}
      alt={alt}
      fill
      priority={priority}
      unoptimized
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 720px"
      className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
