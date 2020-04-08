import React, {useState, useEffect, useRef, useReducer} from 'react';
import className from "classnames";

import './style.css'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
    id: 0,
    idTimeout: 0,
    mdRipple: [],
    scaled: {},
    remove: {},
    active: {}
};
const emptyObj = {};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_CHECKBOX_UPDATE': {
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
            return initialState;
        }
        default : {
            return state;
        }
    }
}

export function MdCheckboxList(props) {

    const {
        events = {},
        disabled = false,
        idsCheckbox = [],
        itemList = ''
    } = props;
    const [checked, setChecked] = useState(false);
    const divRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        mdRipple = [],
        idTimeout = 0,
        id = 0,
        remove = {},
        active = {},
        scaled = {}
    } = state;

    useEffect(() => {
        return () => {
            clearTimeout(idTimeout);
            dispatch({type: 'RESET'})
        }
    }, []);
    useEffect(() => {
        setChecked(idsCheckbox.includes(itemList));
    }, [idsCheckbox]);

    function handleMouseDown(e) {
        const ripple = divRef.current;
        const size = ripple.offsetWidth;
        const styleEl = {
            width: `${size}px`,
            height: `${size}px`,
            top: `${size / 2}px`,
            left: `${size / 2}px`
        };
        dispatch({type: 'SET_MD_RIPPLE_STYLE', style: styleEl});
        delay(0).then((res) => {
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
        });
    }

    function handleMouseUp() {
        delay(0).then((res) => delay(300)
            .then(() => {
                dispatch({
                    type: 'SET_REMOVE',
                    remove: {
                        [id]: 'md-ripple-remove'
                    }
                });
            }))
            .then((res) =>
                dispatch({
                    type: 'SET_ACTIVE',
                    active: {
                        [id]: ''
                    }
                })
            );
        dispatch({
            type: 'SET_ID',
            id: id + 1
        });
        clearTimeout(state.idTimeout);
        const idTimeout = setTimeout(function () {
            dispatch({type: 'RESET'})
        }, 550);
        dispatch({type: 'MD_CHECKBOX_UPDATE', payload: {idTimeout}})
    }

    const checkedEvents = disabled ? emptyObj : events;

    return (
        <div
            className={className('md-checkbox', {'md-checked': checked, 'md-checkbox-disabled': disabled})}
            onMouseDown={!disabled ? handleMouseDown : null}
            onMouseUp={!disabled ? handleMouseUp : null}
            {...checkedEvents}
        >
            <div className="md-container md-ink-ripple">
                <div className="md-icon"/>
            </div>
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
    )
}