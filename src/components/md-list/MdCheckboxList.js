import React, {useState, useEffect, useRef, useReducer} from 'react';
import className from "classnames";

import {useMdRippleContainer} from "../use-md-ripple-container";

import './style.css'

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

    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRippleContainer();

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
    )
}