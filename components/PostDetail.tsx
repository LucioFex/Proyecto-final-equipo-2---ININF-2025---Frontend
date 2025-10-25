import React, { useState } from 'react';
import type { Post, Community, User, Comment, PostTag } from '../types';
import { UpvoteIcon } from './icons/UpvoteIcon';
import { DownvoteIcon } from './icons/DownvoteIcon';
import { CommentIcon } from './icons/CommentIcon';
import { TrashIcon } from './icons/TrashIcon';

interface PostDetailProps {
  post: Post;
  community?: Community;
  currentUser: User;
  onNavigateToProfile: (user: User) => void;
  onVote: (postId: string, direction: 'up' | 'down') => void;
  onAddComment: (postId: string, comment: Comment) => void;
  onDeletePost: (postId: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
}

const tagColors: Record<PostTag, string> = {
  Pregunta: 'bg-blue-100 text-blue-600',
  Recurso: 'bg-green-100 text-green-600',
  Apunte: 'bg-purple-100 text-purple-600',
  Discusión: 'bg-orange-100 text-orange-600',
};

export const PostDetail: React.FC<PostDetailProps> = ({ post, community, currentUser, onNavigateToProfile, onVote, onAddComment, onDeletePost, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const score = post.upvotes - post.downvotes;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      const comment: Comment = {
        id: `com-${Date.now()}`,
        author: currentUser,
        content: newComment,
        timestamp: 'Ahora mismo',
      };
      onAddComment(post.id, comment);
      setNewComment('');
    }
  };

  const handleDeletePost = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar esta publicación?')) {
        onDeletePost(post.id);
    }
  };

  const handleDeleteComment = (commentId: string) => {
      if (window.confirm('¿Estás seguro de que quieres borrar este comentario?')) {
          onDeleteComment(post.id, commentId);
      }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex">
        <div className="flex flex-col items-center p-2 bg-slate-50 rounded-l-lg">
          <button onClick={() => onVote(post.id, 'up')} className={`p-1 rounded ${post.voteStatus === 'up' ? 'text-blue-500' : 'text-slate-400 hover:bg-slate-200'}`}>
            <UpvoteIcon />
          </button>
          <span className="font-bold text-sm my-1 text-slate-700">{score}</span>
          <button onClick={() => onVote(post.id, 'down')} className={`p-1 rounded ${post.voteStatus === 'down' ? 'text-red-500' : 'text-slate-400 hover:bg-slate-200'}`}>
            <DownvoteIcon />
          </button>
        </div>
        <div className="p-4 flex-1">
          <div className="text-xs text-slate-500 flex items-center mb-2 flex-wrap">
            {community && <span className="font-semibold text-slate-800">c/{community.name}</span>}
            <span className="mx-2">•</span>
            <span>Publicado por </span>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToProfile(post.author); }} className="ml-1 text-slate-600 hover:underline">{post.author.name}</a>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${post.author.role === 'Profesor' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{post.author.role}</span>
            <span className="mx-2">•</span>
            <span>{post.timestamp}</span>
          </div>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span>{post.title}</span>
                <span className={`px-2.5 py-1 rounded-md text-sm font-medium ${tagColors[post.tag]}`}>{post.tag}</span>
            </h1>
            {currentUser.role === 'Profesor' && (
              <button
                onClick={handleDeletePost}
                className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                aria-label="Borrar post"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="text-slate-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Comentarios ({post.comments.length})</h3>
        
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full p-2 border border-slate-300 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={3}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={!newComment.trim()}
            >
              Comentar
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex items-start space-x-3 group">
              <img src={comment.author.avatarUrl} alt={comment.author.name} className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <div className="flex items-baseline space-x-2 text-sm">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToProfile(comment.author); }} className="font-semibold text-slate-800 hover:underline">{comment.author.name}</a>
                    <span className="text-slate-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-slate-700 mt-1">{comment.content}</p>
                </div>
              </div>
              {currentUser.role === 'Profesor' && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                  aria-label="Borrar comentario"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};