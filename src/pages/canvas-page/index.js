import React, {useState} from 'react';

import {CanvasPoly} from "../../components/canvas";
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
                    <div className="wrap-btn-text">
                        <MdInput
                            label="Text"
                            events={{onChange: (e) => setInput(e.target.value)}}
                        />
                        <Button
                            mdRaised
                            events={{onClick:() => setTexts([input])}}
                            cn="button-draw-text"
                        >
                            Draw text
                        </Button>
                    </div>
                </div>
                <CanvasPoly
                    texts={texts}
                />
            </div>
        </div>
    )
}