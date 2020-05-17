import React, {useEffect, useState, useRef} from 'react';

import './style.css';

export function MdInput(props) {
    const {
        events = {},
        label = 'label'
    } = props;
    const inputRef = useRef(null);
    const [classInput, setClass] = useState('');

    useEffect(() => {
        const input = inputRef.current;
        if(input.value.length) {
            setClass('md-input-has-value');
        }
    }, []);

    function onFocus() {
        setClass('md-input-focused');
    }
    function onBlur(e) {
        if(e.target.value.length){
          return setClass('md-input-has-value')
        }
        setClass('');
    }

    return (
        <div className={`md-input-container md-icon-float md-block ${classInput}`}>
            <label>{label}</label>
            <input
                type="text"
                className="ng-valid md-input ng-touched ng-dirty ng-valid-parse ng-empty"
                aria-invalid="false"
                onFocus={onFocus}
                onBlur={onBlur}
                {...events}
                ref={inputRef}
            />
            <div className="md-errors-spacer"/>
        </div>
    )
}