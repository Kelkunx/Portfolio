import Box from '@mui/material/Box';
import Image from 'next/image';
import type { ContentLocale } from '../../lib/content';
import { projectPlaceholderDataUrl } from '../../lib/project-placeholder';

type ProjectThumbnailProps = {
  src?: string;
  alt?: string;
  title: string;
  locale: ContentLocale;
  priority?: boolean;
  sizes: string;
  aspectRatio?: string;
  className?: string;
};

export default function ProjectThumbnail({
  src,
  alt,
  title,
  locale,
  priority = false,
  sizes,
  aspectRatio = '16 / 10',
  className,
}: ProjectThumbnailProps) {
  const imageSrc = src?.trim() ? src : projectPlaceholderDataUrl(title, locale);
  const shouldSkipOptimization = imageSrc.startsWith('data:') || imageSrc.startsWith('blob:');

  return (
    <Box
      className={['project-thumbnail', className].filter(Boolean).join(' ')}
      sx={{ position: 'relative', aspectRatio }}
    >
      <Image
        src={imageSrc}
        alt={alt ?? title}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={shouldSkipOptimization}
        className="project-thumbnail-image"
      />
    </Box>
  );
}
