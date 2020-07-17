import React, {useRef, useState, useEffect, useReducer} from 'react';

import './style.css';

function newRow(i) {
    return {
        id: i,
        size: `${i}mb`,
        file: isEven(i) ? 'C:\\User\\BrainBell' : 'Hooks are a new addition in React that lets you use state and other React features without writing a class. This website provides easy to understand code examples to help you learn how hooks work and inspire you to take advantage of them in your next project.'
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

const cells = [
    {label: "id", name: "id"},
    {label: "size", name: "size"},
    {label: "file", name: "file"}
];

const result = makeData(200);

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

function getChunks(result, num) {
    const len = result.length;
    const numberOfChunk = Math.floor(len / num);

    const chunks = {};
    for(let i = 0; i < numberOfChunk; i++) {
        const updateResult = result.slice(num * i, len);
        chunks[i] = updateResult.slice(0, num);
    }
    return {...chunks, ...{[numberOfChunk]: result.slice(num * numberOfChunk, len)}}
}

const ch = getChunks(result, 60);


export function LazyTable(props) {
    const divRef = useRef(null);
    const tbodyRef = useRef(null);

    const [res, setRes] = useState([]);
    const [delimiter, setDelimiter] = useState(0);

    useEffect(() => {
        setRes(ch[0]);
    }, []);

    return (
        <div
            className="scroll-box"
            ref={divRef}
            onScroll={e => {
                const top = e.target.scrollTop;
                const tbHeight = tbodyRef.current.clientHeight;
                if(top > tbHeight / 2 && ch[delimiter + 1]) {
                    setRes([...res, ...ch[delimiter + 1]]);
                    setDelimiter(delimiter + 1);
                }
            }}
        >
            <table
            >
                <thead>
                <tr>
                    <th>id</th>
                    <th>Size</th>
                    <th>File</th>
                </tr>
                </thead>
                <tbody
                    ref={tbodyRef}
                >
                <Tbody
                    result={res}
                    cells={cells}
                />
                <tr className="vt-last-tr"/>
                </tbody>
            </table>
        </div>
    )
}