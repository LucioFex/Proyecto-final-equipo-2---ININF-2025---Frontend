import React, { useState, useEffect } from 'react';
import type { User, Community, PostTag } from '../types';

import { BookIcon } from './icons/BookIcon';
import { CommentIcon } from './icons/CommentIcon';
import { QuestionIcon } from './icons/QuestionIcon';
import { NotesIcon } from './icons/NotesIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';

interface HomePostCreatorProps {
  currentUser: User;
  communities: Community[];
  activeCommunity: string | null;
  onCreatePost: (postData: { title: string; content: string; communityId: string; tag: PostTag; }) => void;
}

const tagOptions: { name: PostTag, icon: React.FC<{className?:string}>, activeClasses: string, inactiveClasses: string }[] = [
    { name: 'Pregunta', icon: QuestionIcon, activeClasses: 'bg-blue-100 text-blue-500', inactiveClasses: 'text-slate-600 hover:bg-slate-100' },
    { name: 'Recurso', icon: BookIcon, activeClasses: 'bg-green-100 text-green-600', inactiveClasses: 'text-slate-600 hover:bg-slate-100' },
    { name: 'Apunte', icon: NotesIcon, activeClasses: 'bg-purple-100 text-purple-600', inactiveClasses: 'text-slate-600 hover:bg-slate-100' },
    { name: 'Discusión', icon: CommentIcon, activeClasses: 'bg-orange-100 text-orange-600', inactiveClasses: 'text-slate-600 hover:bg-slate-100' },
];

export const HomePostCreator: React.FC<HomePostCreatorProps> = ({ currentUser, communities, activeCommunity, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [communityId, setCommunityId] = useState<string>('');
  const [activeTag, setActiveTag] = useState<PostTag>('Pregunta');

  useEffect(() => {
    if (activeCommunity) {
      setCommunityId(activeCommunity);
    } else if (communities.length > 0 && !communityId) {
      setCommunityId(communities[0].id);
    }
  }, [activeCommunity, communities, communityId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = content.trim().split('\n');
    const title = lines[0] || '';
    const postContent = lines.slice(1).join('\n').trim();

    if (title && communityId) {
      onCreatePost({ title, content: postContent, communityId, tag: activeTag });
      setContent('');
    } else {
        alert("La publicación debe tener al menos una línea para el título.");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
        <form onSubmit={handleSubmit}>
            <div className="flex items-start gap-3">
                <img src={currentUser.avatarUrl} alt="Tu avatar" className="h-10 w-10 rounded-full flex-shrink-0" />
                <div className='w-full'>
                    <div className='w-full border border-slate-200 rounded-lg'>
                        {/* Simplified Rich Text Editor Toolbar */}
                        <div className="flex items-center gap-4 px-3 py-2 border-b border-slate-200 text-slate-500">
                            <label htmlFor="file-upload" className="cursor-pointer text-slate-500 hover:text-blue-500 transition-colors">
                                <PaperclipIcon className="w-5 h-5" />
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <div className="border-l h-5 border-slate-200"></div>
                            <span className="font-bold cursor-pointer hover:text-slate-800">B</span>
                            <span className="italic cursor-pointer hover:text-slate-800">i</span>
                        </div>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="La primera línea será el título. ¿Qué quieres compartir?"
                            className="w-full p-3 h-24 border-none rounded-b-lg bg-transparent focus:ring-0 focus:outline-none resize-y text-slate-900 placeholder-slate-400"
                        ></textarea>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3 gap-3">
                         <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                            {tagOptions.map(({ name, icon: Icon, activeClasses, inactiveClasses }) => (
                                 <button 
                                    key={name}
                                    type="button" 
                                    onClick={() => setActiveTag(name)}
                                    className={`flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded-md transition-colors ${activeTag === name ? activeClasses : inactiveClasses}`}
                                 >
                                    <Icon className="h-5 w-5" />
                                    <span>{name}</span>
                                </button>
                            ))}
                        </div>
                        <div className='flex items-center gap-2 w-full md:w-auto'>
                          <select
                              id="community-creator"
                              value={communityId}
                              onChange={(e) => setCommunityId(e.target.value)}
                              className="text-sm h-9 rounded-md bg-slate-100 border-transparent focus:ring-blue-500 focus:border-blue-500 text-slate-700 w-full"
                          >
                              {communities.map(c => (
                              <option key={c.id} value={c.id}>c/{c.name}</option>
                              ))}
                          </select>
                          <button
                          type="submit"
                          disabled={!content.trim() || !communityId}
                          className="px-4 h-9 flex items-center justify-center text-sm font-semibold rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex-shrink-0"
                          >
                              Postear
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
};
