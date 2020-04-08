import React, {useReducer, useRef} from 'react';
import className from "classnames";

import {MdCheckboxList} from "./MdCheckboxList";

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
        case 'MD_LIST_UPDATE': {
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
            return {...initialState, tooltipStyle: state.tooltipStyle, tooltipClass: state.tooltipClass};
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

export function MdItem(props) {
    const {
        events = {},
        itemList = '',
        idsCheckbox = [],
    } = props;
    const btnRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        mdRipple = [],
        id = 0,
        remove = {},
        active = {},
        scaled = {},
    } = state;

    function handleMouseDown(e) {
        const ripple = btnRef.current;
        const pos = ripple.getBoundingClientRect();
        const styleEl = {
            width: `${pos.width * 2}px`,
            height: `${pos.width * 2}px`,
            top: `${e.pageY - pos.top}px`,
            left: `${e.pageX - pos.left}px`
        };
        dispatch({type: 'SET_MD_RIPPLE_STYLE', style: styleEl});
        delay(0)
            .then(() => dispatch({
                type: 'SET_SCALED',
                scaled: {[id]: 'md-ripple-scaled'}
            }))
            .then(() => dispatch({
                type: 'SET_ACTIVE',
                active: {
                    [id]: 'md-ripple-active'
                }
            }))
    }

    function handleMouseUp() {
        clearTimeout(state.idTimeout);
        delay(0)
            .then((res) => delay(400).then(() => {
                dispatch({
                    type: 'SET_REMOVE',
                    remove: {
                        [id]: 'md-ripple-remove'
                    }
                });
            }))
            .then((res) => dispatch({type: 'SET_ACTIVE', active: {[id]: ''}}));
        dispatch({
            type: 'MD_LIST_UPDATE',
            payload: {id: id + 1}
        });

        const idTimeout = setTimeout(function () {
            dispatch({type: 'RESET'})
        }, 600);
        dispatch({type: 'MD_LIST_UPDATE', payload: {idTimeout}})
    }

    return (
        <div
            className="md-list-item md-proxy-focus md-with-secondary md-clickable"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            ref={btnRef}
            {...events}
        >
            <div className="md-no-style md-list-item-inner">
                <p> {itemList} </p>
                <div className="md-secondary-container">
                    <MdCheckboxList itemList={itemList} idsCheckbox={idsCheckbox}/>
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
            </div>
        </div>
    )
}