import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Solo consideramos 'production' cuando estamos oficialmente en el entorno de producción de Vercel.
  // Así, tanto los enlaces de prueba (preview) como el servidor local (dev) bloquearán a los buscadores.
  const isProduction = process.env.VERCEL_ENV === 'production'
  
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: 'https://kailab.com.co/sitemap.xml',
    }
  }

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
