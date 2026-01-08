/**
 * JSON-LD Script Component
 * Utility untuk inject JSON-LD structured data ke dalam pages
 */

export interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Component untuk render JSON-LD script tag
 * Usage: <JsonLd data={schemaObject} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Helper function untuk multiple schemas
 * Usage: <JsonLd data={combineSchemas([schema1, schema2])} />
 */
export function combineSchemas(schemas: Record<string, any>[]) {
  if (schemas.length === 1) {
    return schemas[0];
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
