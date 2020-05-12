import React from 'react';
import className from "classnames";

import './style.css';

export function MdRippleContainer(props) {

    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
        divRef = null,
    } = props;

    return(
        <div className="md-ripple-container" ref={divRef}>
            {mdRipple.map((el, i) => <div
                key={i}
                className={className(`md-ripple md-ripple-placed`,
                    scaled[i],
                    remove[i],
                    active[i]
                )}
                style={{...el, background: '#000', borderColor: '#000'}}
            />)}
        </div>
    )
}