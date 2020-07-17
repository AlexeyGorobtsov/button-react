import React, {useState} from 'react';

import {DragAndDropColumnTable} from "../../../components/drag-and-drop-column-table";

const initCells = [
    {label: "id", name: "id"},
    {label: "size", name: "size"},
    {label: "file", name: "file"}
];

export function DragAndDropColumnTablePage(props) {
    const [cells, setCells] = useState(initCells);
    return(
        <DragAndDropColumnTable
            cells={cells}
            setCells={setCells}
        />
    )
}