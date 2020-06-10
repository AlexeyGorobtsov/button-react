import React, {useState, useEffect} from 'react';
import Select from 'react-select'

import {autoKeyboardLang} from "./autoKeyBoardLang";

const options = [
    {label: "item1", value: "item1"},
    {label: "item2", value: "item2"},
    {label: "item3", value: "item3"},
    {label: "test4", value: "test4"},
];



export function SelectLatin(props) {
    const [string, setString] = useState('');
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        const select = document.querySelector('.adv-select__input');
        if (!select) return;
        function setInputListener(e) {
            const newStr = autoKeyboardLang(e.target.value);
            setString(newStr);
            setOpen(true);
        }
        const advSelect = select.querySelector('input');
        advSelect.addEventListener('input', setInputListener);

        return () => advSelect.removeEventListener('input', setInputListener);
    });
    function onChange(e) {
        setString('');
        setOpen(undefined) // Api react-select
    }
    function onFocus() {
        setOpen(true)
    }
    function onBlur() {
        setOpen(false);
        setString('');
    }


    return (
        <Select
        classNamePrefix="adv-select"
        onChange={onChange}
        options={options}
        isClearable
        isMulti
        inputValue={string}
        menuIsOpen={isOpen}
        onFocus={onFocus}
        onBlur={onBlur}
    />)
}