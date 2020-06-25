import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'

import {MdInput} from "../../../components/md-input";
import {Button} from "../../../components/button";
import {delay} from "../../../helpers";
import './style.css';

export function MdInputComponent(props) {
    const {
        dispatch = () => console.log('dispatch'),
    } = props;
    const [disabledInput, setDisabled] = useState({});

    useEffect(() => {
        delay(400)
            .then(() => dispatch({
            type: 'TOAST_UPDATE',
            payload: {
                isOpen: true,
                content: 'Input toast'
            }
        }));

        return () => {
            dispatch({
                type: 'TOAST_UPDATE',
                payload: {
                    isOpen: false,
                }
            })
        }
    }, []);

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

export const MdInputPage = connect()(MdInputComponent);