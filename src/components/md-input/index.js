import React, {useEffect, useReducer, useRef} from 'react';
import {delay} from "../../helpers";

import './style.css';

const initialState = {
    hasValue: '',
    hasFocus: '',
    hasInvalid: '',
    isHideMessage: '',
    styleMessage: {},
    isTouched: false,
};

function reducer(state, action) {

    switch (action.type) {
        case 'MD_INPUT_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

export function MdInput(props) {
    const {
        events = {},
        label = 'label',
        validation = () => {},
        message = '',
    } = props;
    const inputRef = useRef(null);
    const [stateInput, dispatch] = useReducer(reducer, initialState);
    const {
        hasValue,
        hasFocus,
        hasInvalid,
        isHideMessage,
        styleMessage,
        isTouched,
    } = stateInput;

    useEffect(() => {
        const input = inputRef.current;
        if (input.value.length) {
            dispatch({
                type: 'MD_INPUT_UPDATE',
                payload: {hasValue: 'md-input-has-value'}
            });
        }
    }, []);

    function onFocus() {
        dispatch({
            type: 'MD_INPUT_UPDATE',
            payload: {hasFocus: 'md-input-focused'}
        });
    }

    function validationStep(isInvalid) {
        if (isInvalid) {
            dispatch({
                type: 'MD_INPUT_UPDATE',
                payload: {
                    isHideMessage: '',
                    styleMessage: {marginTop: "0px", opacity: 1, transition: "all 0.3s linear 0s"},
                    hasInvalid: 'md-input-invalid'
                }
            });


        } else {
            dispatch({
                type: 'MD_INPUT_UPDATE',
                payload: {hasInvalid: '', styleMessage: {}}
            });

            dispatch({
                type: 'MD_INPUT_UPDATE',
                payload: {isHideMessage: 'hide-message'}
            })
        }
    }

    function onBlur(e) {
        const isInvalid = validation(e.target.value, label) || false;
        dispatch({
            type: 'MD_INPUT_UPDATE',
            payload: {isTouched: true}
        });
        validationStep(isInvalid);

        if (e.target.value.length) {
            return dispatch({
                type: 'MD_INPUT_UPDATE',
                payload: {hasValue: 'md-input-has-value', hasFocus: ''}
            });
        }
        dispatch({
            type: 'MD_INPUT_UPDATE',
            payload: {hasValue: '', hasFocus: ''}
        });
    }

    function onInput(e) {
        if(!isTouched) return;
        const isInvalid = validation(e.target.value, label) || false;
        validationStep(isInvalid)
    }

    return (
        <div
            className={`md-input-container md-icon-float md-block ${hasValue} ${hasFocus} ${hasInvalid}`}
        >
            <label>{label}</label>
            <input
                type="text"
                className="md-input"
                onFocus={onFocus}
                onBlur={onBlur}
                onInput={onInput}
                {...events}
                ref={inputRef}
            />
            <div className="md-errors-spacer"/>
            <div role="alert"
                 className="md-input-messages-animation md-auto-hide"
            >
                <div
                    className={`md-input-message-animation ${isHideMessage}`}
                    style={styleMessage}
                >
                    {message}
                </div>
            </div>
        </div>
    )
}