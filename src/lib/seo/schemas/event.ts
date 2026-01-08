import { organization } from '@/data/organization';

/**
 * Generate Event JSON-LD Schema
 * Untuk tampil di Google Events, Google Calendar, dan Rich Snippets
 */

export interface EventSchemaProps {
  name: string;
  description: string;
  image: string;
  startDate: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
  location?: {
    name: string;
    address?: string;
  };
  url: string;
  organizer?: string;
  eventStatus?: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
  eventAttendanceMode?: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
  isAccessibleForFree?: boolean;
  maximumAttendeeCapacity?: number;
}

export function generateEventSchema(props: EventSchemaProps) {
  const {
    name,
    description,
    image,
    startDate,
    endDate,
    location,
    url,
    organizer = organization.name,
    eventStatus = 'EventScheduled',
    eventAttendanceMode = 'OfflineEventAttendanceMode',
    isAccessibleForFree = true,
    maximumAttendeeCapacity,
  } = props;

  // Default location ke alamat perpustakaan
  const eventLocation = location || {
    name: 'Rumah Aletheia',
    address: `${organization.address.street}, ${organization.address.village}, ${organization.address.district}, ${organization.address.regency}`,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    startDate,
    ...(endDate && { endDate }),
    eventStatus: `https://schema.org/${eventStatus}`,
    eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`,
    location: {
      '@type': 'Place',
      name: eventLocation.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: eventLocation.address || organization.address.street,
        addressLocality: organization.address.district,
        addressRegion: organization.address.regency,
        postalCode: organization.address.postalCode,
        addressCountry: 'ID',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: organizer,
      url: 'https://academos.or.id',
    },
    url,
    isAccessibleForFree,
    ...(maximumAttendeeCapacity && { maximumAttendeeCapacity }),
    inLanguage: 'id-ID',
  };
}

/**
 * Generate multiple events schema for event listings
 */
export function generateEventListSchema(events: EventSchemaProps[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: generateEventSchema(event),
    })),
  };
}
