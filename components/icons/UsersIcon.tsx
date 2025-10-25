import React from 'react';

export const UsersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "h-6 w-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268.5-1.857m0 0a5.002 5.002 0 019 0m0 0a5 5 0 00-9 0m2-11a3 3 0 11-6 0 3 3 0 016 0zm10 0a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
