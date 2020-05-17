import React from 'react';
import classNames from 'classnames';

import './style.css';

export function Badge(props) {
    const {
        label = '',
        cn = ''
    } = props;

    return (
        <span
            className={classNames(`
            scroll-number 
            badge-status-processing
            badge-count 
            badge-multiple-words
            ${cn}`, {'more-than-nine': label > 9})}
        >
            {label}
        </span>
    )
}