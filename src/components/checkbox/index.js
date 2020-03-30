import React, {useState, useEffect, useRef, useReducer} from 'react';
import className from "classnames";

import './style.css'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
    id: 0,
    scaled: {},
    remove: {},
    active: {}
};
const emptyObj = {};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ID': {
            return {
                ...state,
                id: action.id
            }
        }
        case 'SET_SCALED': {
            return {
                ...state,
                scaled: {...state.scaled, ...action.scaled }
            }
        }
        case 'SET_REMOVE': {
            return {
                ...state,
                remove: {...state.remove, ...action.remove}
            }
        }
        case 'SET_ACTIVE': {
            return {
                ...state,
                active: {...state.active, ...action.active }
            }
        }
        case 'RESET': {
            return initialState;
        }
        default : {
            return state;
        }
    }
}


export function MdCheckbox(props) {

    const {
        cn = {},
        events = {},
        disabled = false
    } = props;
    const [id, setId] = useState(0);
    const [checked, setChecked] = useState(false);
    const [spanStyle, setSpanStyle] = useState([]);
    const btnRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
          return () => {
              clearTimeout(id);
              dispatch({type: 'RESET'})
          }
    }, []);

    function handleMouseDown(e) {
        const ripple = btnRef.current;
        const size = ripple.offsetWidth;
        const styleEl = {
            width: `${size}px`,
            height: `${size}px`,
            top: `${size / 2}px`,
            left: `${size / 2}px`
        };
        setSpanStyle([...spanStyle, styleEl]);
        setChecked(!checked);
        delay(0).then((res) => {
            dispatch({
                type: 'SET_SCALED',
                scaled: { [state.id]: 'md-ripple-scaled'
                }});
            dispatch({
                type: 'SET_ACTIVE',
                active: {[state.id]: 'md-ripple-active'
                }});
        });
    }

    function handleMouseUp() {
        delay(0).then((res) => {
            return delay(300).then(() => {
                dispatch({
                    type: 'SET_REMOVE',
                    remove: {[state.id]: 'md-ripple-remove'
                    }});
            })
        }).then((res) => {
            dispatch({
                type: 'SET_ACTIVE',
                active: {[state.id]: ''
                }})
        });
        dispatch({
            type: 'SET_ID',
            id: state.id + 1
        });
         clearTimeout(id);
        const idTimeout = setTimeout(function () {
            setSpanStyle([]);
            dispatch({type: 'RESET'})
        }, 550);
        setId(idTimeout)
    }

    const checkedEvents = disabled ? emptyObj : events;

    return (
        <div
            className={className('md-checkbox', {'md-checked': checked, 'md-checkbox-disabled': disabled})}
            onMouseDown={!disabled ? handleMouseDown : null}
            onMouseUp={!disabled ? handleMouseUp : null}
            {...checkedEvents}
        >
            <div className="md-container md-ink-ripple">
                <div className="md-icon"/>
            </div>
            <div className="md-ripple-container" ref={btnRef}>
                {spanStyle.map((el, i) => <div
                    key={i}
                    className={className(`md-ripple md-ripple-placed`,
                        state.scaled[i],
                        state.remove[i],
                        state.active[i]
                    )}
                    style={{...el, background: '#000', borderColor: '#000'}}
                />)}
            </div>
        </div>

    )
}