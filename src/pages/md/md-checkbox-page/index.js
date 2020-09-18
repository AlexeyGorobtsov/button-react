import React from 'react';
import {MdCheckbox} from "../../../components/md-checkbox";
import {MdList} from "../../../components/md-list";

export function MdCheckboxPage(props) {
    return (
        <>
            <div className={'wrap-checkbox'}>
                <MdCheckbox label="some text"/>

            </div>
            <div className={"center"}>
                <div style={{width: 400}}>
                    <MdList list={['item1', 'item2', 'item3']}/>
                </div>
            </div>
        </>
    )
}