import React, {useState, useCallback} from 'react';

export function useClientRect(params) {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, [params]);
    return [rect, ref];

}
