import React from 'react';
import {SpinIcon} from "./SpinIcon";

import './style.css'
export function Message(props) {
    const {
        messages = [],
    } = props;
    return (
        <div className="message">
            <div>
                {messages.map((item, i) => (
                    <div className="message-notice" key={i}>
                        <div className="message-notice-content">
                            <div className="message-loading">
                            <span role="img" aria-label="loading" className="icon icon-loading">
                                <SpinIcon />
                            </span>
                                <span>{item}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}