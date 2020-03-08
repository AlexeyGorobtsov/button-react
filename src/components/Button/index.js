import React, {useState} from 'react';

import './style.css'
import './dr.css'

export function Button(props) {
    const {children = null} = props;
    const [id, setId] = useState(0);
    const [spanStyle, setSpanStyle] = useState([]);

    function handleMouseDown(e) {
        const ripple = e.target;
        const eWidth = ripple.clientWidth;
        const eHeight = ripple.clientHeight;
        const elSize = Math.max(eWidth, eHeight);
        const rippleX = parseInt(e.pageX - ripple.offsetLeft) - (elSize / 2);
        const rippleY = parseInt(e.pageY - ripple.offsetTop) - (elSize / 2);
        const styleEl = {width: `${elSize}px`, height: `${elSize}px`, top: `${rippleY}px`, left: `${rippleX}px`};
        setSpanStyle([...spanStyle, styleEl]);
    }

    function handleMouseUp() {
        clearTimeout(id);
        const idTimeout = setTimeout(function () {
            setSpanStyle([]);
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
                {spanStyle.map((el, i) => <span
                    key={i}
                    className={'ripple animated'}
                    style={el}
                />)}
            </div>
            {children}
        </button>

    )
};