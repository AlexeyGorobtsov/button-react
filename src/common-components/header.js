import React from 'react';
import {MdIconButton} from "../components/md-icon-button";
import {Menu} from "../pages/drawer-page/svg/menu";
import {BackBurger} from "../pages/drawer-page/svg/back-burger";

export function Header(props) {
    const {
        menuClick,
        isOpen
    } = props;
    return (
        <header className="mdc-top-app-bar drawer-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <MdIconButton
                        events={{
                            onClick: menuClick
                        }}
                        background={'rgb(250,250,250)'}
                    >
                        {!isOpen ? <Menu/> : <BackBurger/>}
                    </MdIconButton>
                    <span className="mdc-top-app-bar__title">Dismissible Drawer</span>
                </section>
            </div>
        </header>
    )
}