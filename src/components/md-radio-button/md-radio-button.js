import React, {useState} from 'react';

import {MdRipple} from "../md-ripple";
import {useMdRipple} from "../../hooks/use-md-ripple";
import './style.css';

export function MdRadioButton(props) {
    const {
        options = [],
        cn='',
        events = {}
    } = props;

    const { mouseDown, mouseUp, stateRipple, divRef } = useMdRipple();
    const {
        mdRipple = [],
        remove = {},
        active = {},
        scaled = {},
    } = stateRipple;

    const [checked, setChecked] = useState({[0]: 'md-checked'});
    function handleClick(i) {
        setChecked({[i]: 'md-checked'});
    }

    async function handleMouseDown (item, i) {
        await handleClick(i);
        mouseDown();
    }

    return(
        <div className={`md-radio-group ${cn}`}>
            {options.map((item, i) => {

                return (
                    <div
                        key={i}
                        className={`md-radio-button ${checked[i] || ''}`}
                        role="radio"
                        {...events}
                        onMouseDown={() => handleMouseDown(item, i)}
                        onMouseUp={mouseUp}
                    >
                        <div className="md-container md-ink-ripple">
                            <div className="md-off" />
                            <div className="md-on" />
                            <MdRipple
                                mdRipple={checked[i] ? mdRipple : []}
                                remove={remove}
                                active={active}
                                scaled={scaled}
                                divRef={divRef}
                            />
                        </div>
                        <div className="md-label">
                            {item.label}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}