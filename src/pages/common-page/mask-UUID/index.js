import React, {useState, useRef} from 'react';
import {Button} from "../../../components/button";
import { delay } from '../../../helpers'
import './style.css';

const mask = "********-****-****-****-************";

export function MaskUUID(props) {
    const [cursor, setCursor] = useState(false);
    const inputRef = useRef({});

    function mask(e) {
        // setCursor(e.target.selectionStart);
        // setCaretPosition(e.target, e.target.selectionStart, e.target.selectionStart)
        const matrix = "+3**(**)****-***";
        let i = 0;
        let val = e.target.value;
        if (val === '3') {
            val = e.target.value.replace(/[+()-]/g, "");
        } else {
            val = e.target.value.replace(/[+()-]/g, "").replace(/[3]/, '');
        }
        const start = e.target.selectionStart;
        e.target.value = matrix.replace(/[\s\S]/g, function (a) {

            if (/[*]/.test(a) && i < val.length) {
                return val.charAt(i++)
            } else {
                return i >= val.length ? "_" : a
            }

        });

        if (e.target.value.length === matrix.length) {
            setCaretPosition(inputRef.current, start, start)
        } else if( start < matrix.length) {
            //delay(0).then(() => setCaretPosition(inputRef.current, start+ 1, start+ 1))
        }

    }

    function setCaretPosition(ctrl, start, end) {
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(start, end);
        }
    }




    return (
        <div>
            <input
                type="text"
                className="mask-uuid"
                onChange={(e) => {
                    const value = e.target.value;
                    mask(e)

                }}
                ref={inputRef}
                onKeyDown={e => {
                    const cur = e.target.selectionStart;
                    if (e.keyCode === 8) {
                        delay(0).then(() => setCaretPosition(inputRef.current, cur - 1, cur - 1));


                    }
                }}

            />
            <Button
                mdRaised
                onClick={() => console.log(2)}
            >UUID</Button>
        </div>

    )
}