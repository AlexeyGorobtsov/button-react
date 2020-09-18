import React, {useEffect, useReducer} from 'react';

import {Tab} from "./Tab";
import {usePrevious} from "../../hooks/usePrevious";
import './style.css';

const initialState = {
    id: 0,
    activeTab: {0: "md-active"},
    widthTab: {},
    left: 0,
    right: 0,
    isBar: false,
    barClass: 'md-right',
    contentClass: 'md-right'
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_TABS_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'MD_WIDTH_TABS_UPDATE': {
            return {
                ...state,
                widthTab:{...state.widthTab, ...action.payload}
            }
        }
        default: {
            return state
        }
    }
}

export function MdTabs(props) {
    const {
        tabs = [],
        backgroundRipple = 'rgb(255, 82, 82)'
    } = props;

    const [stateMdTabs, dispatch] = useReducer(reducer, initialState);
    const {
        activeTab,
        widthTab,
        id,
        left,
        right,
        isBar,
        barClass
    } = stateMdTabs;
    const prevId = usePrevious(id);

    useEffect(() => {
        const res = getBar();
        const barClass = prevId > id ? 'md-left' : 'md-right';
        const payload = {left: res.left, right: res.right, barClass};
        dispatch({type: 'MD_TABS_UPDATE', payload})
    }, [id,widthTab]);

    useEffect(() => {
        if(Object.keys(widthTab).length === tabs.length) {
            dispatch({type: 'MD_TABS_UPDATE', payload: {isBar: true}})
        }
    }, [widthTab]);


    function getBar() {
        const width = Object.keys(widthTab);
        const last = width.length - 1;

        return width.reduce((acc, item, i) => {
            if (id === 0) {
                if (i === 0) return acc;
                acc.left = 0;
                acc.right = acc.right + widthTab[i];
                return acc;
            }
            if (id === last) {
                if (i === last) return acc;
                acc.right = 0;
                acc.left = acc.left + widthTab[i];
                return acc;
            }
            if (id === i) {
                acc.isCount = true;
                return acc;
            } else if (acc.isCount) {
                acc.right = acc.right + widthTab[i];
                return acc;
            }
            acc.left = acc.left + widthTab[i];
            return acc;
        }, {left: 0, right: 0});
    }

    return (
        <div className="md-tabs md-dynamic-height">
            <div className="md-tabs-wrapper">
                <div className="md-tabs-canvas">
                    <div className="md-pagination-wrapper"
                         style={{transform: "translate(0px, 0px)"}}
                    >{
                        tabs.map((item, i) => {
                            const {tab} = item || {};
                            return (
                                <Tab
                                    id={i}
                                    key={i}
                                    activeTab={activeTab}
                                    backgroundRipple={backgroundRipple}
                                    tab={tab}
                                    dispatch={dispatch}
                                />
                            )
                        })
                    }
                        {isBar
                            ? <div className={`md-ink-bar ${barClass}`} style={{left:`${left}px` , right: `${right}px`}}/>
                            : null}
                    </div>
                </div>
            </div>
            <div className="_md md-tabs-content-wrapper">
                {tabs.map((item, i) => {
                    const contentClass = id < i ? 'md-right' : 'md-left';
                    return (
                    <div key={i} className={`_md md-no-scroll ${activeTab[i] || contentClass} md-tab-content`}>
                    {item.tabContent}
                    </div>
                    )
                })}
            </div>
        </div>
    )
}