import React, {useState} from 'react';
import {MdInput} from "../../../components/md-input";

import './style.css';
import {Button} from "../../../components/button";

export function MdInputPage(props) {
    const [disabledInput, setDisabled] = useState({});

    function validation(str, label) {
        const isValid = isNaN(Number(str));
        setDisabled({...disabledInput, [label]: isValid});

        return isValid;
    }

    const isDisabled = Object.values(disabledInput).includes(true);

    return (
        <div className="wrap-container">
            <div className="row">
                <MdInput
                    label="hello world"
                    validation={validation}
                    message={'Enter number only.'}
                />
                <Button mdRaised disabled={isDisabled}>Send</Button>
            </div>
        </div>

    )
}