import React, {useReducer, useEffect } from 'react';

import {Menu} from "./svg/menu";
import {useMdRipple} from "../../hooks/use-md-ripple";
import {MdRipple} from "../md-ripple";
import {OutsideClickEvent} from "../outside-click-event";
import './style.css';

const initialState = {
    mdFabActionItemLeft: [
        {transform: 'translateX(64px)'},
        {transform: 'translateX(120px)'},
        {transform: 'translateX(176px)'},
    ],
    mdFabActionItemRight: [
        {transform: 'translateX(-64px)'},
        {transform: 'translateX(-120px)'},
        {transform: 'translateX(-176px)'},
    ],
    mdFabActionItem: [
        {transform: ''},
        {transform: ''},
        {transform: ''},
    ],
    isOpen: true,
    isFirst: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_FAB_SPEED_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export function MdFabSpeed(props) {
    const {
        backgroundRipple = '#000',
        cn = '',
        mdFabItems = [],
        position = 'left'
    } = props;
    const [stateFab, dispatch] = useReducer(reducer, initialState);
    const {mouseDown, mouseUp, stateRipple, divRef} = useMdRipple();
    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;

    const {
        mdFabActionItem = [],
        isOpen = false,
        isFirst,
    } = stateFab;

    const mdFabPosition = position === 'left' ? initialState.mdFabActionItemLeft : initialState.mdFabActionItemRight;

    useEffect(() => {
        dispatch({
            type: 'MD_FAB_SPEED_UPDATE',
            payload: {
                mdFabActionItem: mdFabPosition,
                isFirst: true,
            }
        })
    }, [position]);

    function clickMdFabTrigger() {
        if (isOpen) {
            return dispatch({
                type: 'MD_FAB_SPEED_UPDATE',
                payload: {
                    mdFabActionItem: [
                        {transform: ''},
                        {transform: ''},
                        {transform: ''},
                    ],
                    isOpen: false
                }
            })
        }

        return dispatch({
            type: 'MD_FAB_SPEED_UPDATE',
            payload: {
                mdFabActionItem: mdFabPosition,
                isOpen: true
            }
        })
    }

    function closeMdFab() {
        dispatch({
            type: 'MD_FAB_SPEED_UPDATE',
            payload: {
                mdFabActionItem: mdFabPosition,
                isOpen: true,
            },
        });
    }

    return (
        <OutsideClickEvent callback={closeMdFab} >
            <div
                className={`md-fab-speed-dial md-fling ${position === 'left' ? 'md-left' : 'md-right' } ${cn}`}>
                <div className="md-fab-trigger" style={{zIndex: 24}}>
                    <button
                        className="md-fab md-warn md-button md-ink-ripple"
                        type="button"
                        aria-label="menu"
                        onMouseDown={mouseDown}
                        onMouseUp={mouseUp}
                        onClick={clickMdFabTrigger}
                    >
                        <Menu/>
                        <MdRipple
                            mdRipple={mdRipple}
                            remove={remove}
                            active={active}
                            scaled={scaled}
                            divRef={divRef}
                            backgroundRipple={backgroundRipple}
                        />
                    </button>
                </div>
                <div
                    className="md-fab-actions"
                    aria-hidden="true">
                    {mdFabItems.map((item, key) => {
                        const mdFabItem = isFirst ? mdFabActionItem : mdFabPosition;
                        return (
                            <div
                                className="md-fab-action-item"
                                style={{opacity: 1, zIndex: 23 - key, transform: mdFabItem[key].transform}}
                                key={key}
                            >
                                <button
                                    className="md-fab md-raised md-mini md-button"
                                    onClick={() => {
                                        item.action && item.action();
                                        if (item.isNotHide) return;
                                        clickMdFabTrigger();
                                    }}
                                >
                                    {item.component}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </OutsideClickEvent>
    )
}