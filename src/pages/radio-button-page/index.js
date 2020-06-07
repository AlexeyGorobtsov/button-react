import React from 'react';
import {MdRadioButton} from "../../components/md-radio-button/md-radio-button";

const options = [
    {label: 'hello world!', value: 'helloWorld'},
    {label: 'hello sun!', value: 'helloSun'},
    {label: 'hello some!', value: 'helloSome'},
    {label: 'hello!', value: 'hello'}
];

export function RadioButtonPage(props) {
    return(
        <div className="flex-b">
            <MdRadioButton
                options={options}
            />
        </div>
    )
}