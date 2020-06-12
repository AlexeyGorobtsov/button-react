import React from 'react';

import {MenuToggle} from "../../components/menu-toggle";
import './style.css';

const simple = {
    component: null,
    label: 'Hello world',
    icon: null,
    path: '/menu-toggle'
};

const nested =  {
    label: 'Simple nested',
    icon: null,
    path: '/menu-toggle',
    children: [
        {
            component: null,
            label: 'First child',
            icon: null,
            path: '/menu-toggle'
        },
        {
            component: null,
            label: 'Second child',
            icon: null,
            path: '/menu-toggle'
        },
        {
            component: null,
            label: 'Third child',
            icon: null,
            path: '/menu-toggle'
        }
    ]
};

export function MenuTogglePage(props) {
    return (
            <div style={{width: '240px', top: 200, right: 200, position: 'absolute'}}>
                <ul className="menu">
                    <MenuToggle {...simple} />
                    <MenuToggle {...nested} />
                </ul>
            </div>
    )
}