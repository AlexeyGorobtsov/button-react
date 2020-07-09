import React, {useState} from 'react';

import {useDebounce} from "../../../hooks/use-debounce";

export function UseDebouncePage(props) {
    const [text, setText] = useState('Hello!');
    const debouncedText = useDebounce(text, 1000);

    return (
        <div>
            <input
                type="text"
                defaultValue="Hello!"
                onChange={e => setText(e.target.value)}
            />
            <p>Actual value {text}</p>
            <p>Debounced value {debouncedText}</p>
        </div>
    )
}