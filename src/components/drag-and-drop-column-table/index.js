import React, { useReducer, useState, useCallback} from 'react';

import {useDragColumn} from "../../hooks/use-drag-column";
import {useResizeColumn} from "../../hooks/use-resize-column";
import './style.css'

function newRow(i) {
    return {
        id: i,
        size: `${i}mb`,
        file: 'C:\\User\\BrainBell'
    }
}

function isEven(n) {
    return n % 2 === 0;
}



function range(len) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }

    return arr;
}

function makeData(len) {
    return range(len)
        .map((d, i) => {
            return newRow(i)
        })
}


const result = makeData(20);

function renderRow(row, cells) {
    return cells.map((cell, i) => {
        return (
            <td key={i}>{row[cell.name]}</td>
        )
    })
}

function Tbody(props) {
    const {
        result = [],
        cells = {}
    } = props;


    return (
        result.map((row, i) => {
            return (
                <tr key={i}>{renderRow(row, cells)}</tr>
            )
        })
    )
}

function TableHeader(props) {
    const {
        cells,
        dragClass,
        overClass,
        dragStart,
        dragOver,
        dragEnter,
        dragEnd,
        drop,
        resizer,
        colDrag,
        widthTh
    } = props;


    return cells.map((item, i) => {
        return (
            <th
                key={i}
                draggable
                className={`${dragClass[i] || ''} ${overClass[i] || ''}`}
                onDragStart={dragStart}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={drop}
                onDragEnd={dragEnd}
                data-id={i}
                style={{width: widthTh[i]}}
            >
                {item.label}
                {resizer(i)}
                {colDrag}
            </th>
        )
    })
}

export function DragAndDropColumnTable(props) {
    const {cells, setCells} = props;
    const {
        dragClass,
        overClass,
        dragStart,
        dragOver,
        dragEnter,
        drop,
        dragEnd,
    } = useDragColumn({cells, handler:setCells});
    const {resizer, colDrag, mouseMove, mouseup, widthTh} = useResizeColumn();

    return (
        <table
        >
            <thead>
            <tr
                onMouseMove={mouseMove}
                onMouseUp={mouseup}
            >
                <TableHeader
                    dragClass={dragClass}
                    overClass={overClass}
                    dragStart={dragStart}
                    dragOver={dragOver}
                    dragEnter={dragEnter}
                    dragEnd={dragEnd}
                    drop={drop}
                    cells={cells}
                    resizer={resizer}
                    colDrag={colDrag}
                    widthTh={widthTh}
                />
            </tr>
            </thead>
            <tbody
            >
            <Tbody
                result={result}
                cells={cells}
            />
            </tbody>
        </table>
    )
}