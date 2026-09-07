'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';

type Props = {
  src: string;
  alt?: string;
  thumbHeight?: number;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  thumbnailFit?: 'cover' | 'contain';
  thumbnailPosition?: string;
};

export default function ImageLightbox({
  src,
  alt = 'Image',
  thumbHeight,
  aspectRatio = '16/9',
  priority = false,
  sizes = '(max-width: 900px) 100vw, 66vw',
  thumbnailFit = 'cover',
  thumbnailPosition = 'center',
}: Props) {
  const { locale } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const shouldSkipOptimization = src.startsWith('data:') || src.startsWith('blob:');

  const openLabel = `${locale === 'fr' ? "Agrandir l'image" : 'Open image'} : ${alt}`;
  const closeLabel = locale === 'fr' ? 'Fermer' : 'Close';

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="lightbox-thumbnail"
        style={thumbHeight ? { height: thumbHeight } : { aspectRatio }}
        onClick={() => setIsOpen(true)}
        aria-label={openLabel}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized={shouldSkipOptimization}
          style={{ objectFit: thumbnailFit, objectPosition: thumbnailPosition }}
          priority={priority}
        />
      </button>

      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        aria-label={`${locale === 'fr' ? 'Aperçu agrandi' : 'Enlarged preview'} : ${alt}`}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={() => dialogRef.current?.close()}
          aria-label={closeLabel}
          title={closeLabel}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {isOpen && (
          <div className="lightbox-image">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              unoptimized={shouldSkipOptimization}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </dialog>
    </>
  );
}
