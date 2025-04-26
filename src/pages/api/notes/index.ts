import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const { search, tag } = req.query;
        let query = {};

        if (search) {
          query = {
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { content: { $regex: search, $options: 'i' } },
            ],
          };
        }

        if (tag) {
          query = { ...query, tags: tag };
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.status(200).json(notes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
      }
      break;

    case 'POST':
      try {
        const { title, content, tags } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'Title and content are required' });
        }

        const note = await Note.create({ title, content, tags });
        res.status(201).json(note);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 