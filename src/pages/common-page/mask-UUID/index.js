import React, {useState, useRef} from 'react';
import {Button} from "../../../components/button";
import {delay, isEmpty} from '../../../helpers'
import './style.css';

const mask = "_(__)_-__-__";

export function MaskUUID(props) {
    const [selectionStart, setSelectionStart] = useState(0);
    const [prevMask, setPrevMask] = useState(mask);
    const [symbol, setSymbol] = useState('');
    const inputRef = useRef({});

    function setCaretPosition(ctrl, start, end) {
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(start, end);
        }
    }

    function maskReplace(e) {
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        const matrix = mask;
        let i = 0;
        let val = paste;
        val = val.replace(/[-]/g, "");

        let r = matrix.replace(/[\s\S]/g, function (a) {

            if (/[_]/.test(a) && i < val.length) {
                return val.charAt(i++)
            } else {
                return i >= val.length ? "_" : a
            }

        });
        delay(0)
            .then(() => inputRef.current.value = r)
            .then(() => setPrevMask(r));
    }

    return (
        <div>
            <input
                type="text"
                className="mask-uuid"
                onChange={(e) => {

                }}
                onInput={e => {
                    const maskSymbol = mask.slice(selectionStart, selectionStart + 1);
                    const nextMaskSymbol = mask.slice(selectionStart - 1, selectionStart);

                    if (selectionStart === mask.length && symbol !== '_') {
                        e.target.value = prevMask;
                        return;
                    }
                    if (isEmpty(symbol)) {
                        e.target.value = prevMask;
                        setCaretPosition(e.target, selectionStart, selectionStart);
                        return
                    }
                    if (symbol === '_' && nextMaskSymbol === '-') {
                        e.target.value = prevMask;
                        setCaretPosition(e.target, selectionStart - 1, selectionStart - 1);
                        return;
                    }
                    if (symbol === '_') {
                        const updateMask = prevMask.slice(0, selectionStart - 1) + symbol + prevMask.slice(selectionStart, prevMask.length);
                        setPrevMask(updateMask);
                        e.target.value = updateMask;
                        setCaretPosition(e.target, selectionStart - 1, selectionStart - 1);
                        return;
                    }
                    if (maskSymbol === '_') {
                        const updateMask = prevMask.slice(0, selectionStart) + symbol + prevMask.slice(selectionStart + 1, prevMask.length);
                        setPrevMask(updateMask);
                        e.target.value = updateMask;
                        setCaretPosition(e.target, selectionStart + 1, selectionStart + 1)
                    } else {
                        const updateMask = prevMask.slice(0, selectionStart) + maskSymbol + symbol + prevMask.slice(selectionStart + 2, prevMask.length);
                        setPrevMask(updateMask);
                        e.target.value = updateMask;
                        setCaretPosition(e.target, selectionStart + 2, selectionStart + 2)
                    }
                }}
                ref={inputRef}
                onKeyDown={(e) => {

                    if (e.key.length === 1 && /[\w]/.test(e.key)) {
                        setSymbol(e.key);
                    } else {
                        setSymbol(null)
                    }
                    delay(0).then(() => setSelectionStart(inputRef.current.selectionStart));
                    if (e.keyCode === 8) {
                        setSymbol('_')
                    }
                }}
                onFocus={e => {
                    if (isEmpty(e.target.value)) {
                        e.target.value = mask
                    }

                }}
                onMouseDown={e => {
                    delay(0).then(() => setSelectionStart(inputRef.current.selectionStart));
                }}
                onPaste={e => {
                    maskReplace(e)
                }}

            />
            <Button
                mdRaised
                onClick={() => console.log(2)}
            >UUID</Button>
        </div>

    )
}