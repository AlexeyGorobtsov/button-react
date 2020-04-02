import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ id, children }) => {
    const el = useRef(
        document.getElementById(id) || document.createElement('div'),
    );
    const [dynamic] = useState(!el.current.parentElement);
    useEffect(() => {
        const current = el.current;
        if (dynamic) {
            current.id = id;
            document.body.appendChild(current);
        }
        return () => {
            if (dynamic && current.parentElement) {
                current.parentElement.removeChild(current);
            }
        };
    }, [id, dynamic]);
    return createPortal(children, el.current);
};

export default memo(Portal);