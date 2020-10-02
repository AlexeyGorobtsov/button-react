import React from 'react';

import './style.css';

export function RoundSpinner({ size }) {
    return (
        <div
            style={{ fontSize: size }}
            className="loader"
        >Loading...
        </div>
    );
}
