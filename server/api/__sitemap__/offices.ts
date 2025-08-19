import type { ImageEntry, SitemapUrlInput } from '#sitemap/types';

import { defineSitemapEventHandler } from '#imports';
import { PrismaProvider } from '~~/server/services';

export default defineSitemapEventHandler(async () => {
  const offices = await PrismaProvider.instance.office.findMany({
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return offices.map((office): SitemapUrlInput => ({
    _sitemap: 'offices',
    changefreq: 'daily',
    images: office.photos.map((photo, index): ImageEntry => ({
      caption: photo.alt ?? `Photo de ${office.title} - ${index + 1}`,
      loc: photo.url,
      title: office.title,
    })),
    lastmod: office.updatedAt.toISOString(),
    loc: `/offices/${office.slug}`,
  }));
});
