/**
 * Generate Book JSON-LD Schema
 * Untuk Rich Snippets di Google Search, Google Books integration
 */

export interface BookSchemaProps {
  name: string;
  author: string | string[];
  description?: string;
  image?: string;
  isbn?: string;
  publisher?: string;
  publishDate?: string;
  numberOfPages?: number;
  inLanguage?: string;
  genre?: string | string[];
  url: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export function generateBookSchema(props: BookSchemaProps) {
  const {
    name,
    author,
    description,
    image,
    isbn,
    publisher,
    publishDate,
    numberOfPages,
    inLanguage = 'id',
    genre,
    url,
    availability = 'InStock',
  } = props;

  // Handle multiple authors
  const authorData = Array.isArray(author)
    ? author.map(name => ({ '@type': 'Person', name }))
    : { '@type': 'Person', name: author };

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name,
    author: authorData,
    ...(description && { description }),
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
    ...(isbn && { isbn }),
    ...(publisher && {
      publisher: {
        '@type': 'Organization',
        name: publisher,
      },
    }),
    ...(publishDate && { datePublished: publishDate }),
    ...(numberOfPages && { numberOfPages }),
    inLanguage,
    ...(genre && { genre: Array.isArray(genre) ? genre : [genre] }),
    url,
    offers: {
      '@type': 'Offer',
      availability: `https://schema.org/${availability}`,
      price: '0',
      priceCurrency: 'IDR',
      itemCondition: 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'Organization',
        name: 'Rumah Aletheia',
      },
    },
  };
}

/**
 * Generate BookCollection schema for catalog/collection pages
 */
export interface BookCollectionProps {
  name: string;
  description: string;
  url: string;
  books: BookSchemaProps[];
}

export function generateBookCollectionSchema(props: BookCollectionProps) {
  const { name, description, url, books } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Collection',
    name,
    description,
    url,
    collectionSize: books.length,
    itemListElement: books.map((book, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: generateBookSchema(book),
    })),
  };
}
