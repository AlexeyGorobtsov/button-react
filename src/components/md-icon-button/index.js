import React, {useState, useRef, useEffect} from 'react';
import className from 'classnames';

import './style.css'

export function IconButton(props) {
    const {
        children = null,
        mdRaised = false,
        bgRipple = '#212121',
        styleBtn = {},
        cn = {},
        events = {}
    } = props;
    const [id, setId] = useState(0);
    const [spanStyle, setSpanStyle] = useState([]);
    const btnRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(id)
    }, []);

    function handleMouseDown(e) {
        const ripple = btnRef.current;
        const pos = ripple.getBoundingClientRect();
        const size = ripple.offsetWidth;
        const styleEl = {
            width: `${size}px`,
            height: `${size}px`,
            top: `${size/pos.height}px`,
            left: `${size/pos.width}px`
        };
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
            className={className(
                'md-button md-button-toggle md-icon-button',
                cn,
                'ripple-effect',
                {'md-raised': mdRaised}
                )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            ref={btnRef}
            style={styleBtn}
            {...events}
        >
            {spanStyle.map((el, i) => <span
                key={i}
                className={className('ripple', 'animated')}
                style={{...el, background: bgRipple}}
            />)}
            {children}
        </button>

    )
}