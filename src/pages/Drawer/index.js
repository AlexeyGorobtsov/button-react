import React, {useState, useReducer} from 'react';

import {IconButton} from "../../components/md-icon-button";
import {Menu} from "./svg/menu";
import {BackBurger} from "./svg/back-burger";
import {delay } from '../../helpers'
import './style.css'

const initialState = {
    open: 'mdc-drawer--open',
    closing: '',
    animate: '',
    opening: '',
    isOpen: true
};

function reducer(state, action) {
    switch(action.type) {
        case 'MD_DRAWER_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default : {
            return state;
        }
    }
}


export function Drawer(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        opening,
        closing,
        animate,
        open,
        isOpen
    } = state;

    async function menuClick() {
        if(isOpen) {
            await dispatch({
                type: 'MD_DRAWER_UPDATE',
                payload: { closing: 'mdc-drawer--closing'}
            });
            await delay(120);
            dispatch({
                type: 'MD_DRAWER_UPDATE',
                payload: {open: ''}
            });
            return dispatch({
                type: 'MD_DRAWER_UPDATE',
                payload: {isOpen: false, closing: ''}
            })
        }
        dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: {open: 'mdc-drawer--open'}
        });
        dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: {animate: 'mdc-drawer--animate'}
        });
        await delay(80);
        dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: {opening: 'mdc-drawer--opening'}
        });
        await delay(120);
        await dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: {animate: ''}
        });
        return  dispatch({
            type: 'MD_DRAWER_UPDATE',
            payload: {isOpen: true, opening: ''}
        })

    }
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
                            opacity={'.2'}
                        >
                            {!isOpen ? <Menu /> : <BackBurger />}
                        </IconButton>
                        <span className="mdc-top-app-bar__title">Dismissible Drawer</span>
                    </section>
                </div>
            </header>
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