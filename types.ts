export type VoteStatus = 'up' | 'down' | 'none';

export type UserRole = 'Profesor' | 'Estudiante';
export type PostTag = 'Pregunta' | 'Recurso' | 'Apunte' | 'Discusión';

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverImageUrl: string;
  title: string;
  role: UserRole;
  bio: string;
  joinedDate: string;
  communitiesCount: number;
  communityIds: string[];
  hasCompletedOnboarding: boolean;
  careers?: string[];
  currentYear?: string;
  graduationYear?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  communityId: string;
  communityName: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  timestamp: string;
  voteStatus: VoteStatus;
  tag: PostTag;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
}