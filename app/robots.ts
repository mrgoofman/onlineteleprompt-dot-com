import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/scripts/', '/prompter/', '/settings/'],
    },
    sitemap: 'https://teleprompter24.com/sitemap.xml',
  }
}
