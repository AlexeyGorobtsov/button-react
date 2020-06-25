import React from 'react';
import {connect} from 'react-redux';

import {MdToast} from "../../../components/md-toast";

function ToastComponent(props) {
    const {
        isOpen = false,
        content = '',
        dispatch = () => console.log('dispatch')
    } = props;

    function close() {
        dispatch({
            type: 'TOAST_UPDATE',
            payload: {isOpen: false}
        })
    }

    return (
        <MdToast
            isOpen={isOpen}
            content={content}
            close={close}
        />
    )
}

export const Toast = connect(store => {
    return { ...store.toast}
})(ToastComponent);
