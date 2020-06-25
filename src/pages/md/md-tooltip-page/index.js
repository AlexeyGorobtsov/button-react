import React from 'react';
import {MdTooltip} from "../../../components/md-tooltip";
import {MdIconButton} from "../../../components/md-icon-button";

export function TooltipPage(props) {
    return (
        <>
            <MdTooltip
                tooltipLabel={'Hello world'}
                isEllipses
            >
                <span>Hello world!</span>
            </MdTooltip>
            <MdIconButton tooltipLabel={'Hello world!'} position={'top'}>Yes</MdIconButton>
            <MdIconButton tooltipLabel={'Hello world!'} position={'left'}>Yes</MdIconButton>
            <MdIconButton tooltipLabel={'Hello world!'} position={'bottom'}>Yes</MdIconButton>
            <MdIconButton tooltipLabel={'Hello world!'} position={'right'}>Yes</MdIconButton>

        </>
    )
}