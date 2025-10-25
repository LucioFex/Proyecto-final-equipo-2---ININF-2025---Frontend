import React, { useState } from 'react';
import type { User } from '../types';
import { XIcon } from './icons/XIcon';
import { UsersIcon } from './icons/UsersIcon';
import { PencilIcon } from './icons/PencilIcon';
import { PlusIcon } from './icons/PlusIcon';


interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onCreateCommunity: (data: { name: string; description: string; moderators: User[] }) => void;
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose, users, onCreateCommunity }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedModerators, setSelectedModerators] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;
  
  const handleModeratorAdd = (user: User) => {
    setSelectedModerators(prev => [...prev, user]);
    setSearchQuery('');
  };

  const handleModeratorRemove = (userId: string) => {
    setSelectedModerators(prev => prev.filter(mod => mod.id !== userId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !description.trim()) {
      setError('El nombre y la descripción no pueden estar vacíos.');
      return;
    }

    const hasProfessor = selectedModerators.some(u => u.role === 'Profesor');
    if (!hasProfessor) {
      setError('Se debe seleccionar al menos un profesor como moderador.');
      return;
    }
    
    if (selectedModerators.length === 0) {
      setError('Se debe seleccionar al menos un moderador.');
      return;
    }

    onCreateCommunity({ name, description, moderators: selectedModerators });
  };
  
  const handleClose = () => {
    setError('');
    setName('');
    setDescription('');
    setSelectedModerators([]);
    setSearchQuery('');
    onClose();
  }

  const availableUsers = users.filter(user => 
    !selectedModerators.some(mod => mod.id === user.id) &&
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">Crear una Comunidad</h2>
          <button onClick={handleClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow min-h-0">
          <div className="overflow-y-auto p-6 space-y-5 bg-slate-50">
            {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
            
            <div>
              <label htmlFor="comm-name" className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Comunidad</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UsersIcon className="h-5 w-5 text-slate-400"/>
                </div>
                <input type="text" id="comm-name" value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Física Cuántica" className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"/>
              </div>
            </div>
            
            <div>
              <label htmlFor="comm-desc" className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
               <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <PencilIcon className="h-5 w-5 text-slate-400"/>
                </div>
                <textarea id="comm-desc" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Un lugar para explorar el mundo subatómico..." className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"></textarea>
              </div>
            </div>
            
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h3 className="text-md font-semibold text-slate-800 mb-1">Moderadores</h3>
              <p className="text-xs text-slate-500 mb-3">Debe seleccionar al menos un profesor para crear la comunidad.</p>
              
              <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-md min-h-[44px] bg-slate-50">
                {selectedModerators.map(user => (
                  <div key={user.id} className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full border border-blue-200">
                    <img src={user.avatarUrl} alt={user.name} className="h-5 w-5 rounded-full" />
                    <span>{user.name}</span>
                    <button type="button" onClick={() => handleModeratorRemove(user.id)} className="text-blue-500 hover:text-blue-700">
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative mt-2">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar alumnos o profesores..."
                  className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                {searchQuery && (
                  <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {availableUsers.length > 0 ? availableUsers.map(user => (
                      <li key={user.id} onClick={() => handleModeratorAdd(user)} className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-slate-900 hover:bg-blue-100 m-1 rounded-md">
                        <div className="flex items-center">
                          <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full"/>
                          <div className='ml-3'>
                            <span className="font-semibold">{user.name}</span>
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${user.role === 'Profesor' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{user.role}</span>
                          </div>
                        </div>
                      </li>
                    )) : (
                      <li className="select-none relative py-2 px-4 text-slate-500">No se encontraron usuarios.</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 border-t bg-slate-100 rounded-b-lg flex justify-end gap-3 mt-auto">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              <span>Crear Comunidad</span>
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
