import React from 'react';
import {ChevronLeft} from "./icons/chevron-left";
import {ChevronRight} from "./icons/chevron-right";

export function ControlBtn(props) {
    const {
        tx,
        last,
        widthTabsCanvas = 0,
        isShow = false,
        dispatch = () => console.log('dispatch')
    } = props;

    if (!isShow) return []

    function clickPrev() {
        console.log(1)
        if(tx === 0) return;
        if(Math.abs(tx) < widthTabsCanvas) {
            return  dispatch({type: 'MD_TABS_UPDATE', payload: {tx: 0}});
        }
        const prevTx = Math.abs(tx + widthTabsCanvas);
        const updateTx = Math.max(prevTx, 0);

        return dispatch({type: 'MD_TABS_UPDATE', payload: {tx: - updateTx}});
    }

    function clickNext() {
        if(tx === last) return;
        const nextTx = Math.abs(tx - widthTabsCanvas);
        const updateTx = Math.min(nextTx, last);

        return dispatch({type: 'MD_TABS_UPDATE', payload: {tx: - updateTx}});
    }

    return (
        <>
            <div
                className={`md-prev-button ${Math.abs(tx) === 0 ? 'md-disabled' : ''}`}
                onClick={clickPrev}>
                <div className="md-icon">
                    <ChevronLeft/>
                </div>
            </div>
            <div
                className={`md-next-button ${Math.abs(tx) === last ? 'md-disabled' : ''}`}
                onClick={clickNext}>
                <div className="md-icon">
                    <ChevronRight/>
                </div>
            </div>
        </>
    )
}