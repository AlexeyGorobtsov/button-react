import React, {useState} from 'react';
import './style.css'
import className from "classnames";
import {useMdRippleContainer} from "../use-md-ripple-container";

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
                        <div className="md-ripple-container" ref={divRef}>
                            {mdRipple.map((el, i) => <div
                                key={i}
                                className={className(`md-ripple md-ripple-placed`,
                                    scaled[i],
                                    remove[i],
                                    active[i]
                                )}
                                style={{...el, background: '#000', borderColor: '#000'}}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md-label">{label}</div>
        </div>
    )
}