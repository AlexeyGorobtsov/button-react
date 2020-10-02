import React from 'react';
import {LazyTable} from "../../../components/lazy-table";
import {AsyncTable} from "../../../components/async-table";

export function LazyTablePage(props) {
    return (
        <>
        {/*<LazyTable/>*/}
        <AsyncTable />
        </>
    )
}