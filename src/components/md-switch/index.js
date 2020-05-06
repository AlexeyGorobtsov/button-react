import React, {useReducer, useRef, useEffect} from 'react';
import classnames from 'classnames';
import './style.css'
import '../../dr.css'
import className from "classnames";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
    id: 0,
    idTimeout: 0,
    mdRipple: [],
    scaled: {},
    remove: {},
    active: {},
    checked: false,
};

const emptyObj = {};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_SWITCH_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SET_ID': {
            return {
                ...state,
                id: action.id
            }
        }
        case 'SET_SCALED': {
            return {
                ...state,
                scaled: {...state.scaled, ...action.scaled}
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
        case 'SET_MD_RIPPLE_STYLE' : {
            return {
                ...state,
                mdRipple: [...state.mdRipple, action.style]
            }
        }
        case 'RESET': {
            return {...initialState, checked: state.checked};
        }
        default : {
            return state;
        }
    }
}

export function MdSwitch(props) {
    const {
        disabled = false,
        events = {},
        label = null,
    } = props;
    const divRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        mdRipple = [],
        idTimeout = 0,
        id = 0,
        remove = {},
        active = {},
        scaled = {},
        checked = false,
    } = state;

    useEffect(() => {
        return () => {
            clearTimeout(idTimeout);
            dispatch({type: 'RESET'})
        }
    }, []);

    async function handleMouseDown(e) {
        const ripple = divRef.current;
        const size = ripple.offsetWidth;
        const styleEl = {
            width: `${size}px`,
            height: `${size}px`,
            top: `${size / 2}px`,
            left: `${size / 2}px`
        };
        await dispatch({type: 'SET_MD_RIPPLE_STYLE', style: styleEl});
        await delay(100);
        dispatch({
            type: 'SET_SCALED',
            scaled: {
                [id]: 'md-ripple-scaled'
            }
        });
        dispatch({
            type: 'SET_ACTIVE',
            active: {
                [id]: 'md-ripple-active'
            }
        });
    }

    async function handleMouseUp() {
        dispatch({
            type: 'SET_ID',
            id: id + 1
        });
        clearTimeout(state.idTimeout);
        const idTimeout = setTimeout(function () {
            dispatch({type: 'RESET'})
        }, 550);
        dispatch({type: 'MD_SWITCH_UPDATE', payload: {idTimeout}});
        await delay(300);
        dispatch({
            type: 'SET_REMOVE',
            remove: {
                [id]: 'md-ripple-remove'
            }
        });
        dispatch({
            type: 'SET_ACTIVE',
            active: {
                [id]: ''
            }
        });

    }

    function handleClick() {
        dispatch({
            type: 'MD_SWITCH_UPDATE',
            payload: {checked: !checked}
        });
    }

    const checkedEvents = disabled ? emptyObj : events;

    return (
        <div
            className={`md-switch ${checked ? "md-checked md-warn" : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            {...checkedEvents}
        >
            <div className="md-container" style={{touchAction: "pan-x"}}>
                <div className="md-bar"/>
                <div className="md-thumb-container">
                    <div className="md-thumb md-ink-ripple">
                        <div className="md-ripple-container" ref={divRef}>
                            {mdRipple.map((el, i) => <div
                                key={i}
                                className={className(`md-ripple md-ripple-placed`,
                                    scaled[i],
                                    remove[i],
                                    active[i]
                                )}
                                style={{...el, background: '#000', borderColor: '#000'}}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md-label">{label}</div>
        </div>
    )
}