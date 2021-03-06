import React from 'react';
import className from 'classnames';
import {ArrowIcon} from "./ArrowIcon";

import './style.css'

export function MdToggleArrow({color = '#fff', isToggle = false, isShow = true}) {
    if (!isShow) return [];

    return(
        <span
            className={className('md-icon-toggle', 'md-toggle-icon', {toggled: isToggle})}
            style={{color}}
        >
            <ArrowIcon />
        </span>
    )
}