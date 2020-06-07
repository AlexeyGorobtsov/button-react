import React, {useReducer} from "react";
import {delay} from "../../helpers";

const initialState = {
    open: 'mdc-drawer--open',
    closing: '',
    animate: '',
    opening: '',
    isOpen: true
};

function reducer(state, action) {
    switch(action.type) {
        case 'MD_DRAWER_UPDATE': {
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

export function useDrawer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        opening,
        closing,
        animate,
        open,
        isOpen
    } = state;

    async function menuClick() {
        if(isOpen) {
            await dispatch({
                type: 'MD_DRAWER_UPDATE',
                payload: { closing: 'mdc-drawer--closing'}
            });
            await delay(120);
            dispatch({
                type: 'MD_DRAWER_UPDATE',
                payload: {open: ''}
            });
            return dispatch({
                type: 'MD_DRAWER_UPDATE',
                payload: {isOpen: false, closing: ''}
            })
        }
        dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: {open: 'mdc-drawer--open'}
        });
        dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: { animate: 'mdc-drawer--animate' },
        });
        await delay(50);
        dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: { opening: 'mdc-drawer--opening' },
        });
        await delay(160);
        await dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: { animate: '' },
        });
        return dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: { isOpen: true, opening: '' },
        });

    }

    return {
        opening,
        closing,
        animate,
        open,
        isOpen,
        menuClick
    }
}