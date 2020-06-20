import React from 'react';
import './style.css';
import {InputMask} from "../../../components/input-mask";
import {Button} from "../../../components/button";

export function MaskUUID(props) {
    return (
        <div>
            <InputMask
                mask="+7(___) __-__"
            />
            <Button
                mdRaised
                onClick={() => console.log(2)}
            >UUID</Button>
        </div>

    )
}