import React from 'react';
import className from 'classnames';
import {ArrowIcon} from "./ArrowIcon";

import './style.css'

export function MdToggleArrow({color = '#fff', isToggle = false}) {
    return(
        <span
            className={className('md-icon', 'md-toggle-icon', {toggled: isToggle})}
            style={{color}}
        >
            <ArrowIcon />
        </span>
    )
}