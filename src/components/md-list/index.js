import React, {useState} from 'react';
import {MdItem} from './MdItem'

export function MdList(props) {
    const {list = []} = props;
    const [idsCheckbox, setIdsCheckbox] = useState([]);

    function handleItem(id) {
        if (idsCheckbox.includes(id)) {
            const updateIds = idsCheckbox.filter(item => item !== id);
            setIdsCheckbox(updateIds);
        } else {
            setIdsCheckbox([...idsCheckbox, id])
        }
    }

    return (
        <div className={'md-list'}>
            {list.map((item, i) =>
                <MdItem
                    key={i}
                    itemList={item}
                    idsCheckbox={idsCheckbox}
                    events={{onClick: () => handleItem(item)}}
                />
            )}
        </div>
    )
}