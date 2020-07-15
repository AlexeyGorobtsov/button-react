import React, {useEffect, useRef, useState} from 'react';
import {drawImage} from "../helpers";
import animals from "../images/d.png";


export function useCtx({canvasRef, texts}) {
    const [canvasCtx, setCanvasCtx] = useState(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "16px verdana";
        // drawImage({src: animals, ctx, texts});
        setCanvasCtx(ctx)
    }, [canvasRef, texts]);

    return [canvasCtx]
}