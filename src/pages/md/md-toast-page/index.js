import React, {useState} from 'react';
import {MdToast} from "../../../components/md-toast";
import {Button} from "../../../components/button";

export function MdToastPage(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
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