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
import {MdFabSpeedPage} from "./pages/md/md-fab-speed-page";
import {WhyDidYouUpdatePage} from "./pages/common-page/why-did-you-update-page";
import {MaskUUID} from "./pages/common-page/mask-UUID";
import {MdToastPage} from "./pages/md/md-toast-page";
import {LazyTablePage} from "./pages/common-page/lazy-table-page";
import {UseDebouncePage} from "./pages/common-page/use-debounce-page";
import {DragAndDropColumnTablePage} from "./pages/common-page/drag-and-drop-column-table-page";
import {LabelStudioPage} from "./pages/common-page/label-studio-page";
import {MdCheckboxPage} from "./pages/md/md-checkbox-page";
import {MdDialogPage} from "./pages/md/md-dialog-page";
import {MdTabsPage} from "./pages/md/md-tabs-page";

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
        path: '/common',
        children: [
            {
                component: WhyDidYouUpdatePage,
                label: 'Why did you update)',
                icon: null,
                path: '/common/why-did-you-update'
            },
            {
                component: MaskUUID,
                label: 'Mask UUID',
                icon: null,
                path: '/common/mask-uuid'
            },
            {
                component: LazyTablePage,
                label: 'Lazy Table',
                icon: null,
                path: '/common/lazy-table'
            },
            {
                component: UseDebouncePage,
                label: 'Use debounce',
                icon: null,
                path: '/common/use-debounce'
            },
            {
                component: DragAndDropColumnTablePage,
                label: 'Drag and drop table columns',
                icon: null,
                path: '/drag-and-drop-table-columns'
            },
            {
                component: LabelStudioPage,
                label: 'Label Studio',
                icon: null,
                path: '/label-studio'
            }
        ]
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
                component: MdCheckboxPage,
                label: 'MdCheckbox',
                icon: null,
                path: '/md/md-checkbox'
            },
            {
                component: MdDialogPage,
                label: 'MdDialog',
                icon: null,
                path: '/md/md-dialog'
            },
            {
              component: MdTabsPage,
              label: 'MdTabs',
              icon: null,
              path: '/md/md-tabs'
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
            },
            {
                component: MdFabSpeedPage,
                label: 'Fab Speed',
                icon: null,
                path: '/fab-speed'
            },
            {
                component: MdToastPage,
                label: 'Toast',
                icon: null,
                path: '/md-toast'
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