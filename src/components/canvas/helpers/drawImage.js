import React from 'react';

export function drawImage({src, ctx}) {
    const image = new Image();
    image.onload = drawImage;
    image.src = src;
    console.log({ctx});
    function drawImage() {
        console.log(this);
        ctx.drawImage(this, 0 , 0)
    }
}