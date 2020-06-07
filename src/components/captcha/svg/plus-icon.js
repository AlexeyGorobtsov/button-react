import React from 'react';

export function PlusIcon({width = '18', height ='18'}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18">
            <polygon fill="currentColor" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>
        </svg>
    )
}