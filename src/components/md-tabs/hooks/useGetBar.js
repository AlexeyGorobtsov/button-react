import React, {useEffect} from 'react';

export function useGetBar({id, widthTab, dispatch, prevId}) {

    function getBar() {
        const width = Object.keys(widthTab);
        const last = width.length - 1;

        return width.reduce((acc, item, i) => {
            if (id === 0) {
                if (i === 0) return acc;
                acc.left = 0;
                acc.right = acc.right + widthTab[i];
                return acc;
            }
            if (id === last) {
                if (i === last) return acc;
                acc.right = 0;
                acc.left = acc.left + widthTab[i];
                return acc;
            }
            if (id === i) {
                acc.isCount = true;
                return acc;
            } else if (acc.isCount) {
                acc.right = acc.right + widthTab[i];
                return acc;
            }
            acc.left = acc.left + widthTab[i];
            return acc;
        }, {left: 0, right: 0});
    }


    useEffect(() => {
        const res = getBar();
        const barClass = prevId > id ? 'md-left' : 'md-right';
        const payload = {left: res.left, right: res.right, barClass};
        dispatch({type: 'MD_TABS_UPDATE', payload})
    }, [id, widthTab]);
}