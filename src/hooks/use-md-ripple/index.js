import React, {useEffect, useReducer, useRef} from 'react';

import {delay} from "../../helpers";

const initialState = {
    id: 0,
    idTimeout: 0,
    mdRipple: [],
    scaled: {},
    remove: {},
    active: {},
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_RIPPLE_UPDATE': {
            return {
                ...state,
                ...action.payload,
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
            return {...initialState};
        }
        default : {
            return state;
        }
    }
}

export function useMdRipple(params) {
    const {isIconRipple = false } = params || {}
    const divRef = useRef(null);
    const [stateRipple, dispatch] = useReducer(reducer, initialState);
    const {
        idTimeout = 0,
        id = 0,
    } = stateRipple;

    useEffect(() => {
        return () => clearTimeout(idTimeout);

    }, [idTimeout]);

    async function mouseDown(e) {
        const ripple = divRef.current;
        let styleEl;
        if(isIconRipple) {
            const pos = ripple.getBoundingClientRect();
            const widthMiddle = pos.width / 2;
            const relativeMiddle = pos.left + widthMiddle;
            const relative = e.pageX - relativeMiddle;
            const width = ripple.offsetWidth + Math.abs(relative) * 2.1;
            const x = e.pageX - pos.left;
            const y = e.pageY - pos.top;
            styleEl = {
                width: `${width}px`,
                height: `${width}px`,
                top: `${y}px`,
                left: `${x}px`
            };
        } else {
            const width = ripple.offsetWidth;
            const middle = width/2;
            styleEl = {
                width: `${width}px`,
                height: `${width}px`,
                top: `${middle}px`,
                left: `${middle}px`
            }
        }

        await dispatch({type: 'SET_MD_RIPPLE_STYLE', style: styleEl});
        dispatch({
            type: 'SET_ACTIVE',
            active: {
                [id]: 'md-ripple-active'
            }
        });
        await delay(30);
        dispatch({
            type: 'SET_SCALED',
            scaled: {
                [id]: 'md-ripple-scaled',
            }
        });

    }

    async function mouseUp() {
        dispatch({
            type: 'SET_ID',
            id: id + 1
        });
        clearTimeout(stateRipple.idTimeout);
        const idTimeout = setTimeout(function () {
            dispatch({type: 'RESET'})
        }, 500);
        dispatch({type: 'MD_RIPPLE_UPDATE', payload: {idTimeout}});
        await delay(200);
        dispatch({
            type: 'SET_REMOVE',
            remove: {
                [id]: 'md-ripple-remove'
            }
        });
        await delay(100)
        dispatch({
            type: 'SET_ACTIVE',
            active: {
                [id]: ''
            },
            remove: {
                [id]: ''
            }
        });
    }

    return {
        mouseDown,
        mouseUp,
        stateRipple,
        divRef
    }
}