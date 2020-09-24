import React, {useEffect, useReducer, useRef} from 'react';

import {Tab} from "./Tab";
import {usePrevious} from "../../hooks/usePrevious";
import {ControlBtn} from "./ControlBtn";
import {useGetWidthTab, useGetBar, useWindowSize} from "./hooks";
import './style.css';

const initialState = {
    id: 0,
    activeTab: {0: "md-active"},
    widthTab: {},
    left: 0,
    right: 0,
    isBar: false,
    barClass: 'md-right',
    contentClass: 'md-right',
    widthTabsCanvas: 0,
    widthPaginationWrapper: 0,
    tx: 0,
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
                widthTab: {...state.widthTab, ...action.payload}
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
        backgroundRipple = 'rgb(255, 82, 82)',
    } = props;

    const [stateMdTabs, dispatch] = useReducer(reducer, initialState);
    const {
        activeTab,
        widthTab,
        id,
        left,
        right,
        isBar,
        barClass,
        widthTabsCanvas,
        widthPaginationWrapper,
        tx,
    } = stateMdTabs;
    const prevId = usePrevious(id);
    const divRef = useRef(null);

    const windowSize = useWindowSize();

    useGetWidthTab({ ref: divRef.current, dispatch, windowSize });


    useGetBar({id, widthTab, dispatch, prevId});

    useEffect(() => {
        if (Object.keys(widthTab).length === tabs.length) {
            dispatch({type: 'MD_TABS_UPDATE', payload: {isBar: true}})
        }
    }, [widthTab]);

    async function clickTabs(e, id) {
        e.preventDefault();
        const width = Object.keys(widthTab).reduce((acc, item) => {
            if (item > id) return acc;
            acc = acc + widthTab[item];
            return acc;
        }, 0);

        const calculateWidth = widthTabsCanvas - width;
        const diffWidth = tx + width;
        const txCompare = Math.min(calculateWidth, 0);
        const txUpdate = Math.min(txCompare, tx + diffWidth + widthTab[id]);
        if (diffWidth > widthTab[id] && txCompare > tx) {
            const payload = {activeTab: {[id]: 'md-active'}, id, tx};

            return dispatch({type: 'MD_TABS_UPDATE', payload})
        }
        const payload = {activeTab: {[id]: 'md-active'}, id, tx: txUpdate};
        await dispatch({type: 'MD_TABS_UPDATE', payload})
    }

    const last = widthPaginationWrapper - widthTabsCanvas;
    const isShow = widthPaginationWrapper > widthTabsCanvas;
    return (
        <div className="md-tabs md-dynamic-height">
            <div className="md-tabs-wrapper">
                <ControlBtn
                    tx={tx}
                    last={last}
                    widthTabsCanvas={widthTabsCanvas}
                    dispatch={dispatch}
                    isShow={isShow}
                />
                <div
                    className="md-tabs-canvas md-paginated"
                    ref={divRef}
                >
                    <div className="md-pagination-wrapper" style={{transform: `translate(${tx}px, 0px)`}}>
                        {tabs.map((item, i) => {
                            const {tab} = item || {};
                            return (
                                <Tab
                                    id={i}
                                    key={i}
                                    activeTab={activeTab}
                                    backgroundRipple={backgroundRipple}
                                    tab={tab}
                                    dispatch={dispatch}
                                    clickTabs={clickTabs}
                                />
                            )
                        })
                        }
                        {isBar
                            ?
                            <div className={`md-ink-bar ${barClass}`} style={{left: `${left}px`, right: `${right}px`}}/>
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