import React, {useState} from 'react';
import className from "classnames";

import './style.css'
import {useMdRipple} from "../../hooks/use-md-ripple";
import {MdRipple} from "../md-ripple";
const emptyObj = {};

export function MdCheckbox(props) {

    const {
        events = {},
        disabled = false
    } = props;
    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRipple();

    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;
    const [checked, setChecked] = useState(false);

    const checkedEvents = disabled ? emptyObj : events;

    return (
        <div
            className={className('md-checkbox', {'md-checked': checked, 'md-checkbox-disabled': disabled})}
            onMouseDown={!disabled ? mouseDown : null}
            onMouseUp={!disabled ? mouseUp : null}
            onClick={() => setChecked(!checked)}
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