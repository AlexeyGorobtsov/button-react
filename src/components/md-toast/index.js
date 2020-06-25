import React, {useEffect, useReducer} from 'react';

import {IconClose} from "./IconClose";
import {MdIconButton} from "../md-icon-button";
import './style.css';

const initialState = {
    ngClass: 'ng-leave ng-leave-active',
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_TOAST_UPDATE': {
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

export function MdToast(props) {
    const {
        content = '',
        isOpen = false,
        close = console.log('close'),
    } = props;


    const [state, dispatch] = useReducer(reducer, initialState);const {
        ngClass
    } = state;

    useEffect(() => {
        !isOpen ? closeToast() : openToast();
    }, [isOpen]);


    function closeToast() {
        dispatch({
            type: 'MD_TOAST_UPDATE',
            payload: {ngClass: 'ng-leave ng-leave-active'}
        });
    }

    function openToast() {
        dispatch({
            type: 'MD_TOAST_UPDATE',
            payload: {ngClass: ''}
        })
    }

    return (
        <div>
            <div className={`md-toast md-bottom md-left ${ngClass}`}>
                <div className="md-toast-content">
                    <span className="md-toast-text">
                        {content}
                    </span>
                    <MdIconButton
                        background="#fff"
                        cn="md-icon-close"
                        events={{onClick: close}}
                    >
                        <IconClose width={18} height={18}/>
                    </MdIconButton>
                </div>
            </div>
        </div>
    )
}