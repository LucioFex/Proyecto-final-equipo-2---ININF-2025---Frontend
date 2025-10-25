import type { User, Post, Community } from '../types';

const HARDCODED_USERS: User[] = [
  { id: 'u1', name: 'Ana Torres', username: 'atorres', avatarUrl: 'https://picsum.photos/seed/user1/200/200', coverImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1740&auto=format&fit=crop', title: 'Estudiante de Física', role: 'Estudiante', bio: 'Apasionada por la astrofísica y la divulgación científica. Buscando siempre entender cómo funciona el universo.', joinedDate: 'Enero 2024', communitiesCount: 5, communityIds: ['c1', 'c2'], hasCompletedOnboarding: true },
  { id: 'u2', name: 'Dr. Ricardo Vargas', username: 'rvargas', avatarUrl: 'https://picsum.photos/seed/user2/200/200', coverImageUrl: 'https://images.unsplash.com/photo-1491841550275-5b462bf985ca?q=80&w=1740&auto=format&fit=crop', title: 'Profesor de Cálculo', role: 'Profesor', bio: 'Doctor en Matemáticas Aplicadas. Me interesa la modelización de sistemas complejos y ayudar a los estudiantes a perderle el miedo a los números.', joinedDate: 'Marzo 2022', communitiesCount: 3, communityIds: ['c1'], hasCompletedOnboarding: true },
  { id: 'u3', name: 'Lucía Morales', username: 'lmorales', avatarUrl: 'https://picsum.photos/seed/user3/200/200', coverImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1740&auto=format&fit=crop', title: 'Estudiante de Química', role: 'Estudiante', bio: 'Amante de la química orgánica y las reacciones que forman el mundo que nos rodea.', joinedDate: 'Agosto 2023', communitiesCount: 8, communityIds: ['c4'], hasCompletedOnboarding: true },
  { id: 'u4', name: 'Carlos Rojas', username: 'crojas', avatarUrl: 'https://picsum.photos/seed/user4/200/200', coverImageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1740&auto=format&fit=crop', title: 'Estudiante de Programación', role: 'Estudiante', bio: 'Desarrollador en formación, entusiasta de Python y el desarrollo web. Siempre construyendo algo nuevo.', joinedDate: 'Febrero 2023', communitiesCount: 12, communityIds: ['c3'], hasCompletedOnboarding: true },
];

const HARDCODED_COMMUNITIES: Community[] = [
    { id: 'c1', name: 'Cálculo I', description: 'Discusiones y recursos para Cálculo I.', memberCount: 152, icon: 'Sigma' },
    { id: 'c2', name: 'Física Cuántica', description: 'Explorando el mundo subatómico.', memberCount: 89, icon: 'Atom' },
    { id: 'c3', name: 'Programación en Python', description: 'Para principiantes y expertos en Python.', memberCount: 340, icon: 'Code' },
    { id: 'c4', name: 'Química Orgánica', description: 'Mecanismos de reacción, síntesis y más.', memberCount: 112, icon: 'Beaker' },
];

const HARDCODED_POSTS: Post[] = [
  {
    id: 'p1',
    title: '¿Alguien tiene buenos apuntes sobre la Integral de Riemann?',
    content: 'Me está costando un poco entender el concepto fundamental detrás de la integral de Riemann. Si alguien tiene apuntes claros o algún video que lo explique bien, se lo agradecería mucho. Específicamente la parte de las sumas superiores e inferiores.',
    author: HARDCODED_USERS[0],
    communityId: 'c1',
    communityName: 'Cálculo I',
    upvotes: 28,
    downvotes: 1,
    comments: [
      { id: 'com1', author: HARDCODED_USERS[1], content: 'Hola Ana, te recomiendo el canal de 3Blue1Brown en YouTube, su serie sobre "La esencia del cálculo" es fantástica para la intuición. Busca el video sobre integrales.', timestamp: 'Hace 2 horas' },
      { id: 'com2', author: HARDCODED_USERS[0], content: '¡Muchas gracias, profesor! Lo veré ahora mismo.', timestamp: 'Hace 1 hora' },
    ],
    timestamp: 'Hace 3 horas',
    voteStatus: 'none',
    tag: 'Pregunta',
  },
  {
    id: 'p2',
    title: 'Recurso: Visualizador de orbitales atómicos en 3D',
    content: '¡Hola a todos! Encontré esta herramienta web increíble para visualizar orbitales atómicos en 3D. Es interactiva y ayuda mucho a comprender las formas de los orbitales s, p, d y f. Les dejo el enlace: [enlace a visualizador]',
    author: HARDCODED_USERS[2],
    communityId: 'c4',
    communityName: 'Química Orgánica',
    upvotes: 45,
    downvotes: 0,
    comments: [],
    timestamp: 'Hace 1 día',
    voteStatus: 'none',
    tag: 'Recurso',
  },
  {
    id: 'p3',
    title: 'Duda sobre decoradores en Python',
    content: 'Estoy aprendiendo sobre decoradores y no entiendo muy bien cómo funcionan con argumentos. ¿Cómo se pasa `*args` y `**kwargs` a la función decorada? ¿Podrían darme un ejemplo práctico?',
    author: HARDCODED_USERS[3],
    communityId: 'c3',
    communityName: 'Programación en Python',
    upvotes: 15,
    downvotes: 0,
    comments: [
       { id: 'com3', author: HARDCODED_USERS[1], content: 'Claro, un decorador es una función que envuelve a otra. La clave está en definir una función interna (wrapper) que acepte `*args` y `**kwargs` y los pase a la función original. Algo así: `def wrapper(*args, **kwargs): return func(*args, **kwargs)`', timestamp: 'Hace 5 horas' },
    ],
    timestamp: 'Hace 8 horas',
    voteStatus: 'none',
    tag: 'Pregunta',
  }
];