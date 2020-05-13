import React, {useEffect, useState} from 'react';
import {getRect} from "../helpers";

export function useRect({canvas}) {
    const [offset, setOffset] = useState({offsetX: 0, offsetY:0});
    useEffect(() => {
        if(!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const {offsetX, offsetY} = getRect(rect);
        setOffset({offsetX, offsetY})
    }, [canvas]);

    return offset;
}