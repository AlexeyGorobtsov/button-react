import React from 'react';
import { RoundSpinner } from '../round-spiner';

import './style.css';

export const Loader = (props) => {
    const {
        header = 'Пожалуйста, подождите',
        description = 'Профиль загружается',
        isShow = false,
        size = '10px',
        isBackground = false,
    } = props;

    if (!isShow) return [];

    return (
        <div className={`wrap-loader ${isBackground ? 'container-loader' : '' }`}>
            <RoundSpinner size={size} />
            <div className="loader-header">{header}</div>
            <div className="loader-description">{description}</div>
        </div>
    );
};
