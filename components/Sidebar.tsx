import React, { useState, useMemo } from 'react';
import type { Community, User } from '../types';
import { AtomIcon } from './icons/AtomIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { BookIcon } from './icons/BookIcon';
import { CodeIcon } from './icons/CodeIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { SigmaIcon } from './icons/SigmaIcon';
import { PlusIcon } from './icons/PlusIcon';
import { UsersIcon } from './icons/UsersIcon';
import { JoinCommunityModal } from './JoinCommunityModal';
import { CreateCommunityModal } from './CreateCommunityModal';

interface SidebarProps {
  currentUser: User | null;
  communities: Community[];
  activeCommunity: string | null;
  onSelectCommunity: (communityId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onCreateCommunity: (data: { name: string; description: string; moderators: User[] }) => void;
}

const iconMap: { [key: string]: React.FC<{className?: string}> } = {
  Sigma: SigmaIcon,
  Atom: AtomIcon,
  Code: CodeIcon,
  Beaker: BeakerIcon,
  Book: BookIcon,
  History: HistoryIcon,
};

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, communities, activeCommunity, onSelectCommunity, isOpen, onClose, users, onCreateCommunity }) => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCommunityAndCloseModal = (data: { name: string; description: string; moderators: User[] }) => {
    onCreateCommunity(data);
    setIsCreateModalOpen(false);
  };
  
  const userCommunities = useMemo(() => {
    if (!currentUser || !currentUser.communityIds) {
      return [];
    }
    return communities.filter(community => currentUser.communityIds.includes(community.id));
  }, [currentUser, communities]);


  const sidebarContent = (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Mis Comunidades</h2>
      <nav className="mb-6">
        {userCommunities.length > 0 ? (
          <ul>
            {userCommunities.map((community) => {
              const IconComponent = iconMap[community.icon] || BookIcon;
              return (
                <li key={community.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCommunity(community.id);
                    }}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      activeCommunity === community.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    <span>{community.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 px-3">No te has unido a ninguna comunidad todavía.</p>
        )}
      </nav>
      <div className="pt-4 border-t border-slate-200 space-y-2">
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transform transition-all duration-200 ease-in-out bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md hover:-translate-y-px active:scale-95"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Crear Comunidad</span>
        </button>
        <button 
          onClick={() => setIsJoinModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transform transition-all duration-200 ease-in-out bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 hover:-translate-y-px active:scale-95"
        >
          <UsersIcon className="h-5 w-5" />
          <span>Unirse a Comunidad</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
        {/* Mobile sidebar */}
        <div 
            className={`fixed inset-0 z-30 transition-opacity ease-linear duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`} 
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        <div className={`fixed top-0 left-0 h-full bg-white w-64 z-40 transform transition-transform ease-in-out duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {sidebarContent}
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3">
            <div className="sticky top-20 bg-white rounded-lg shadow">
              {sidebarContent}
            </div>
        </aside>

        <JoinCommunityModal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          communities={communities}
        />
        <CreateCommunityModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          users={users}
          onCreateCommunity={handleCreateCommunityAndCloseModal}
        />
    </>
  );
};