import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { XIcon } from './icons/XIcon';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedUser: User) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user && isOpen) {
      setAvatarUrl(user.avatarUrl);
      setCoverImageUrl(user.coverImageUrl);
      setAvatarPreview(user.avatarUrl);
      setCoverPreview(user.coverImageUrl);
      setTitle(user.title);
      setBio(user.bio);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      avatarUrl,
      coverImageUrl,
      title,
      bio,
    };
    onSave(updatedUser);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    setImagePreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">Editar Perfil</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto p-6 space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Imagen de Portada</label>
              <div className="mt-1 flex items-center gap-4">
                <img src={coverPreview} alt="Preview de portada" className="h-16 w-32 object-cover rounded-md bg-slate-100" />
                <label htmlFor="user-cover-upload" className="cursor-pointer bg-white py-2 px-3 border border-slate-300 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Cambiar</span>
                    <input id="user-cover-upload" name="cover-image" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, setCoverImageUrl, setCoverPreview)} />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Foto de Perfil</label>
              <div className="mt-1 flex items-center gap-4">
                <img src={avatarPreview} alt="Preview de avatar" className="h-16 w-16 object-cover rounded-full bg-slate-100" />
                <label htmlFor="user-avatar-upload" className="cursor-pointer bg-white py-2 px-3 border border-slate-300 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Cambiar</span>
                    <input id="user-avatar-upload" name="avatar-image" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, setAvatarUrl, setAvatarPreview)} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input type="text" value={user.name} disabled className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md bg-slate-100 text-slate-500 cursor-not-allowed"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input type="text" value={`@${user.username}`} disabled className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md bg-slate-100 text-slate-500 cursor-not-allowed"/>
              </div>
            </div>

            <div>
              <label htmlFor="user-title" className="block text-sm font-medium text-slate-700 mb-1">Título / Descripción Breve</label>
              <input type="text" id="user-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Estudiante de Física" className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>

            <div>
              <label htmlFor="user-bio" className="block text-sm font-medium text-slate-700 mb-1">Biografía</label>
              <textarea id="user-bio" rows={4} value={bio} onChange={e => setBio(e.target.value)} className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-lg flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100">Cancelar</button>
          <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};
