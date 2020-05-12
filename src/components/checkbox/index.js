import React, {useState} from 'react';
import className from "classnames";

import './style.css'
import {useMdRippleContainer} from "../../hooks/use-md-ripple-container";
import {MdRippleContainer} from "../md-ripple-container";
const emptyObj = {};

export function MdCheckbox(props) {

    const {
        events = {},
        disabled = false
    } = props;
    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRippleContainer();

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
            <MdRippleContainer
                mdRipple={mdRipple}
                remove={remove}
                active={active}
                scaled={scaled}
                divRef={divRef}
            />
        </div>

    )
}