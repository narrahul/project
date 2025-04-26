interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(note._id)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="mt-2 text-gray-600 whitespace-pre-wrap">{note.content}</p>
      
      {note.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Created: {formatDate(note.createdAt)}</p>
        <p>Last modified: {formatDate(note.updatedAt)}</p>
      </div>
    </div>
  );
} 