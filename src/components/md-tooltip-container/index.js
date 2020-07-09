import React from 'react';
import className from "classnames";

import './style.css';

export function MdTooltipContainer(props) {

    const {
        position = 'top',
        tooltipRef = null,
        tooltipLabel = '',
        tooltipStyle = {},
        tooltipClass = '',
        isShowTooltip = true,
    } = props;

    if (!isShowTooltip) return [];

    return (
        <div
            className={className('md-panel-outer-wrapper')}
            style={{pointerEvents: "none", zIndex: 100}}
        >
            <div
                ref={tooltipRef}
                className={className(
                    'md-panel md-tooltip md-show-add',
                    tooltipClass,
                    {'md-origin-top': position === 'top'},
                    {'md-origin-left': position === 'left'},
                    {'md-origin-bottom': position === 'bottom'},
                    {'md-origin-right': position === 'right'}
                )}
                role="tooltip"
                style={tooltipStyle}>
                {tooltipLabel}
            </div>
        </div>
    )
}