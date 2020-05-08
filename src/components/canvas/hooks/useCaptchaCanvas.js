import React, {useEffect, useRef} from 'react';
import {drawImage} from "../helpers/drawImage";


export function useCaptchaCanvas({src}) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        console.log({ctx})
        drawImage({src , ctx })
    });

    return [canvasRef];
}