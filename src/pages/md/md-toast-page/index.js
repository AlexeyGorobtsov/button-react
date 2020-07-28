import React, {useState} from 'react';
import {MdToast} from "../../../components/md-toast";
import {Button} from "../../../components/button";
import {Message} from "../../../components/message";
import {SpinIcon} from "../../../components/message/SpinIcon";

export function MdToastPage(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Message messages={['Action in progress..']}/>
            <SpinIcon height="24px" width="24px"/>
            <Button
                mdRaised
                events={{onClick: () => setIsOpen(!isOpen)}}
            >Show toast</Button>
            <MdToast
                content='Список допустимых типов файлов: jpeg, jpg, gif, png, pdf, tiff, tif.'
                isOpen={isOpen}
                close={() => setIsOpen(false)}
            />
        </>
    )
}