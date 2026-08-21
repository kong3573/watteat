import { MetadataRoute } from 'next';
import { MENUS_DATA } from '@/data/menus';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://watteat.shop';

  const menuUrls = MENUS_DATA.map((menu) => ({
    url: `${baseUrl}/menu/${menu.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...menuUrls,
  ];
}
