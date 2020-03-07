import React, {useState} from 'react';

import './style.css'
export function Button() {
    const [id, setId] = useState(0);
    const [span, setSpan] = useState([]);

    function handleMouseDown(e) {
        const self = e.target;
        const eWidth = self.clientWidth;
        const eHeight = self.clientHeight;
        const elSize = Math.max(eWidth, eHeight);
        const rippleX = parseInt(e.pageX - self.offsetLeft) - (elSize / 2);
        const rippleY = parseInt(e.pageY - self.offsetTop) - (elSize / 2);
        const styleEl = {width: `${elSize}px`, height: `${elSize}px`, top: `${rippleY}px`, left: `${rippleX}px`};
        setSpan([...span, styleEl]);
    }

    function handleMouseUp(e) {
        clearTimeout(id);
        const idTimeout = setTimeout(function () {
            setSpan([]);
        }, 2000);
        setId(idTimeout)
    }

    return (

        <button
            className="rkmd-btn btn-lightBlue ripple-effect"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div>
                {span.map((el, i) => <span
                    key={i}
                    className={'ripple animated'}
                    style={el}
                />)}
            </div>
            Submit
        </button>

    )
};