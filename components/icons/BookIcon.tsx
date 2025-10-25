
import React from 'react';
export const BookIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20v2H6.5A2.5 2.5 0 014 19.5z"></path>
        <path d="M4 5h16v12H6.5A2.5 2.5 0 014 14.5V5z"></path>
    </svg>
);
