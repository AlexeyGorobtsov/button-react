import React, {useReducer, useRef} from 'react';
import {MdList} from "../md-list";
import {OutsideClickEvent} from "../outside-click-event";
import './style.css';

const initialState = {
    domClass: 'md-panel-hidden',
    style: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_PANEL_UPDATE': {
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

export function MdPanel(props) {
    const wrapRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        domClass,
        style
    } = state;
    const {
        children = null,
        offsetTop = 0,
        offsetLeft = 0,
        list = [],
    } = props;
    const [mdPanel, setClassName] = ('md-panel-hidden');


    function handleMouseDown(e) {
        if(domClass === 'md-panel-show') {
            return hidePanel();
        }

        const wrap = wrapRef.current;
        const pos = wrap.getBoundingClientRect();
        const top = `${pos.top + pos.height + offsetTop}px`;
        const left = `${pos.left + offsetLeft}px`;
        const payload = {
            style: {
                top,
                left,
                zIndex: 101
            },
            domClass: 'md-panel-show'
        };
        dispatch({type: 'MD_PANEL_UPDATE', payload})
    }

    function hidePanel() {
        dispatch({type: 'MD_PANEL_UPDATE', payload: {domClass: 'md-panel-hide'}})
    }

    return (
        <OutsideClickEvent callback={hidePanel}>
            <div className={'md-panel-container'}>
                <div
                    className="wrap-children"
                    ref={wrapRef}
                    onMouseDown={handleMouseDown}
                >
                    {children}
                </div>
                <div className={domClass}>
                    <div
                        className={'md-panel md-panel-menu'}
                        style={style}
                    >
                        <MdList list={list}/>
                    </div>
                </div>
            </div>
        </OutsideClickEvent>
    )
}