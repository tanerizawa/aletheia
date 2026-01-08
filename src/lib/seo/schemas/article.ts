/**
 * Generate Article JSON-LD Schema
 * Untuk Rich Snippets di Google Search Results
 */

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  url: string;
  keywords?: string[];
  articleBody?: string;
  wordCount?: number;
}

export function generateArticleSchema(props: ArticleSchemaProps) {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    authorUrl,
    publisherName = 'PT Academos Pustaka Demokrasi',
    publisherLogo = 'https://academos.or.id/logo.svg',
    url,
    keywords,
    articleBody,
    wordCount,
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl || 'https://academos.or.id/tentang',
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
        width: 200,
        height: 67,
      },
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    ...(articleBody && { articleBody }),
    ...(wordCount && { wordCount }),
    inLanguage: 'id-ID',
    isAccessibleForFree: true,
  };
}

/**
 * Generate BlogPosting Schema (subtype of Article)
 * Digunakan untuk blog post yang lebih informal
 */
export function generateBlogPostingSchema(props: ArticleSchemaProps) {
  const baseSchema = generateArticleSchema(props);
  return {
    ...baseSchema,
    '@type': 'BlogPosting',
  };
}
