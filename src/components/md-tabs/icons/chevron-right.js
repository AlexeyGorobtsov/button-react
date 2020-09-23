import React from 'react';

export function ChevronRight({width = '24px', height = '24px'}) {
    return (
        <svg style={{width, height}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
    )
}