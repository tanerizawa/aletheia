import { organization } from '@/data/organization';
import { socialMedia } from '@/data/navigation';

/**
 * Generate Organization & LocalBusiness JSON-LD Schema
 * Untuk Google Knowledge Panel, Rich Snippets, dan Local SEO
 */
export function generateOrganizationSchema() {
  const sameAs = socialMedia.map(social => social.href);

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Library', 'LocalBusiness'],
    '@id': 'https://academos.or.id/#organization',
    name: organization.name,
    alternateName: [
      'Rumah Aletheia',
      'Aletheia Library',
      'PT Academos Pustaka Demokrasi'
    ],
    legalName: organization.legal,
    url: 'https://academos.or.id',
    logo: {
      '@type': 'ImageObject',
      url: 'https://academos.or.id/logo.svg',
      width: 200,
      height: 67,
    },
    image: 'https://academos.or.id/og-home.jpg',
    description: 'Perpustakaan komunitas dengan 8,000+ koleksi buku, layanan penelitian, penerbitan, dan program literasi. Ekosistem lengkap untuk demokratisasi pengetahuan di Karawang.',

    // Contact Information
    email: organization.contact.email,
    telephone: organization.contact.phone,

    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: organization.address.street,
      addressLocality: organization.address.district,
      addressRegion: organization.address.regency,
      postalCode: organization.address.postalCode,
      addressCountry: 'ID',
    },

    // Geographic coordinates (untuk local SEO)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.298641, // Approximate coordinates for Karawang
      longitude: 107.302361,
    },

    // Area served
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -6.298641,
        longitude: 107.302361,
      },
      geoRadius: '50000', // 50km radius
    },

    // Business hours (sesuaikan dengan jam operasional)
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      }
    ],

    // Social media profiles
    sameAs,

    // Founding date
    foundingDate: `${organization.established}-01-01`,

    // Organization type
    organizationType: 'Educational Organization',

    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Perpustakaan',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Layanan Perpustakaan',
            description: '8,000+ koleksi buku untuk peminjaman',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Penelitian Sosial',
            description: 'Layanan penelitian sosial, humaniora, psikologi, dan sejarah',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Penerbitan Buku',
            description: 'Penerbitan buku, jurnal, dan media digital',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Program Literasi',
            description: 'Workshop, bedah buku, dan kegiatan literasi rutin',
          },
        },
      ],
    },

    // Founder
    founder: {
      '@type': 'Person',
      name: 'Odang',
      jobTitle: 'Direktur',
    },

    // Number of employees (optional)
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 10,
    },

    // Slogan
    slogan: 'Democratizing knowledge through literacy',

    // Publisher for content
    publishingPrinciples: 'https://academos.or.id/tentang/aletheia',
  };
}
