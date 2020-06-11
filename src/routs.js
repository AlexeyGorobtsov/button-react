import React from 'react';

import {ButtonPage} from "./pages/button-page";
import {CanvasPage} from "./pages/canvas-page";
import {CaptchaPage} from "./pages/captcha-page";
import {CommonPage} from "./pages/common-page";
import {DrawerPage} from "./pages/drawer-page";
import {RadioButtonPage} from "./pages/radio-button-page";
import {TooltipPage} from "./pages/tooltip-page";

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
        component: TooltipPage,
        label: 'Tooltip',
        icon: null,
        path: '/tooltip'
    },
    {
        component: CommonPage,
        label: 'Common',
        icon: null,
        path: '/common'
    }
];