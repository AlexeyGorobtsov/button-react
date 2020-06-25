import React, {useEffect, useReducer, useRef} from 'react';

const initialState = {
    id: 0,
    idTimeout: 0,
    mdRipple: [],
    scaled: {},
    remove: {},
    active: {},
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

export function useMdRipple() {

    const divRef = useRef(null);
    const [stateRipple, dispatch] = useReducer(reducer, initialState);
    const {
        idTimeout = 0,
        id = 0,
    } = stateRipple;

    useEffect(() => {
        return () => {
            clearTimeout(idTimeout);
        }
    }, [idTimeout]);

    async function mouseDown() {
        const ripple = divRef.current;
        const size = ripple.offsetWidth;
        const styleEl = {
            width: `${size}px`,
            height: `${size}px`,
            top: `${size / 2}px`,
            left: `${size / 2}px`
        };
        await dispatch({type: 'SET_MD_RIPPLE_STYLE', style: styleEl});
        await delay(0);
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

    async function mouseUp() {
        dispatch({
            type: 'SET_ID',
            id: id + 1
        });
        clearTimeout(stateRipple.idTimeout);
        const idTimeout = setTimeout(function () {
            dispatch({type: 'RESET'})
        }, 550);
        dispatch({type: 'MD_RIPPLE_UPDATE', payload: {idTimeout}});
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

    return {
        mouseDown,
        mouseUp,
        stateRipple,
        divRef
    }
}