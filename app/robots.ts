import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/',
        '/admin/',
        '/checkout/',
        '/pago/',
        '/pedidos/',
        '/carrito/',
      ],
    },
    sitemap: 'https://kailab.com.co/sitemap.xml',
  }
}
