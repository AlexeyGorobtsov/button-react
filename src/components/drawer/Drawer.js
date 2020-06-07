import React from 'react';

import './style.css'

export function Drawer(props) {
    const {
        opening,
        animate,
        closing,
        open
    } = props;
    return (
        <aside className={
            `mdc-drawer mdc-drawer--dismissible ${opening} ${animate} ${closing} ${open}`
        }>
            <div className="mdc-drawer__content">
                <nav className="mdc-list">
                    <ul>
                        <li className="active">some item</li>
                        <li>some item</li>
                        <li>some item</li>
                        <li>some item</li>
                        <li>some item</li>
                        <li>some item</li>
                        <li>some item</li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}