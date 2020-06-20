import React, {useState, useMemo} from 'react';

import {Button} from "../../../components/button";
import {useWhyDidYouUpdate} from "../../../hooks/use-why-did-you-update";
import './style.css';

const Counter = React.memo(props => {
    useWhyDidYouUpdate('Counter', props);

    return <div style={props.style}>{props.count}</div>
});

export function WhyDidYouUpdatePage(props) {
    const [counter, setCounter] = useState(0);
    const [userId, setUserId] = useState(0);

    const counterStyle = {
        fontSize: '3rem',
        color: 'red'
    };

    return(
        <div className="wrap-why-did-you-update">
            <div className="counter">
                <Counter style={counterStyle} count={counter}/>
                <Button events={{onClick: () => setCounter(counter + 1)}}>Increment</Button>
            </div>
            <div className="user">
                <img src={`http://i.pravatar.cc/80?img=${userId}`} style={{display: 'block'}}/>
                <Button events={{onClick: () => setUserId(userId + 1)}}>Switch user</Button>
            </div>
        </div>
    )
}