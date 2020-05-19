import React, {useEffect, useState} from 'react'

export function useCanvasText({canvasRef, texts, init}) {
    const [preparedText, setText] = useState([]);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const result = texts.map((item, i) =>
                    ({text: item, x: 20, y: 20, id: i, width: ctx.measureText(item).width, height: 16}));
        setText(result);
    }, [texts]);

    return [preparedText]
}