import React, {useEffect, useState} from 'react';

import './style.css';

export function MdRipple(props) {

    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
        divRef = null,
        backgroundRipple = '#000',
        backgroundContainer = 'rgba(255, 82, 82, .1)',
        isMdRippleContainer = false
    } = props;
    const isShow = isMdRippleContainer && active[0] && !remove[0];
    return(
        <div className="md-ripple-container" style={{backgroundColor: isShow ? backgroundContainer : ''}} ref={divRef}>
            {mdRipple.map((el, i) => (
                <div
                    key={i}
                    className={`md-ripple md-ripple-placed ${scaled[i] || ''} ${remove[i] || ''} ${active[i] || ''}`
                    }
                    style={{...el, background: backgroundRipple, borderColor: '#000'}}
                />
            ))}
        </div>
    )
}