import React from 'react';

import './style.css';

export function Timeline({steps = []}) {
    return (
        <ul className="vcv-timeline">
            {steps.map((item, i) => (
                <li key={i} className={`vcv-timeline-item ${item.done}`} data-step={i+1} data-step-title={item.step}>
                    <span>{item.step}</span>
                </li>
            ))}
        </ul>
    )
}