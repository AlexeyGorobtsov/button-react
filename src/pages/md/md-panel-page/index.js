import React, {useState} from 'react';

import {MdPanel} from "../../../components/md-panel";
import {Button} from "../../../components/button";

export function MdPaneLPage(props) {
    const [isToggle, setToggle] = useState(false);
    return(
        <div className="flex-b">
            <MdPanel
                offsetLeft={8}
                list={['item1', 'item2', 'item3']}
            >
                <Button
                    mdRaised
                    styleBtn={{color: '#000'}}
                    events={{onClick: () => setToggle(!isToggle)}}
                >
                    CLICK ME
                </Button>
            </MdPanel>
        </div>
    )
}