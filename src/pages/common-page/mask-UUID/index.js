import React, {useState} from 'react';

import {InputMask} from "../../../components/input-mask";
import {Button} from "../../../components/button";
import './style.css';

export function MaskUUID(props) {
    const [isHide, setHide] = useState(false);

    return (
        <div>
            <InputMask
                mask="+7(___) __-__"
            />
            {!isHide && <Button
                mdRaised
                onClick={() => console.log(2)}
            >UUID</Button>}
            <button onClick={() => setHide(!isHide)}>hide</button>
        </div>

    )
}
