'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      });
      if (search) params.append('search', search);
      if (filter !== 'all') params.append('isRead', (filter === 'read').toString());

      const res = await fetch(`/api/admin/messages?${params}`);
      
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setMessages(data.messages);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search, filter, router]);

  useEffect(() => {
    fetchMessages();
  }, [page, search, filter, fetchMessages]);

  const handleToggleRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead }),
      });

      if (!res.ok) throw new Error('Failed to update');

      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead });
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pesan ini?')) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Gagal menghapus pesan');
    }
  };

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleToggleRead(message.id, true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-serif font-semibold text-gray-900">Contact Messages</h1>
              <p className="text-xs text-gray-600 mt-0.5">Kelola pesan dari pengunjung</p>
            </div>
            <button
              onClick={() => router.push('/admin')}
              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              ← Kembali
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-blue-600">{total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">Read</p>
              <p className="text-2xl font-bold text-green-600">{total - unreadCount}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari nama, email, atau subject..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as 'all' | 'unread' | 'read');
                setPage(1);
              }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua</option>
              <option value="unread">Belum Dibaca</option>
              <option value="read">Sudah Dibaca</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => viewMessage(message)}
                      className={`bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition ${
                        selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''
                      } ${!message.isRead ? 'border-l-4 border-blue-500' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          <p className="text-sm text-gray-600">{message.email}</p>
                        </div>
                        {!message.isRead && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{message.subject}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>

                {messages.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Tidak ada pesan
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-white border rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-white border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Message Detail */}
          <div>
            {selectedMessage ? (
              <div className="bg-white p-6 rounded-lg shadow sticky top-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>From: <strong>{selectedMessage.name}</strong></span>
                    <span>{selectedMessage.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleToggleRead(selectedMessage.id, !selectedMessage.isRead)}
                    className={`flex-1 px-4 py-2 rounded font-medium ${
                      selectedMessage.isRead
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {selectedMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
                  >
                    📧 Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
                Pilih pesan untuk melihat detail
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
