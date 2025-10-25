import React, { useState, useMemo, useEffect } from 'react';
import type { Post, User, Community, Comment, PostTag, UserRole } from './types';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { Profile } from './components/Profile';
import { HomePostCreator } from './components/HomePostCreator';
import { Login } from './components/Login';
import { SuccessNotification } from './components/SuccessNotification';
import { Onboarding, OnboardingData } from './components/Onboarding';

type View = 'home' | 'post' | 'profile';

// Reemplazar con backend de verdad
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialUsers, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [view, setView] = useState<View>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  useEffect(() => {
    if(initialUsers.length > 0) {
      setAllUsers(initialUsers);
    }
  }, [initialUsers]);

  const handleLogin = () => {
    // In a real app, this would validate credentials.
    // Here we just log in the first user from the list.
    if (allUsers.length > 0) {
      setCurrentUser(allUsers[0]);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home'); // Reset to home view on logout
  };

  const handleRegister = (newUserData: { name: string; email: string; role: UserRole; }) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name: newUserData.name,
      username: newUserData.name.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 100),
      avatarUrl: `https://picsum.photos/seed/user${Date.now()}/200/200`,
      coverImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1740&auto=format&fit=crop',
      title: newUserData.role === 'Estudiante' ? 'Nuevo Estudiante' : 'Nuevo Profesor',
      role: newUserData.role,
      bio: '¡Hola! Soy nuevo en RAU y estoy listo para aprender y colaborar.',
      joinedDate: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      communitiesCount: 0,
      communityIds: [],
      hasCompletedOnboarding: false, // All users must onboard
    };
    setAllUsers(prevUsers => [...prevUsers, newUser]);
  };
  
  const handleCompleteOnboarding = (data: OnboardingData) => {
    if (!currentUser) return;
    
    const updatedUser: User = {
        ...currentUser,
        careers: data.careers,
        currentYear: data.year,
        graduationYear: data.gradYear,
        communityIds: Array.from(data.communities),
        communitiesCount: data.communities.size,
        title: currentUser.role === 'Profesor'
          ? `Profesor de ${data.careers.join(', ')}`
          : `${data.year} de ${data.careers[0]}`,
        bio: currentUser.role === 'Profesor'
          ? `Profesor de ${data.careers.join(', ')}. Apasionado por la enseñanza y el debate académico. ¡Aquí para ayudar!`
          : `Estudiante de ${data.careers[0]} cursando el ${data.year}. ¡Listo para aprender y colaborar en RAU!`,
        hasCompletedOnboarding: true,
    };

    handleUpdateUser(updatedUser);
    setNotification("¡Tus preferencias han sido guardadas!");
  };

  const handleVote = (postId: string, direction: 'up' | 'down') => {
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id !== postId) return p;

        const currentStatus = p.voteStatus;
        let newUpvotes = p.upvotes;
        let newDownvotes = p.downvotes;
        let newStatus = p.voteStatus;

        if (direction === 'up') {
          if (currentStatus === 'up') {
            newUpvotes -= 1;
            newStatus = 'none';
          } else {
            newUpvotes += 1;
            if (currentStatus === 'down') newDownvotes -= 1;
            newStatus = 'up';
          }
        } else { // direction is 'down'
          if (currentStatus === 'down') {
            newDownvotes -= 1;
            newStatus = 'none';
          } else {
            newDownvotes += 1;
            if (currentStatus === 'up') newUpvotes -= 1;
            newStatus = 'down';
          }
        }
        return { ...p, upvotes: newUpvotes, downvotes: newDownvotes, voteStatus: newStatus };
      })
    );
  };

  const handleAddComment = (postId: string, comment: Comment) => {
    const updatedPosts = posts.map(p =>
      p.id === postId ? { ...p, comments: [comment, ...p.comments] } : p
    );
    setPosts(updatedPosts);
    if(selectedPost && selectedPost.id === postId) {
        const updatedSelectedPost = updatedPosts.find(p => p.id === postId);
        setSelectedPost(updatedSelectedPost || null);
    }
  };

  const handleCreatePost = (postData: { title: string; content: string; communityId: string; tag: PostTag; }) => {
    if (!currentUser) return;
    const community = communities.find(c => c.id === postData.communityId);
    if (!community) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      title: postData.title,
      content: postData.content,
      author: currentUser,
      communityId: postData.communityId,
      communityName: community.name,
      upvotes: 1,
      downvotes: 0,
      comments: [],
      timestamp: 'Ahora mismo',
      voteStatus: 'up',
      tag: postData.tag,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setView('home');
  };

  const handleCreateCommunity = (communityData: { name: string; description: string; moderators: User[] }) => {
    const newCommunity: Community = {
      id: `c${Date.now()}`,
      name: communityData.name,
      description: communityData.description,
      memberCount: communityData.moderators.length,
      icon: 'Book', // Default icon for new communities
    };
    setCommunities(prev => [...prev, newCommunity]);
    setNotification('¡Comunidad creada con éxito!');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setAllUsers(prevUsers => 
        prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
    if (currentUser && currentUser.id === updatedUser.id) {
        setCurrentUser(updatedUser);
    }
    setPosts(prevPosts =>
      prevPosts.map(p => {
        const newAuthor = p.author.id === updatedUser.id ? updatedUser : p.author;
        const newComments = p.comments.map(c => {
            const newCommentAuthor = c.author.id === updatedUser.id ? updatedUser : c.author;
            return { ...c, author: newCommentAuthor };
        });
        return { ...p, author: newAuthor, comments: newComments };
      })
    );
    if (selectedUser && selectedUser.id === updatedUser.id) {
        setSelectedUser(updatedUser);
    }
    setNotification('¡Perfil actualizado con éxito!');
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      setView('home');
      setSelectedPost(null);
    }
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    const updatedPosts = posts.map(p => {
      if (p.id !== postId) return p;
      const updatedComments = p.comments.filter(c => c.id !== commentId);
      return { ...p, comments: updatedComments };
    });
    setPosts(updatedPosts);
    
    if (selectedPost && selectedPost.id === postId) {
      const updatedSelectedPost = updatedPosts.find(p => p.id === postId);
      setSelectedPost(updatedSelectedPost || null);
    }
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setView('post');
  };

  const handleSelectCommunity = (communityId: string) => {
    setSelectedCommunity(communityId);
    setSelectedPost(null);
    setSelectedUser(null);
    setView('home');
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setView('profile');
  };

  const handleLogoClick = () => {
    setSelectedCommunity(null);
    setSelectedPost(null);
    setSelectedUser(null);
    setSearchQuery('');
    setView('home');
  };

  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => {
        if (selectedCommunity && post.communityId !== selectedCommunity) {
          return false;
        }
        if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && !post.content.toLowerCase().includes(searchQuery.toLowerCase()) && !post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) && !post.communityName.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  }, [posts, selectedCommunity, searchQuery]);
  
  if (!currentUser) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (!currentUser.hasCompletedOnboarding) {
    return <Onboarding currentUser={currentUser} onComplete={handleCompleteOnboarding} communities={communities} />;
  }
  
  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-8">Cargando contenido...</div>;
    }
    
    switch (view) {
      case 'post':
        if (!selectedPost) return <div>Post no encontrado.</div>;
        return <PostDetail post={selectedPost} currentUser={currentUser} onVote={handleVote} onAddComment={handleAddComment} onNavigateToProfile={handleSelectUser} onDeletePost={handleDeletePost} onDeleteComment={handleDeleteComment} />;
      case 'profile':
        if (!selectedUser) return <div>Usuario no encontrado.</div>;
        const userPosts = posts.filter(p => p.author.id === selectedUser.id);
        return <Profile 
            user={selectedUser} 
            currentUser={currentUser} 
            posts={userPosts}
            onVote={handleVote}
            onSelectPost={handleSelectPost}
            onSelectCommunity={handleSelectCommunity}
            onSelectUser={handleSelectUser}
            onUpdateUser={handleUpdateUser}
            onDeletePost={handleDeletePost}
        />;
      case 'home':
      default:
        return (
          <>
            <HomePostCreator currentUser={currentUser} communities={communities} activeCommunity={selectedCommunity} onCreatePost={handleCreatePost} />
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} currentUser={currentUser} onVote={handleVote} onSelectPost={handleSelectPost} onSelectCommunity={handleSelectCommunity} onSelectUser={handleSelectUser} onDeletePost={handleDeletePost} />
            ))}
          </>
        );
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header
        currentUser={currentUser}
        onLogoClick={handleLogoClick}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onProfileClick={() => handleSelectUser(currentUser)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {notification && (
        <SuccessNotification 
          message={notification} 
          onClose={() => setNotification(null)} 
        />
      )}
      <main className="max-w-7xl mx-auto pt-20 px-2 sm:px-4 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <Sidebar
            currentUser={currentUser}
            communities={communities}
            activeCommunity={selectedCommunity}
            onSelectCommunity={handleSelectCommunity}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            users={allUsers}
            onCreateCommunity={handleCreateCommunity}
          />
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            {error && <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;