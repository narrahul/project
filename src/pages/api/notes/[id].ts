import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const note = await Note.findById(id);
        if (!note) {
          return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch note' });
      }
      break;

    case 'PUT':
      try {
        const { title, content, tags } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required' });
        }

        const note = await Note.findByIdAndUpdate(
          id,
          { title, content, tags, updatedAt: new Date() },
          { new: true, runValidators: true }
        );

        if (!note) {
          return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(note);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
      }
      break;

    case 'DELETE':
      try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
          return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 