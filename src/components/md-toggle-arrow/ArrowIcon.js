import React from 'react';

export function ArrowIcon ({width = '24px', height = '24px'}) {
    return(
        <svg style={{width: width, height: height}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
        </svg>
    )
}