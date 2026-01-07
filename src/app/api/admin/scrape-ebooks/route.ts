import { NextRequest, NextResponse } from 'next/server';
import { load } from 'cheerio';

interface ScrapedEbook {
  title: string;
  author: string;
  publisher?: string;
  year?: string;
  coverImage?: string;
  fileUrl?: string;
  category?: string;
  isbn?: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Fetch HTML dari URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = load(html);

    const ebooks: ScrapedEbook[] = [];

    // Parse berdasarkan struktur HTML sebenarnya: col-md-4 > card > card-body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $('.col-md-4 .card').each((_index: number, element: any) => {
      const $el = $(element);
      const $body = $el.find('.card-body');
      
      // Extract title dari h4.mb-1
      const title = $body.find('h4.mb-1').first().text().trim();
      
      // Extract data dari p.text-muted (format: "Pengarang: xxx<br>Penerbit: xxx<br>...")
      const textMuted = $body.find('p.text-muted').html() || '';
      
      // Parse pengarang
      const authorMatch = textMuted.match(/Pengarang:\s*([^<]+)/i);
      const author = authorMatch ? $('<div>').html(authorMatch[1]).text().trim() : 'Unknown';
      
      // Parse penerbit
      const publisherMatch = textMuted.match(/Penerbit:\s*([^<]+)/i);
      const publisher = publisherMatch ? publisherMatch[1].trim() : undefined;
      
      // Parse kategori (bukan "Jenis")
      const categoryMatch = textMuted.match(/Kategori:\s*([^<]+)/i);
      const category = categoryMatch ? categoryMatch[1].trim() : undefined;
      
      // Extract cover image
      const coverImage = $body.find('img').first().attr('src');
      
      // Extract link baca buku (untuk mendapatkan ID buku)
      const readLink = $body.find('a[href*="baca-buku"]').first().attr('href');
      const downloadLink = $body.find('a[href*="unduh"]').first().attr('href');
      
      // Extract ID buku dari URL untuk fileUrl
      const bookIdMatch = readLink?.match(/baca-buku\/(\d+)/);
      const bookId = bookIdMatch ? bookIdMatch[1] : undefined;

      if (title) {
        ebooks.push({
          title,
          author,
          publisher,
          coverImage: coverImage ? (coverImage.startsWith('http') ? coverImage : `http://103.44.149.34${coverImage}`) : undefined,
          fileUrl: downloadLink ? (downloadLink.startsWith('http') ? downloadLink : `http://103.44.149.34${downloadLink}`) : undefined,
          category,
          // Year dan ISBN tidak tersedia di struktur HTML ini
          year: undefined,
          isbn: undefined,
          description: undefined,
        });
      }
    });

    return NextResponse.json({
      success: true,
      ebooks,
      count: ebooks.length,
      url,
    });

  } catch (error: unknown) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Scraping failed',
        ebooks: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
