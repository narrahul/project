# Note Taking Application

A full-stack note-taking application built with Next.js, featuring a clean and responsive UI. The application allows users to create, read, update, and delete notes, with support for tags and search functionality.

## Features

- Create, read, update, and delete notes
- Tag-based organization
- Search functionality (search by title or content)
- Filter notes by tags
- Responsive design for mobile and desktop
- Real-time updates
- Clean and intuitive user interface

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18.17 or later
- MongoDB instance (local or Atlas)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd note-taking-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Documentation

### Endpoints

#### GET /api/notes
- Retrieves all notes
- Query parameters:
  - `search`: Search notes by title or content
  - `tag`: Filter notes by tag

#### GET /api/notes/:id
- Retrieves a specific note by ID

#### POST /api/notes
- Creates a new note
- Request body:
  ```json
  {
    "title": "Note Title",
    "content": "Note Content",
    "tags": ["tag1", "tag2"]
  }
  ```

#### PUT /api/notes/:id
- Updates an existing note
- Request body: Same as POST

#### DELETE /api/notes/:id
- Deletes a note

### Data Structure

Note object:
```typescript
{
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

## Design Decisions

1. **Next.js App Router**: Utilized the new App Router for better performance and server-side rendering capabilities.
2. **MongoDB**: Chosen for its flexibility with document-based data and easy integration with Node.js.
3. **Tailwind CSS**: Used for rapid UI development and consistent styling across components.
4. **TypeScript**: Implemented for better type safety and development experience.
5. **Component Structure**: Separated into reusable components (NoteForm, NoteCard) for better maintainability.

## Error Handling

- All API endpoints include proper error handling
- Frontend displays user-friendly error messages
- Form validation for required fields
- Confirmation dialogs for destructive actions

## Future Improvements

1. User authentication and authorization
2. Rich text editor for note content
3. Note sharing capabilities
4. Categories in addition to tags
5. Archive functionality
6. Export/import notes
7. Dark mode support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
