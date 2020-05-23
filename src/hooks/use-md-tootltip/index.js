import React, {useReducer, useRef} from 'react';


const initialState = {
    tooltipStyle: {},
    tooltipClass: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'MD_TOOLTIP_UPDATE': {
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

export function useMdTooltip({ref, position, offset = 0, isShow = true,}) {
    const tooltipRef = useRef(null);
    const [stateTooltip, dispatch] = useReducer(reducer, initialState);
    function mouseOver() {
        if (!isShow) return;
        const btn = ref.current;
        const pos = btn.getBoundingClientRect();
        const tooltip = tooltipRef.current;
        let styleTooltip;
        switch (position) {
            case 'top': {
                const top = `${pos.top - tooltip.offsetHeight}px`;
                const left = `${pos.left - (tooltip.offsetWidth - pos.width) / 2}px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
            case 'right': {
                const top = `${pos.top - (tooltip.offsetHeight - pos.height)/2}px`;
                const left = `${pos.left + pos.width }px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
            case 'bottom': {
                const top = `${pos.top + pos.height}px`;
                const left = `${pos.left - (tooltip.offsetWidth - pos.width) / 2}px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
            case 'left': {
                const top = `${pos.top - (tooltip.offsetHeight - pos.height)/2}px`;
                const left = `${pos.left - tooltip.offsetWidth }px`;
                styleTooltip = { top, left, zIndex: 101, pointerEvents: "all" };
                break;
            }
        }

        const payload = {tooltipClass: 'md-show', tooltipStyle: styleTooltip};
        dispatch({type: 'MD_TOOLTIP_UPDATE', payload});
    }

    function mouseOut() {
        if (!isShow) return;
        dispatch({type: 'MD_TOOLTIP_UPDATE', payload: {tooltipClass: 'md-hide'}})
    }

    return {
        mouseOut,
        mouseOver,
        stateTooltip,
        tooltipRef
    }
}