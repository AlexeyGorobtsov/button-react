import React from 'react';
import {MdFabSpeed} from "../../../components/md-fab-speed";
import {Twitter} from "../../../components/md-fab-speed/svg/twitter";
import {Facebook} from "../../../components/md-fab-speed/svg/facebook";
import {Hangouts} from "../../../components/md-fab-speed/svg/hangouts";

export function MdFabSpeedPage() {
  return (
      <MdFabSpeed
          backgroundRipple="#fff"
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