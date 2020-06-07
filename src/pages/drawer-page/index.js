import React from 'react';

import {IconButton} from "../../components/md-icon-button";
import {Menu} from "./svg/menu";
import {BackBurger} from "./svg/back-burger";
import {useDrawer} from "../../hooks/use-drawer";
import {Drawer} from "../../components/drawer/Drawer";
import './style.css'

export function DrawerPage(props) {
    const {
        opening,
        closing,
        animate,
        open,
        isOpen,
        menuClick
    } = useDrawer();
    return (
        <div className="drawer-container">
            <header className="mdc-top-app-bar drawer-top-app-bar">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <IconButton
                            events={{
                                onClick: menuClick
                            }}
                            background={'rgb(250,250,250)'}
                        >
                            {!isOpen ? <Menu /> : <BackBurger />}
                        </IconButton>
                        <span className="mdc-top-app-bar__title">Dismissible Drawer</span>
                    </section>
                </div>
            </header>
            <Drawer
                opening={opening}
                animate={animate}
                closing={closing}
                open={open}
            />
            <div className="mdc-drawer-app-content">
                <div className="drawer-main-content">
                    <div className="mdc-top-app-bar--fixed-adjust"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    )
}