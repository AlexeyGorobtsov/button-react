import React from 'react';

export function Menu({width = '24px', height = '24px'}) {
    return (
        <svg style={{width, height}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
    )
}