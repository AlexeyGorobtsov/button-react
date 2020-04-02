import React, {useRef, useReducer} from 'react';
import className from "classnames";

import './style.css';

const initialState = {
    tooltipStyle: {},
    tooltipClass: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_TOOLTIP_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default : {
            return state;
        }
    }
}

export function MdTooltip(props) {
    const {
        children = null,
        tooltipLabel = null,
        isEllipses = false,
    } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const tooltipRef = useRef(null);
    const spanRef = useRef(null);
    const { tooltipClass, tooltipStyle } = state;

    function handleMouseover() {
        const ripple = spanRef.current;
        const pos = ripple.getBoundingClientRect();
        const tooltip = tooltipRef.current;
        const top = `${pos.top - tooltip.offsetHeight}px`;
        const left = `${pos.left - (tooltip.offsetWidth - pos.width) / 2}px`;
        const styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
        const payload = {tooltipClass: 'md-show', tooltipStyle: styleTooltip};
        dispatch({type: 'MD_TOOLTIP_UPDATE', payload});
    }

    function handleMouseout() {
        dispatch({type: 'MD_TOOLTIP_UPDATE', payload: {tooltipClass: 'md-hide'}})
    }

    return(
        <>
        <span
            ref={spanRef}
            onMouseOver={handleMouseover}
            onMouseOut={handleMouseout}
            className={className({'ellipse': isEllipses})}
        >
            {children}
        </span>
            <div
                className={className('md-panel-outer-wrapper')}
                style={{pointerEvents: "none", zIndex: 100}}>
                <div
                    ref={tooltipRef}
                    className={className('md-panel md-origin-top md-tooltip md-show-add', tooltipClass)}
                    role="tooltip"
                    style={tooltipStyle}>
                    {tooltipLabel}
                </div>
            </div>
        </>
    )
}