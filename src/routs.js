import React from 'react';

import {ButtonPage} from "./pages/button-page";
import {CanvasPage} from "./pages/canvas-page";
import {CaptchaPage} from "./pages/captcha-page";
import {CommonPage} from "./pages/common-page";
import {DrawerPage} from "./pages/drawer-page";
import {RadioButtonPage} from "./pages/radio-button-page";
import {TooltipPage} from "./pages/md/md-tooltip-page";
import {MdPaneLPage} from "./pages/md/md-panel-page";
import {MenuTogglePage} from "./pages/menu-toggle-page";
import {MdSidenavPage} from "./pages/md/md-side-nave-page";
import {MdInputPage} from "./pages/md/md-input-page";

export const routes = [
    {
        component: DrawerPage,
        label: 'Drawer',
        icon: null,
        path: '/drawer'
    },
    {
        component: CanvasPage,
        label: 'Canvas',
        icon: null,
        path: '/canvas'
    },
    {
        component: RadioButtonPage,
        label: 'Radio button',
        icon: null,
        path: '/radio-button'
    },
    {
       component: CaptchaPage,
       label: 'Captcha',
       icon: null,
       path: '/captcha'
    },
    {
        component: ButtonPage,
        label: 'Button',
        icon: null,
        path: '/button'
    },
    {
        component: CommonPage,
        label: 'Common',
        icon: null,
        path: '/common'
    },
    {
        component: null,
        label: 'MD',
        icon: null,
        path: '/md',
        children: [
            {
                component: MdPaneLPage,
                label: 'MdPanel',
                icon: null,
                path: '/md/md-panel'
            },
            {
                component: TooltipPage,
                label: 'Tooltip',
                icon: null,
                path: '/md/tooltip'
            },
            {
                component: MdSidenavPage,
                label: 'Sidenav',
                icon: null,
                path: '/sidenav'
            },
            {
                component: MdInputPage,
                label: 'Input',
                icon: null,
                path: '/md-input'
            }
        ]
    },
    {
        component: MenuTogglePage,
        label: 'Menu',
        icon: null,
        path: '/menu-toggle'
    }
];