import React from 'react';

import './style.css'

export function MdDialog(props) {
    const {
        isShow = false
    } = props;

    return (
        <div className="md-dialog-container ng-scope" tabIndex="-1">
            <div className="md-dialog-backdrop md-opaque md-backdrop" />
            <div
                className="md-dialog md-default-theme md-transition-in"
            >
                <div className="md-dialog-content">
                    <h2 className="md-title ng-binding">This is an alert title</h2>
                    <div className="md-dialog-content-body">
                        <p className="ng-binding">You can specify some description text in here.</p>
                    </div>
                </div>
                <div>
                    <button
                        className="md-primary md-confirm-button md-button md-autofocus md-ink-ripple md-default-theme"
                        type="button"
                    >Got it!
                    </button>
                </div>
            </div>
        </div>
    )
}