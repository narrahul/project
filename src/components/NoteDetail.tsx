import { useState } from 'react';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteDetailProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}

const NoteDetail = ({ note, onUpdate, onDelete }: NoteDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note.id, title, content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold mb-4 p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{note.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="prose max-w-none rounded-lg border border-gray-200 bg-white p-6">
        <div className="whitespace-pre-wrap text-gray-700">{note.content}</div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </div>
        <div>
          Last updated: {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back to Notes
        </Link>
      </div>
    </div>
  );
};

export default NoteDetail; 