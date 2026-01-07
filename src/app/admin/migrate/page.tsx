'use client';

import { useState } from 'react';

interface EbookPreview {
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

export default function MigratePage() {
  const [baseUrl, setBaseUrl] = useState('http://103.44.149.34/elib/halaman/buku/90');
  const [totalBooks, setTotalBooks] = useState(168);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [scrapedData, setScrapedData] = useState<EbookPreview[]>([]);
  const [importedCount, setImportedCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('id-ID');
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const calculatePages = () => {
    const perPage = 12;
    return Math.ceil(totalBooks / perPage);
  };

  const generateUrls = () => {
    const urls = [baseUrl];
    const perPage = 12;
    const totalPages = Math.ceil(totalBooks / perPage);
    
    for (let i = 1; i < totalPages; i++) {
      urls.push(`${baseUrl}?start=${i * perPage}`);
    }
    
    return urls;
  };

  const scrapeEbooks = async () => {
    setIsLoading(true);
    setProgress(0);
    setStatus('Memulai scraping...');
    setScrapedData([]);
    setErrors([]);

    const urls = generateUrls();
    const allEbooks: EbookPreview[] = [];

    try {
      for (let i = 0; i < urls.length; i++) {
        setStatus(`Scraping halaman ${i + 1} dari ${urls.length}...`);
        
        const response = await fetch('/api/admin/scrape-ebooks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urls[i] }),
        });

        if (!response.ok) {
          const error = `Gagal scrape ${urls[i]}: ${response.statusText}`;
          setErrors(prev => [...prev, error]);
          continue;
        }

        const data = await response.json();
        allEbooks.push(...data.ebooks);
        
        setProgress(Math.round(((i + 1) / urls.length) * 100));
      }

      setScrapedData(allEbooks);
      setStatus(`Berhasil scraping ${allEbooks.length} buku dari ${urls.length} halaman`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setStatus('Error: ' + errorMsg);
      setErrors(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const importToDatabase = async () => {
    if (scrapedData.length === 0) {
      alert('Tidak ada data untuk diimport. Lakukan scraping terlebih dahulu.');
      return;
    }

    if (!confirm(`Import ${scrapedData.length} buku ke database?`)) {
      return;
    }

    setIsLoading(true);
    setStatus('Mengimport ke database...');
    setImportedCount(0);

    try {
      const response = await fetch('/api/admin/import-ebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ebooks: scrapedData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Import gagal');
      }

      setImportedCount(result.imported || 0);
      setStatus(`Berhasil import ${result.imported} buku ke database`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setStatus('Error import: ' + errorMsg);
      setErrors(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDFs = async () => {
    if (!confirm('Download semua file PDF dari sistem lama? Ini akan memakan waktu lama.')) return;
    
    setIsLoading(true);
    setLogs([]);
    setStatus('Memulai download PDF files...');
    addLog('🚀 Memulai proses download PDF');
    addLog('⏳ Mengambil daftar ebook dari database...');
    
    try {
      // Get total count first
      addLog('📊 Menghitung total ebook yang perlu di-download...');
      
      const response = await fetch('/api/admin/download-pdf-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // No limit, download all
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Download gagal');
      }

      // Check if no files to download
      if (result.results.total === 0) {
        addLog('ℹ️ Tidak ada file PDF yang perlu di-download');
        addLog('✅ Semua file PDF sudah tersimpan secara lokal');
        setStatus('✅ Semua PDF sudah di-download sebelumnya');
      } else {
        addLog(`✅ Berhasil download ${result.results.downloaded} PDF dari ${result.results.total} total`);
        if (result.results.updated.length > 0) {
          addLog(`📝 Updated files:`);
          result.results.updated.slice(0, 5).forEach((title: string) => {
            addLog(`   ✓ ${title}`);
          });
          if (result.results.updated.length > 5) {
            addLog(`   ... dan ${result.results.updated.length - 5} lainnya`);
          }
        }
        
        if (result.results.failed.length > 0) {
          addLog(`❌ Gagal: ${result.results.failed.length} files`);
          setErrors(result.results.failed.slice(0, 10));
          result.results.failed.slice(0, 3).forEach((error: string) => {
            addLog(`   ✗ ${error}`);
          });
        }
        
        setStatus(`✅ Selesai! Downloaded ${result.results.downloaded}/${result.results.total} PDFs`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      addLog(`❌ ERROR: ${errorMsg}`);
      setStatus('Error download PDFs: ' + errorMsg);
      setErrors(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractCovers = async () => {
    if (!confirm('Extract cover images dari PDF atau download dari sistem lama?')) return;
    
    setIsLoading(true);
    setLogs([]);
    setStatus('Memulai extract/download covers...');
    addLog('🚀 Memulai proses extract cover images');
    addLog('⏳ Mengambil daftar ebook tanpa cover...');
    
    try {
      addLog('📊 Memproses cover images...');
      
      const response = await fetch('/api/admin/extract-covers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Extract gagal');
      }

      // Check if no covers to extract
      if (result.results.total === 0) {
        addLog('ℹ️ Tidak ada cover yang perlu di-download/extract');
        addLog('✅ Semua cover sudah tersimpan secara lokal');
        setStatus('✅ Semua covers sudah di-download sebelumnya');
      } else {
        addLog(`✅ Berhasil extract ${result.results.extracted} covers dari ${result.results.total} total`);
        if (result.results.updated.length > 0) {
          addLog(`📝 Updated covers:`);
          result.results.updated.slice(0, 5).forEach((title: string) => {
            addLog(`   ✓ ${title}`);
          });
          if (result.results.updated.length > 5) {
            addLog(`   ... dan ${result.results.updated.length - 5} lainnya`);
          }
        }
        
        if (result.results.failed.length > 0) {
          addLog(`❌ Gagal: ${result.results.failed.length} covers`);
          setErrors(result.results.failed.slice(0, 10));
          result.results.failed.slice(0, 3).forEach((error: string) => {
            addLog(`   ✗ ${error}`);
          });
        }
      }
      
      setStatus(`✅ Selesai! Extracted ${result.results.extracted}/${result.results.total} covers`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      addLog(`❌ ERROR: ${errorMsg}`);
      setStatus('Error extract covers: ' + errorMsg);
      setErrors(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractPdfCovers = async () => {
    if (!confirm('Extract cover dari halaman pertama PDF untuk semua ebook? Ini akan menimpa cover yang ada.')) return;
    
    setIsLoading(true);
    setLogs([]);
    setStatus('Memulai extract cover dari PDF...');
    addLog('🚀 Memulai proses extract cover dari PDF');
    addLog('📄 Mengambil halaman pertama sebagai cover...');
    
    try {
      addLog('🖼️ Memproses PDF covers (quality: 90%, size: 600x800)...');
      
      const response = await fetch('/api/admin/extract-pdf-covers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Extract gagal');
      }

      if (result.results.total === 0) {
        addLog('ℹ️ Tidak ada PDF yang perlu di-extract');
        setStatus('✅ Tidak ada PDF lokal untuk di-extract');
      } else {
        addLog(`✅ Berhasil extract ${result.results.extracted} covers dari ${result.results.total} PDFs`);
        if (result.results.updated.length > 0) {
          addLog(`📝 Updated covers:`);
          result.results.updated.slice(0, 5).forEach((title: string) => {
            addLog(`   ✓ ${title}`);
          });
          if (result.results.updated.length > 5) {
            addLog(`   ... dan ${result.results.updated.length - 5} lainnya`);
          }
        }
        
        if (result.results.failed.length > 0) {
          addLog(`❌ Gagal: ${result.results.failed.length} covers`);
          setErrors(result.results.failed.slice(0, 10));
          result.results.failed.slice(0, 3).forEach((error: string) => {
            addLog(`   ✗ ${error}`);
          });
        }
      }
      
      setStatus(`✅ Selesai! Extracted ${result.results.extracted}/${result.results.total} PDF covers`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      addLog(`❌ ERROR: ${errorMsg}`);
      setStatus('Error extract PDF covers: ' + errorMsg);
      setErrors(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    if (confirm('Hapus semua data preview?')) {
      setScrapedData([]);
      setProgress(0);
      setStatus('');
      setImportedCount(0);
      setErrors([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Migrasi Ebook</h1>
          <p className="text-gray-600 mt-2">
            Import ebook dari sistem lama ke database baru
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Konfigurasi Sumber Data</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="http://103.44.149.34/elib/halaman/buku/90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Buku
              </label>
              <input
                type="number"
                value={totalBooks}
                onChange={(e) => setTotalBooks(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Akan diproses dalam {calculatePages()} halaman (12 buku per halaman)
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Step 1: Scraping Data</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={scrapeEbooks}
                disabled={isLoading}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Scraping...' : 'Mulai Scraping'}
              </button>

              {scrapedData.length > 0 && (
                <>
                  <button
                    onClick={importToDatabase}
                    disabled={isLoading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    Import ke Database ({scrapedData.length})
                  </button>
                  <button
                    onClick={clearData}
                    disabled={isLoading}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    Clear Data
                  </button>
                </>
              )}
            </div>

            <h3 className="text-sm font-semibold text-gray-700 mb-3">Step 2: Download Files (setelah import)</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={downloadPDFs}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                📥 Download PDF Files
              </button>
              <button
                onClick={extractCovers}
                disabled={isLoading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                🖼️ Extract/Download Covers
              </button>
            </div>

            <h3 className="text-sm font-semibold text-gray-700 mb-3 mt-6">Step 3: Extract High-Quality Covers</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={extractPdfCovers}
                disabled={isLoading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                📸 Extract Covers dari PDF (High Quality)
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-teal-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{progress}% - {status}</p>
          </div>
        )}

        {/* Status */}
        {status && !isLoading && (
          <div className={`rounded-lg p-4 mb-6 ${
            status.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
          }`}>
            <p className="font-medium">{status}</p>
            {importedCount > 0 && (
              <p className="text-sm mt-1">Total imported: {importedCount} buku</p>
            )}
          </div>
        )}

        {/* Process Logs */}
        {logs.length > 0 && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-6 font-mono text-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-semibold">📋 Process Log</h3>
              <button
                onClick={() => setLogs([])}
                className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-800"
              >
                Clear
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-1 bg-black p-3 rounded">
              {logs.map((log, idx) => (
                <div key={idx} className="text-xs">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Errors ({errors.length})</h3>
            <ul className="text-sm text-red-700 space-y-1">
              {errors.slice(0, 10).map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
              {errors.length > 10 && (
                <li className="text-red-600 italic">... dan {errors.length - 10} error lainnya</li>
              )}
            </ul>
          </div>
        )}

        {/* Preview Data */}
        {scrapedData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Preview Data ({scrapedData.length} buku)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penulis</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penerbit</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tahun</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scrapedData.slice(0, 50).map((book, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{book.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{book.author}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{book.publisher || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{book.year || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{book.category || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {scrapedData.length > 50 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Menampilkan 50 dari {scrapedData.length} buku. Scroll untuk melihat lebih banyak.
                </p>
              )}
            </div>
          </div>
        )}

        {/* URL Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">URL yang akan di-scrape:</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {generateUrls().slice(0, 5).map((url, idx) => (
              <p key={idx} className="text-xs text-gray-600 font-mono">{url}</p>
            ))}
            {generateUrls().length > 5 && (
              <p className="text-xs text-gray-500 italic">... dan {generateUrls().length - 5} URL lainnya</p>
            )}
          </div>
        </div>
      </div>
  );
}
