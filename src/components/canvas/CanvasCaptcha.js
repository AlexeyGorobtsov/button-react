import React, {useRef, useEffect} from 'react';
import {useCtx, useRect} from "./hooks";

import animals from './images/animals.png';
import {drawImage, getRect} from "./helpers";

export function CanvasCaptcha(props) {
    const canvasRef = useRef(null);
    const [ctx] = useCtx({src: animals, canvasRef});
    const canvas = canvasRef.current;
    const {offsetX, offsetY} = useRect({canvas});


    let startX;
    let startY;
    const texts = [];
    const y = texts.length * 20 + 20;

    const text = {
        text: 'Hello world!',
        x: 20,
        y: y
    };
    if (ctx) {
        ctx.font = "16px verdana";
        text.width = ctx.measureText(text.text).width;
        text.height = 16;

        texts.push(text);
        draw();
    }

    let selectedText = -1;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        texts.forEach(item => ctx.fillText(item.text, item.x, item.y));
        drawImage({src: animals, ctx, texts });
    }

    function textHittest(x, y, textIndex) {
        const text = texts[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    }

    function handleMouseDown(e) {
        e.preventDefault();
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        // Put your mousedown stuff here
        for (var i = 0; i < texts.length; i++) {
            if (textHittest(startX, startY, i)) {
                selectedText = i;
            }
        }
    }

    function handleMouseUp(e) {
        e.preventDefault();
        selectedText = -1;
    }

    function handleMouseOut(e) {
        e.preventDefault();
        selectedText = -1;
    }

    function handleMouseMove(e) {
        if (selectedText < 0) {
            return;
        }
        e.preventDefault();
        const mouseX = parseInt(e.clientX - offsetX);
        const mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here
        const dx = mouseX - startX;
        const dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;

        const text = texts[selectedText];
        text.x += dx;
        text.y += dy;
        draw();
    }


    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={800}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
        />
    )
}