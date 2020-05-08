import React, { useRef, useEffect } from "react";


function useOutside(ref, callback = null) {
    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback && callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export function OutsideClickEvent(props) {
    const { callback = () => console.log('callback') } = props;
    const wrapperRef = useRef(null);
    useOutside(wrapperRef, callback);

    return <span ref={wrapperRef}>{props.children}</span>;
}

