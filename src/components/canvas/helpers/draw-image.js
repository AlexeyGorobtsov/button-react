import React from 'react';
const ref = {};

export function drawImage({src, ctx, texts = []}) {
    if(!ref.isFirst) {
        ref.isFirst = true;
        ref.src = src;
        const image = new Image();
        image.onload = draw;
        image.src = src;
        ref.image = image;
    }

    if(ref.src !== src) {
        const image = new Image();
        image.onload = draw;
        image.src = src;
        ref.image = image;
    }


    function draw() {
        ctx.drawImage(ref.image, 0, 0);
        texts.forEach(item => ctx.fillText(item.text, item.x, item.y));
    }
     draw();
}