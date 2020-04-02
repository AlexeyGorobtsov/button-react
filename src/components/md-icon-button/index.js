import React, {useRef, useEffect, useReducer} from 'react';
import className from 'classnames';

import './style.css';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
    id: 0,
    idTimeout: 0,
    scaled: {},
    remove: {},
    active: {},
    mdRipple: [],
    tooltipStyle: {},
    tooltipClass: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_ICON_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SET_SCALED': {
            return {
                ...state,
                scaled: {...state.scaled, ...action.scaled},
                active: {...state.active, ...action.scaled}
            }
        }
        case 'SET_REMOVE': {
            return {
                ...state,
                remove: {...state.remove, ...action.remove}
            }
        }
        case 'SET_ACTIVE': {
            return {
                ...state,
                active: {...state.active, ...action.active}
            }
        }
        case 'RESET': {
            return { ...initialState, tooltipStyle: state.tooltipStyle, tooltipClass: state.tooltipClass};
        }
        case 'SET_MD_RIPPLE_STYLE' : {
            return {
                ...state,
                mdRipple: [...state.mdRipple, action.style]
            }
        }
        default : {
            return state;
        }
    }
}

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
    const tooltipRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        mdRipple = [],
        idTimeout = 0,
        id = 0,
        remove = {},
        active = {},
        scaled = {},
        tooltipClass,
        tooltipStyle
    } = state;

    useEffect(() => {
        return () => {
            clearTimeout(idTimeout);
            dispatch({type: 'RESET'})
        }
    }, []);

    function handleMouseover() {
        const btn = btnRef.current;
        const pos = btn.getBoundingClientRect();
        const tooltip = tooltipRef.current;
        let styleTooltip;
        switch (position) {
            case 'top': {
                const top = `${pos.top - tooltip.offsetHeight}px`;
                const left = `${pos.left - (tooltip.offsetWidth - pos.width) / 2}px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
            case 'right': {
                const top = `${pos.top - (tooltip.offsetHeight - pos.height)/2}px`;
                const left = `${pos.left + pos.width }px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
            case 'bottom': {
                const top = `${pos.top + pos.height}px`;
                const left = `${pos.left - (tooltip.offsetWidth - pos.width) / 2}px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
            case 'left': {
                const top = `${pos.top - (tooltip.offsetHeight - pos.height)/2}px`;
                const left = `${pos.left - tooltip.offsetWidth }px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
        }

        const payload = {tooltipClass: 'md-show', tooltipStyle: styleTooltip};
        dispatch({type: 'MD_ICON_UPDATE', payload});
    }

    function handleMouseout() {
        dispatch({type: 'MD_ICON_UPDATE', payload: {tooltipClass: 'md-hide'}})
    }

    function handleMouseDown(e) {
        const ripple = btnRef.current;
        const size = ripple.offsetWidth;
        const styleEl = {
            width: `${size}px`,
            height: `${size}px`,
            top: `${size / 2}px`,
            left: `${size / 2}px`
        };
        dispatch({type: 'SET_MD_RIPPLE_STYLE', style: styleEl});
        delay(0)
            .then((res) => dispatch({
                type: 'SET_SCALED',
                scaled: {[id]: 'md-ripple-scaled'}
            }))
            .then((res) => dispatch({
                type: 'SET_ACTIVE',
                active: {
                    [id]: 'md-ripple-active'
                }
            }))
    }

    function handleMouseUp() {
        clearTimeout(state.idTimeout);
        delay(0)
            .then((res) => delay(300).then(() => {
                dispatch({
                    type: 'SET_REMOVE',
                    remove: {
                        [id]: 'md-ripple-remove'
                    }
                });
            }))
            .then((res) => dispatch({type: 'SET_ACTIVE', active: {[id]: ''}}));
        dispatch({
            type: 'MD_ICON_UPDATE',
            payload: {id: id + 1}
        });

        const idTimeout = setTimeout(function () {
            dispatch({type: 'RESET'})
        }, 600);
        dispatch({type: 'MD_ICON_UPDATE', payload: {idTimeout}})
    }

    return (
        <button
            className={className('md-button md-icon-button md-icon', cn, {'md-raised': mdRaised})}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={handleMouseover}
            onMouseLeave={handleMouseout}
            ref={btnRef}
            style={styleBtn}
            {...events}
        >
            <div className="md-container md-ink-ripple">
                <div className="md-icon"/>
            </div>
            <div className="md-ripple-container" ref={btnRef}>
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