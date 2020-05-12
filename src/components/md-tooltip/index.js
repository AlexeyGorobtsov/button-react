import React, {useRef} from 'react';
import className from "classnames";
import {useMdTooltip} from "../../hooks/use-md-tootltip";
import {MdTooltipContainer} from "../md-tooltip-container";


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
        <MdTooltipContainer
            position={position}
            tooltipRef={tooltipRef}
            tooltipLabel={tooltipLabel}
            tooltipStyle={tooltipStyle}
            tooltipClass={tooltipClass}
        />
        </>
    )
}