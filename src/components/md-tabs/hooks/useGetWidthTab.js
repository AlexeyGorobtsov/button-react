import React, {useEffect} from 'react';

export function useGetWidthTab({ref, dispatch, windowSize}) {
    useEffect(() => {
        const mdTabsCanvas = ref;
        const mdPaginationWrapper = mdTabsCanvas?.querySelector('.md-pagination-wrapper');
        const widthTabsCanvas = mdTabsCanvas?.clientWidth;
        const widthPaginationWrapper = mdPaginationWrapper?.clientWidth;
        dispatch({type: 'MD_TABS_UPDATE', payload: {widthTabsCanvas, widthPaginationWrapper}})
    }, [ref, windowSize.width]);
}