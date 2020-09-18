import React, {useEffect, useState} from 'react';
import {useMdRipple} from "../../hooks/use-md-ripple";
import {MdRipple} from "../md-ripple";
import {useClientRect} from "../../hooks/use-client-react/use-client-rect";

export function Tab(props) {
    const {
        id = 0,
        activeTab = {},
        backgroundRipple,
        tab = '',
        dispatch = () => console.log('dispatch')
    } = props;

    const [rect, ref] = useClientRect();


    useEffect(() => {
        if (!rect) return;
        const payload = {[id]: rect.width};
        dispatch({type: 'MD_WIDTH_TABS_UPDATE', payload})
    }, [rect]);

    const {mouseDown, mouseUp, stateRipple, divRef} = useMdRipple({isIconRipple: true});

    async function clickTabs(e, id) {
        e.preventDefault();
        const payload = {activeTab: {[id]: 'md-active'}, id};
        await dispatch({type: 'MD_TABS_UPDATE', payload})
    }


    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;
    return (
        <div
            ref={ref}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onClick={(e) => clickTabs(e, id)}
            className={`md-tab ${activeTab[id] || ''} md-tab-item`}
            style={{maxWidth: "264px"}}
        >{tab}
            <MdRipple
                mdRipple={mdRipple}
                remove={remove}
                active={active}
                scaled={scaled}
                divRef={divRef}
                backgroundRipple={backgroundRipple}
                isMdRippleContainer
            />
        </div>
    )
}