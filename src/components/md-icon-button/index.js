import React, {useRef} from 'react';
import className from 'classnames';

import {useMdRipple} from "../../hooks/use-md-ripple";
import {useMdTooltip} from "../../hooks/use-md-tootltip";
import {MdRipple} from "../md-ripple";
import {MdTooltipContainer} from "../md-tooltip-container";
import {isEmpty} from "../../helpers";
import './style.css';

export function MdIconButton(props) {
    const {
        children = null,
        mdRaised = false,
        styleBtn = {},
        cn = {},
        events = {},
        tooltipLabel = '',
        position = 'top',
        offset = 0,
        background,
        disabled = false,
    } = props;
    const btnRef = useRef(null);
    const isShowTooltip = !isEmpty(tooltipLabel) && !disabled;
    const {mouseDown, mouseUp, stateRipple, divRef} = useMdRipple();
    const {mouseOut, mouseOver, stateTooltip, tooltipRef} = useMdTooltip({
        ref: btnRef,
        position,
        offset,
        isShow: isShowTooltip
    });
    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;
    const {tooltipClass, tooltipStyle} = stateTooltip;

    return (
        <>
            <button
                className={className('md-button md-icon-button md-icon', cn, {'md-raised': mdRaised})}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseOver={mouseOver}
                onMouseOut={mouseOut}
                ref={btnRef}
                style={styleBtn}
                {...events}
                disabled={disabled}
            >
                <div className="md-container md-ink-ripple">
                    <div className="md-icon"/>
                </div>
                <MdRipple
                    mdRipple={mdRipple}
                    remove={remove}
                    active={active}
                    scaled={scaled}
                    divRef={divRef}
                    backgroundRipple={background}
                />
                {children}
            </button>
            <MdTooltipContainer
                position={position}
                tooltipRef={tooltipRef}
                tooltipLabel={tooltipLabel}
                tooltipStyle={tooltipStyle}
                tooltipClass={tooltipClass}
                isShowTooltip={isShowTooltip}
            />
        </>

    )
}