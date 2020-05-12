import React, {useState} from 'react';
import './style.css'
import className from "classnames";
import {useMdRippleContainer} from "../../hooks/use-md-ripple-container";
import {MdRippleContainer} from "../md-ripple-container";

const emptyObj = {};

export function MdSwitch(props) {
    const {
        disabled = false,
        events = {},
        label = null,
    } = props;

    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRippleContainer();

    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;

    const [checked, setChecked] = useState(false);
    function handleClick() {
        setChecked(!checked);
    }

    const checkedEvents = disabled ? emptyObj : events;

    return (
        <div
            className={`md-switch ${checked ? "md-checked md-warn" : ''}`}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onClick={handleClick}
            {...checkedEvents}
        >
            <div className="md-container" style={{touchAction: "pan-x"}}>
                <div className="md-bar"/>
                <div className="md-thumb-container">
                    <div className="md-thumb md-ink-ripple">
                        <MdRippleContainer
                            mdRipple={mdRipple}
                            remove={remove}
                            active={active}
                            scaled={scaled}
                            divRef={divRef}
                        />
                    </div>
                </div>
            </div>
            <div className="md-label">{label}</div>
        </div>
    )
}