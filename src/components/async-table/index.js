import React, {useEffect, useState} from 'react';
import {asyncIterableToArray, delay, mapAsync, syncToAsyncIterable} from '../../helpers';
import {Loader} from "../loader";


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

const result = makeData(700);
const res = makeData(200);



function renderRow(row, cells) {
    return cells.map((cell, i) => {
        return (
            <td key={i}>{row[cell.name]}</td>
        )
    })

}

async function Tbody(props) {
    const {
        result = [],
        cells = {}
    } = props;

    const asyncIterable = syncToAsyncIterable(result);
    const callback = async (row, i) => {
        return (<tr key={i}>{renderRow(row, cells)}</tr>)
    };
    const mapped = mapAsync(asyncIterable, callback);
    return await asyncIterableToArray(mapped)
}

export function AsyncTable( props) {
    const [table, setTable ] = useState([]);

    async function getTable (){
        console.time('st');
        const table = await Tbody({result, cells});
        // console.log(table)
        console.timeEnd('st');
        setTable(table);
    }
    useEffect(() => {
        getTable()
    }, []);


    return (
        <div>
                 <table
        >
            <thead>
            <tr>
                <th>id</th>
                <th>Size</th>
                <th>File</th>
            </tr>
            </thead>
            <tbody>
            {table}
            </tbody>
        </table>
            </div>
    )
}