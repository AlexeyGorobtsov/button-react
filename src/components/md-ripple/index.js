import React from 'react';

import './style.css';

export function MdRipple(props) {

    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
        divRef = null,
        background = '#000',
    } = props;

    return(
        <div className="md-ripple-container" ref={divRef}>
            {mdRipple.map((el, i) => (
                <div
                    key={i}
                    className={
                        `md-ripple md-ripple-placed
                    ${scaled[i] || ''}
                    ${remove[i] || ''}
                    ${active[i] || ''}`
                    }
                    style={{...el, background, borderColor: '#000'}}
                />
            ))}
        </div>
    )
}