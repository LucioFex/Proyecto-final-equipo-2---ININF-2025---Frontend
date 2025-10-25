import React, { useState } from 'react';
import type { User, Post } from '../types';
import { PostCard } from './PostCard';
import { EditProfileModal } from './EditProfileModal';

interface ProfileProps {
  user: User;
  currentUser: User;
  posts: Post[];
  onVote: (postId: string, direction: 'up' | 'down') => void;
  onSelectPost: (post: Post) => void;
  onSelectCommunity: (communityId: string) => void;
  onSelectUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  onDeletePost: (postId: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, currentUser, posts, onVote, onSelectPost, onSelectCommunity, onSelectUser, onUpdateUser, onDeletePost }) => {
  const isOwnProfile = user.id === currentUser.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (updatedUser: User) => {
    onUpdateUser(updatedUser);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-slate-100 -mx-2 sm:-mx-4 lg:-mx-8 -mt-4">
        <div className="bg-white rounded-b-lg shadow-sm">
          {/* Banner Section */}
          <div className="h-40 md:h-48 w-full bg-slate-200">
            <img 
              className="h-full w-full object-cover" 
              src={user.coverImageUrl} 
              alt="Imagen de portada del perfil" 
            />
          </div>
          
          {/* Avatar and Edit Button Section */}
          <div className="px-6 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between -mt-16">
            <div className="sm:w-1/3 hidden sm:block">{/* Spacer */}</div>
            <div className="flex-shrink-0">
              <img 
                className="h-32 w-32 rounded-full border-4 border-white shadow-lg" 
                src={user.avatarUrl} 
                alt={`${user.name}'s avatar`}
              />
            </div>
            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end mt-4 sm:mt-0">
              {isOwnProfile ? (
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  Editar Perfil
                </button>
              ) : (
                <button className="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">
                  Enviar Mensaje
                </button>
              )}
            </div>
          </div>

          {/* User Info Section */}
          <div className="text-center pt-4 pb-8 px-6">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{user.name}</h1>
              <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                user.role === 'Profesor' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
            <p className="text-md text-slate-500 mt-1">@{user.username}</p>
            <p className="text-md text-slate-700 mt-3 max-w-xl mx-auto">{user.title}</p>
            
            <div className="mt-5">
              <span className="font-bold text-blue-600 text-lg">{user.communitiesCount}</span>
              <span className="text-slate-500 ml-1.5">Comunidades</span>
            </div>

            <p className="mt-5 text-slate-700 border-l-4 border-slate-200 pl-4 text-left max-w-xl mx-auto">
              {user.bio}
            </p>

            <p className="mt-5 text-sm text-slate-400">
              Se unió en {user.joinedDate}
            </p>
          </div>
        </div>
        
        {/* Posts Section */}
        <div className="mt-6 px-2 sm:px-4 lg:px-8">
          <h2 className="text-xl font-bold mb-4 text-slate-800">Publicaciones</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                currentUser={currentUser}
                onVote={onVote} 
                onSelectPost={onSelectPost} 
                onSelectCommunity={onSelectCommunity}
                onSelectUser={onSelectUser}
                onDeletePost={onDeletePost}
              />
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center text-slate-500">
              Este usuario aún no ha realizado ninguna publicación.
            </div>
          )}
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </>
  );
};
