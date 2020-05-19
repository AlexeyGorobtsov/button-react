import React, {useEffect, useState} from 'react';

export function useRect({canvas}) {
    const [offset, setOffset] = useState({offsetX: 0, offsetY:0});

    function getOffset() {
        if(!canvas) return;
        const rect = canvas.getBoundingClientRect();
        setOffset({offsetX: rect.x, offsetY: rect.y});
    }
    useEffect(() => {
        window.addEventListener('scroll', getOffset);
        getOffset();
        return () => window.removeEventListener('scroll', getOffset)
    }, [canvas]);

    return offset;
}