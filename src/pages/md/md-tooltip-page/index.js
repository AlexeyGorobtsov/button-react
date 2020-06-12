import React from 'react';
import {MdTooltip} from "../../../components/md-tooltip";
import {IconButton} from "../../../components/md-icon-button";

export function TooltipPage(props) {
    return(
        <>
            <MdTooltip
                tooltipLabel={'Hello world'}
                isEllipses
            >
                <span>Hello world!</span>
            </MdTooltip>
            <IconButton tooltipLabel={'Hello world!'} position={'top'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'left'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'bottom'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'right'}>Yes</IconButton>
        </>
    )
}