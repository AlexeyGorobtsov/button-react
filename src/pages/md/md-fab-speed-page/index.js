import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {MdFabSpeed} from "../../../components/md-fab-speed";
import {Twitter} from "../../../components/md-fab-speed/svg/twitter";
import {Facebook} from "../../../components/md-fab-speed/svg/facebook";
import {Hangouts} from "../../../components/md-fab-speed/svg/hangouts";
import {delay} from "../../../helpers";

function MdFabSpeedComponent(props) {
    const {
        dispatch
    } = props;
    useEffect(() => {
    delay(400)
        .then(() => dispatch({
            type: 'TOAST_UPDATE',
            payload: {
                isOpen: true,
                content: 'Fab speed'
            }
        }));

        return () => {
            dispatch({
                type: 'TOAST_UPDATE',
                payload: {
                    isOpen: false,
                }
            })
        }
    }, []);

  return (
      <MdFabSpeed
          backgroundRipple="#fff"
          position="left"
            mdFabItems={[
                {
                    component: <Twitter fill="#7d7d7d" />,
                    action: () => console.log(1)
                },
                {
                    component: <Facebook fill="#7d7d7d" />,
                    action: () => console.log(2),
                    isNotHide: true,
                },
                {
                    component: <Hangouts fill="#7d7d7d" />,
                    action: () => console.log(3)
                }
            ]}
      />
  )
}

export const MdFabSpeedPage = connect()(MdFabSpeedComponent);