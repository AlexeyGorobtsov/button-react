import React from 'react';
import {Captcha} from "../../components/captcha";
import sea from '../../images/sea.jpg'

export function CaptchaPage(props) {
    return (
        <div>
            <Captcha src={sea}/>
        </div>
    )
}