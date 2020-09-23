import React from 'react';

export function ChevronLeft({width = '24px', height= '24px'}) {
    return (
        <svg style={{width, height}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
    )
}