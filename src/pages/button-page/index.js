import React from 'react';
import {Button} from "../../components/button";

export function ButtonPage(props) {
    return(
        <Button
            mdRaised
            styleBtn={{color: '#000'}}
        >
            CLICK ME
        </Button>
    )
}