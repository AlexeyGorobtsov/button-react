import React from 'react';
import classNames from 'classnames';

import './style.css'

export function Sidenav({ isToggle = false }) {
    return (
        <div className={classNames('md-sidenav', {'md-closed': isToggle})}>
            <div className={'md-toolbar'}>
                <h4>Sidenav</h4>
            </div>
            <div className={'md-content'}>
                <p>This sidenav is not showing</p>
            </div>
        </div>
    )
}