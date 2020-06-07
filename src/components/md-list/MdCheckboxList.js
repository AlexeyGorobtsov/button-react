import React, {useState, useEffect, useRef, useReducer} from 'react';
import className from "classnames";

import {useMdRipple} from "../../hooks/use-md-ripple";

import './style.css'
import {MdRipple} from "../md-ripple";

const emptyObj = {};

export function MdCheckboxList(props) {

    const {
        events = {},
        disabled = false,
        idsCheckbox = [],
        itemList = ''
    } = props;
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(idsCheckbox.includes(itemList));
    }, [idsCheckbox]);

    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRipple();

    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;
    const checkedEvents = disabled ? emptyObj : events;

    return (
        <div
            className={className('md-checkbox', {'md-checked': checked, 'md-checkbox-disabled': disabled})}
            onMouseDown={!disabled ? mouseDown : null}
            onMouseUp={!disabled ? mouseUp : null}
            {...checkedEvents}
        >
            <div className="md-container md-ink-ripple">
                <div className="md-icon"/>
            </div>
            <MdRipple
                mdRipple={mdRipple}
                remove={remove}
                active={active}
                scaled={scaled}
                divRef={divRef}
            />
        </div>
    )
}