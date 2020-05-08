import React, {useRef, useEffect, useReducer} from 'react';
import className from 'classnames';

import {useMdRippleContainer} from "../use-md-ripple-container";
import './style.css';
import {useMdTooltip} from "../use-md-tootltip";

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
            <div className="md-ripple-container" ref={divRef}>
                {mdRipple.map((el, i) => (
                    <div
                        key={i}
                        className={className(`md-ripple md-ripple-placed`,
                            scaled[i],
                            remove[i],
                            active[i]
                        )}
                        style={{...el, background: '#000', borderColor: '#000'}}
                    />))}
            </div>
            {children}
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
        </button>

    )
}