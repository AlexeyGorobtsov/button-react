import React, {useState} from 'react';

import {CanvasCaptcha} from "../../components/canvas";
import {MdInput} from "../../components/md-input";
import {Button} from "../../components/button";
import './style.css';

export function CanvasPage() {
    const [texts, setTexts] = useState([]);
    const [input, setInput] = useState('');
    return (
        <div className="container-canvas">
            <div className="row">
                <div className="wrap-btn">
                    <MdInput
                        label="Captcha"
                        events={{onChange: (e) => setInput(e.target.value)}}
                    />
                    <Button
                        mdRaised
                        events={{onClick:() => setTexts([input])}}
                    >
                        Draw text
                    </Button>
                </div>
                <CanvasCaptcha texts={texts}/>
            </div>
        </div>
    )
}