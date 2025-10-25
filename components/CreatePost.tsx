import React, { useState } from 'react';
import type { Community } from '../types';

interface CreatePostProps {
  communities: Community[];
  onCreatePost: (postData: { title: string; content: string; communityId: string }) => void;
  onCancel: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ communities, onCreatePost, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [communityId, setCommunityId] = useState<string>(communities[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && communityId) {
      onCreatePost({ title, content, communityId });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Crear una nueva publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="community" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Comunidad
          </label>
          <select
            id="community"
            value={communityId}
            onChange={(e) => setCommunityId(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200"
          >
            {communities.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full shadow-sm sm:text-sm border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Un título interesante..."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Contenido
          </label>
          <textarea
            id="content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full shadow-sm sm:text-sm border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Escribe tu contenido aquí. Puedes usar Markdown."
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || !communityId}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 dark:disabled:bg-sky-800 disabled:cursor-not-allowed"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};
