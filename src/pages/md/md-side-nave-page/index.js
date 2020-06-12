import React, {useState} from 'react';

import {MdSidenav} from "../../../components/md-sidenave";
import {Button} from "../../../components/button";
import './style.css';

export function MdSidenavPage(props) {
    const [isToggle, setToggle] = useState(false);
    return (
        <div className="sidenav-page">
            <div className="wrap-button-sidenav">
                <Button events={{onClick: () => setToggle(!isToggle)}} mdRaised>click me</Button>
            </div>
            <MdSidenav isToggle={isToggle}/>
        </div>
    )
}