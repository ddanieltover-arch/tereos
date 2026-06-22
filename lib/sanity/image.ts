import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function getImageUrl(
  source: Parameters<typeof builder.image>[0] | null | undefined,
  fallback?: string,
  width = 1200
): string {
  if (source) {
    return urlForImage(source).width(width).auto('format').url();
  }
  return fallback || '';
}
