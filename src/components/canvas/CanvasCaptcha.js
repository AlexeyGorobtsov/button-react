import React, {useRef} from 'react';
import {useCtx, useRect, useCanvasText} from "./hooks";
import {drawImage} from "./helpers";
import animals from "./images/d.png"

export function CanvasCaptcha(props) {
    const {
        texts = [],
        init = []
    } = props;
    const canvasRef = useRef(null);
    const canvas = canvasRef.current;
    const {offsetX, offsetY} = useRect({canvas});
    const [preparedText] = useCanvasText({canvasRef, texts, init});
    const [ctx] = useCtx({canvasRef, texts: preparedText});

    let startX;
    let startY;

    let selectedText = -1;


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImage({src: animals, ctx, texts: preparedText});
    }

    function textHittest(x, y, textIndex) {
        const text = preparedText[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    }

    function mouseDown(e) {
        e.preventDefault();
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        // Put your mousedown stuff here
        texts.forEach((item, i) => {
            if(textHittest(startX, startY, i)){
                selectedText = i;
            }
        })
    }

    function mouseUp(e) {
        e.preventDefault();
        selectedText = -1;
    }

    function mouseOut(e) {
        e.preventDefault();
        selectedText = -1;
    }

    function mouseMove(e) {
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

        const text = preparedText[selectedText];
        text.x += dx;
        text.y += dy;
        draw();
    }

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={800}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
            onMouseOut={mouseOut}
        />
    )
}