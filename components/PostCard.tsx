import React from 'react';
import type { Post, PostTag, User } from '../types';
import { UpvoteIcon } from './icons/UpvoteIcon';
import { DownvoteIcon } from './icons/DownvoteIcon';
import { CommentIcon } from './icons/CommentIcon';
import { TrashIcon } from './icons/TrashIcon';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onVote: (postId: string, direction: 'up' | 'down') => void;
  onSelectPost: (post: Post) => void;
  onSelectCommunity: (communityId: string) => void;
  onSelectUser: (user: Post['author']) => void;
  onDeletePost: (postId: string) => void;
}

const tagColors: Record<PostTag, string> = {
  Pregunta: 'bg-blue-100 text-blue-600',
  Recurso: 'bg-green-100 text-green-600',
  Apunte: 'bg-purple-100 text-purple-600',
  Discusión: 'bg-orange-100 text-orange-600',
};

export const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onVote, onSelectPost, onSelectCommunity, onSelectUser, onDeletePost }) => {
  const score = post.upvotes - post.downvotes;

  const handleCommunityClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCommunity(post.communityId);
  }
  
  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectUser(post.author);
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres borrar esta publicación?')) {
      onDeletePost(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 flex hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col items-center p-2 bg-slate-50 rounded-l-lg">
        <button onClick={(e) => { e.stopPropagation(); onVote(post.id, 'up'); }} className={`p-1 rounded ${post.voteStatus === 'up' ? 'text-blue-500' : 'text-slate-400 hover:bg-slate-200'}`}>
          <UpvoteIcon />
        </button>
        <span className="font-bold text-sm my-1 text-slate-700">{score}</span>
        <button onClick={(e) => { e.stopPropagation(); onVote(post.id, 'down'); }} className={`p-1 rounded ${post.voteStatus === 'down' ? 'text-red-500' : 'text-slate-400 hover:bg-slate-200'}`}>
          <DownvoteIcon />
        </button>
      </div>
      <div className="p-4 flex-1 cursor-pointer relative" onClick={() => onSelectPost(post)}>
        {currentUser.role === 'Profesor' && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors z-10"
            aria-label="Borrar post"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
        <div className="text-xs text-slate-500 flex items-center mb-2 flex-wrap">
          <a href="#" onClick={handleCommunityClick} className="font-semibold text-slate-800 hover:underline">c/{post.communityName}</a>
          <span className="mx-2">•</span>
          <span>Publicado por </span>
          <a href="#" onClick={handleUserClick} className="ml-1 text-slate-600 hover:underline">{post.author.name}</a>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${post.author.role === 'Profesor' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{post.author.role}</span>
          <span className="mx-2">•</span>
          <span>{post.timestamp}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <span>{post.title}</span>
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${tagColors[post.tag]}`}>{post.tag}</span>
        </h3>
        <p className="text-sm text-slate-600 max-h-24 overflow-hidden mask-fade-to-bottom">
          {post.content}
        </p>
        <div className="flex items-center text-sm text-slate-500 mt-4">
          <CommentIcon />
          <span className="ml-1">{post.comments.length} Comentarios</span>
        </div>
      </div>
    </div>
  );
};

// Helper style to create a fade-out effect for long content previews.
const style = document.createElement('style');
style.innerHTML = `
.mask-fade-to-bottom {
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}
`;
document.head.appendChild(style);