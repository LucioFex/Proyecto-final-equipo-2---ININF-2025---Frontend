
import React from 'react';
export const AtomIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
        <path d="M20.2 20.2c2.04-2.03.02-5.91-2.82-8.75-2.84-2.84-6.72-4.86-8.75-2.82"></path>
        <path d="M3.8 3.8c-2.04 2.03-.02 5.91 2.82 8.75 2.84 2.84 6.72 4.86 8.75 2.82"></path>
        <path d="M20.2 3.8c-2.03 2.04-5.91.02-8.75-2.82-2.84-2.84-4.86-6.72-2.82-8.75"></path>
        <path d="M3.8 20.2c2.03-2.04 5.91-.02 8.75-2.82 2.84-2.84 4.86-6.72 2.82-8.75"></path>
    </svg>
);
