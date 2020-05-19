import React, {useReducer} from 'react';

import {SearchIcon} from "./search-icon";
import {useClientRect} from "../../hooks/use-client-react/use-client-rect";
import './style.css';

const initialState = {
    width: '200px',
    style: {},
    focus: '',
    active: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'GM_SEARCH_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state
        }
    }
}

export function GMSearch(props) {
    const {
        placeholder = '',
        cn = '',
        button = null,
        events = {}
    } = props;
    const [rect, ref] = useClientRect();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        width,
        style,
        focus,
        active
    } = state;

    function onFocus(e) {
        const initialWidth = `${e.target.clientWidth}px`;
        const style = {width: `${rect.width}px`, background: '#fff'};
        const payload =  {
            active: 'search-active',
            focus: 'is-focus',
            style,
            width: initialWidth
        };
        dispatch({
            type: 'GM_SEARCH_UPDATE',
            payload
        });
    }

    function onBlur(e) {
        dispatch({
            type: 'GM_SEARCH_UPDATE',
            payload: {style: {width}, focus: '', active: ''}
        })
    }

    return (
        <div
            className="container-gm-search"
            ref={ref}
        >
            <div
                className={`row-gm-search ${active}`}
                style={style}
            >
                <div className="search-box">
                    <input
                        type="text"
                        className={`search-field ${focus}`}
                        placeholder={placeholder}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        {...events}
                    />
                    <div className="wrap-search-icon">
                        <SearchIcon/>
                    </div>
                    {button}
                </div>
            </div>
        </div>
    )
}