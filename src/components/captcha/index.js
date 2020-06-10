import React, {useEffect, useState, useRef} from 'react';
import {PlusIcon, MinusIcon} from "./svg";

import './style.css'

export function Captcha(props) {
    const {
        src = ''
    } = props;
    const imgRef = useRef(null);
    const [className, setClassName] = useState('');
    useEffect(() => {
        const image = new Image();
        image.onload = function () {
            const height = image.naturalHeight;
            const width  = image.naturalWidth;
            const range = width/height;
            range > 3 ? setClassName('captcha-full-size') : setClassName('');
        };
        image.src = src;
    }, []);

    function zoom(zoomIncrement) {
        const img = imgRef.current;
        if (!img) return;
        const {width, height} = img.getBoundingClientRect();
        img.style.width = (width * zoomIncrement) + 'px';
        img.style.height = (height * zoomIncrement) + 'px';
    }

    let startX;
    let startY;
    let selectedImage = -1;

    function mouseDown(e) {
        e.preventDefault();
        const img = imgRef.current;
        if (!img) return;
        startX = parseInt(e.clientX - img.offsetLeft);
        startY = parseInt(e.clientY - img.offsetTop);
        selectedImage = 1;
    }

    function mouseMove(e) {
        const img = imgRef.current;
        if (!img || selectedImage < 0) return;
        const left = e.pageX - startX;
        const top = e.pageY - startY;
        img.style.left = left + 'px';
        img.style.top = top + 'px';
    }

    function mouseUp(e) {
        e.preventDefault();
        selectedImage = -1;
    }

    function mouseOut(e) {
        e.preventDefault();
        selectedImage = -1;
    }

    return (
        <div
            className={className}
            className="captcha-container"
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
            onMouseOut={mouseOut}
        >
            <img
                className={`captcha-img ${className}`}
                src={src}
                ref={imgRef}
                onMouseDown={mouseDown}
                className="captcha-img"
                draggable={false}
            />
            <div className="wrap-button" draggable={false}>
                <button className="zoom-in" onClick={() => zoom(1.1)}>
                    <PlusIcon />
                </button>
                <div className="zoom-hr" />
                <button className="zoom-out" onClick={() => zoom(.9)}>
                    <MinusIcon />
                </button>
            </div>
        </div>
    )
}