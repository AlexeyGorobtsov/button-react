import React, {useReducer, useEffect, useRef} from 'react';
const initialState = {
    id: 0,
    dragClass: {},
    overClass: {},
    dragId: null,
};

function reducer(state, action) {
    switch(action.type) {
        case 'DRAG_TABLE_UPDATE': {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: {
            return state
        }
    }
}

export function useDragColumn({cells, handler}) {
    const savedHandler = useRef(null);
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        dragClass,
        overClass,
        dragId,
    } = state;

    function dragStart(e) {
        const id = e.target.getAttribute('data-id');
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/html', '');
        dispatch({
            type: 'DRAG_TABLE_UPDATE',
            payload: {dragClass: {[id]: 'drag'}, dragId: id},
        })
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    function dragEnter(e) {
        const id = e.target.getAttribute('data-id');
        dispatch({type: 'DRAG_TABLE_UPDATE', payload: {overClass: {[id]: 'over'}}})
    }

    function move(arr, fromIndex, toIndex) {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);

        return arr;
    }

    function drop(e) {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');

        const updateCells = move([...cells], parseInt(dragId), parseInt(id));
        savedHandler.current(updateCells)
    }

    function dragEnd(e) {
        dispatch({type: 'DRAG_TABLE_UPDATE', payload: {overClass: {}, dragClass: {}}})
    }

    return {
        dragClass,
        overClass,
        dragStart,
        dragOver,
        dragEnter,
        drop,
        dragEnd
    }
}