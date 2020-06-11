import React from 'react';

import './style.css'

export function Drawer(props) {
    const {
        opening,
        animate,
        closing,
        open,
        children,
        cn = ''
    } = props;
    return (
        <aside className={
            `mdc-drawer mdc-drawer--dismissible ${opening} ${animate} ${closing} ${open} ${cn}`
        }>
            <div className="mdc-drawer__content">
                <nav className="mdc-list">
                    {children}
                </nav>
            </div>
        </aside>
    )
}