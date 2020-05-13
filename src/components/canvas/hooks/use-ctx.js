import React, {useEffect, useState} from 'react';


export function useCtx({canvasRef}) {
    const [ctx, setCtx] = useState(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setCtx(ctx);
    }, [canvasRef]);

    return [ctx];
}