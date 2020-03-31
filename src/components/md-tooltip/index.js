import React from 'react';
import className from "classnames";

export function MdTooltip(props) {
    return(
        <div
            className={className('md-panel-outer-wrapper')}
            style={{pointerEvents: "none", zIndex: 100}}>
            <div
                ref={tooltipRef}
                className={className('md-panel md-origin-top md-tooltip md-show-add', tooltipClass)}
                role="tooltip"
                style={tooltipStyle}>
                Insert Drive
            </div>
        </div>
    )
}