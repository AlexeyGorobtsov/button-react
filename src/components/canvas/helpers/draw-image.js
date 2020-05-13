import React from 'react';

export function drawImage({src, ctx, texts = []}) {
    const image = new Image();
    image.onload = draw;
    image.src = src;

    function draw() {
        ctx.drawImage(image, 0, 0);
        texts.forEach(item => ctx.fillText(item.text, item.x, item.y))
    }

    draw();
}