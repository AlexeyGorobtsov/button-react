import React, {useState, useEffect, useRef} from 'react';

export function useWhyDidYouUpdate(name, props) {
    const previousProps = useRef();

    useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({...previousProps.current, props});

            const changesObject = allKeys.reduce((acc, key) => {
                if(previousProps.current[key] !== props[key]) {
                    acc[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    };

                    return acc;
                 }

                return acc;
            }, {});

            if(Object.keys(changesObject).length) {
                console.log('[why did you update]', name, changesObject)
            }
        }
        previousProps.current = props;
    })

}