import React, {useReducer, useRef} from "react";

(function() {

    // for IE
    if (!Element.prototype.matches) {

        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }

})();

(function() {

    // for IE
    if (!Element.prototype.closest) {

        Element.prototype.closest = function(css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

})();

const initialState = {
    hover: {},
    active: {},
    styles: {},
    id: 0,
    widthTh: {},
    height: '20px'
};

function reducer(state, action) {
    switch (action.type) {
        case 'RESIZE_COLUMN_UPDATE': {
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

let initX;
let mousePressX;
let isDown;

export function useResizeColumn() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        hover,
        active,
        styles,
        widthTh,
        height
    } = state;

    const divRef = useRef(null);


    const mouseMove = e => {
        e.preventDefault();
        if (!isDown) return;
        const th = e.target.closest('th');
        const id = th.getAttribute('data-id');
        const left = initX + e.clientX - mousePressX + 'px';
        dispatch({
            type: 'RESIZE_COLUMN_UPDATE',
            payload: {styles: {[id]: {left}}}
        })
    };

    function mouseup(e) {
        e.preventDefault();
        isDown = false;
        const th = e.target.closest('th');
        const diff = paddingDiff(th) - 5;
        const calc = initX + e.clientX - mousePressX;
        const width = calc - diff + 'px';
        const {id} = state;
        const {widthTh} = state;
        dispatch({
            type: 'RESIZE_COLUMN_UPDATE',
            payload: {hover: {}, active: {}, widthTh: {...widthTh, [id]: width}},
        })
    }


    function dragMouseOver(e) {
        const th = e.target.parentElement;
        const id = th.getAttribute('data-id');
        dispatch({
            type: 'RESIZE_COLUMN_UPDATE',
            payload: {hover: {[id]: 'resizer-hover'}}
        })
    }

    const mouseDown = e => {
        isDown = true;
        const th = e.target.closest('th');
        const height = e.target.closest('table').clientHeight + 'px';
        const resizer = th.querySelector('.resizer');
        initX = resizer.offsetLeft;
        mousePressX = e.clientX;
        const id = th.getAttribute('data-id');
        dispatch({
            type: 'RESIZE_COLUMN_UPDATE',
            payload: {active: {[id]: 'resizer-active'}, id, height }
        })
    };

    function paddingDiff(col) {
        if (getStyleVal(col, 'box-sizing') === 'border-box') {
            return 0
        }

        const padLeft = getStyleVal(col, 'padding-left');
        const padRight = getStyleVal(col, 'padding-right');

        return (parseInt(padLeft) + parseInt(padRight));
    }

    function getStyleVal(el, css) {

        return (window.getComputedStyle(el, null).getPropertyValue(css))
    }

    return {
        resizer: function resizer(i) {
            return (<div
                className={`resizer ${hover[i] || ''} ${active[i] || ''}`}
                style={styles[i]}
                onMouseDown={mouseDown}
                data-resize="resize"
            ><div className="resizer-handle resizer-vertical-handle">
                <div
                    className="resizer-handle-bar resizer-vertical-handle-bar"
                    style={{height: height}}
                />
            </div>
            </div>)
        },
        colDrag: <div
            className="col-drag"
            onMouseOver={dragMouseOver}
        />,
        mouseMove,
        mouseup,
        widthTh
    }

}
