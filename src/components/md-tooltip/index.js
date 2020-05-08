import React, {useRef} from 'react';
import className from "classnames";
import {useMdTooltip} from "../use-md-tootltip";


export function MdTooltip(props) {
    const {
        children = null,
        tooltipLabel = null,
        isEllipses = false,
        position = 'top',
    } = props;

    const spanRef = useRef(null);
    const { mouseOut, mouseOver, stateTooltip, tooltipRef } = useMdTooltip({ref: spanRef, position});

    const {tooltipClass, tooltipStyle} = stateTooltip;

    return(
        <>
        <span
            ref={spanRef}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            className={className({'ellipse': isEllipses})}
        >
            {children}
        </span>
            <div
                className={className('md-panel-outer-wrapper')}
                style={{pointerEvents: "none", zIndex: 100}}>
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
        </>
    )
}