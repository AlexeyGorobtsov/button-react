import React, { useRef } from "react";
import {useOutside} from "../../hooks/use-outside";

export function OutsideClickEvent(props) {
    const { callback = () => console.log('callback') } = props;
    const wrapperRef = useRef(null);
    useOutside(wrapperRef, callback);

    return <span ref={wrapperRef}>{props.children}</span>;
}

