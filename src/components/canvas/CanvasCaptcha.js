import React from 'react';
import {useCaptchaCanvas} from "./hooks/useCaptchaCanvas";

import animals from './images/animals.png';

export function CanvasCaptcha(props) {
    const [canvasRef] = useCaptchaCanvas({src: animals});
    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={e => console.log(e.clientX)}
            onDrag={e => console.log(e)}
        />
    )
}