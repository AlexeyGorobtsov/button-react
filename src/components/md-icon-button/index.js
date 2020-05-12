import React, {useRef, useEffect, useReducer} from 'react';
import className from 'classnames';

import {useMdRippleContainer} from "../../hooks/use-md-ripple-container";
import './style.css';
import {useMdTooltip} from "../../hooks/use-md-tootltip";
import {MdRippleContainer} from "../md-ripple-container";
import {MdTooltipContainer} from "../md-tooltip-container";

export function IconButton(props) {
    const {
        children = null,
        mdRaised = false,
        styleBtn = {},
        cn = {},
        events = {},
        tooltipLabel = '',
        position = 'top'
    } = props;
    const btnRef = useRef(null);
    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRippleContainer();
    const { mouseOut, mouseOver, stateTooltip, tooltipRef } = useMdTooltip({ref: btnRef, position});
    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;
    const {tooltipClass, tooltipStyle} = stateTooltip;

    return (
        <button
            className={className('md-button md-icon-button md-icon', cn, {'md-raised': mdRaised})}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            ref={btnRef}
            style={styleBtn}
            {...events}
        >
            <div className="md-container md-ink-ripple">
                <div className="md-icon"/>
            </div>
            <MdRippleContainer
                mdRipple={mdRipple}
                remove={remove}
                active={active}
                scaled={scaled}
                divRef={divRef}
            />
            {children}
            <MdTooltipContainer
                position={position}
                tooltipRef={tooltipRef}
                tooltipLabel={tooltipLabel}
                tooltipStyle={tooltipStyle}
                tooltipClass={tooltipClass}
            />
        </button>

    )
}