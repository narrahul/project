import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import NoteDetail from '../../components/NoteDetail';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/notes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setNote(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching note:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (id: string, title: string, content: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setNote((prevNote) =>
          prevNote ? { ...prevNote, title, content, updatedAt: new Date().toISOString() } : null
        );
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (!note) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Note not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NoteDetail note={note} onUpdate={handleUpdate} onDelete={handleDelete} />
    </Layout>
  );
} 