import React, {useEffect, useState} from 'react';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function useObservable (data, delayMs) {
    const [source, setSource]= useState(null);
    const [consumer, setConsumer] = useState([]);
    useEffect(() => {
        data.map(async (item, i) => {
            await delay(delayMs * i);
            setSource(item);
        });
    }, [data]);

    useEffect(() => {
        source && setConsumer([...consumer, source])
    }, [source]);


    return [consumer]
}
