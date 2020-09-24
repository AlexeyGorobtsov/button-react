import React from 'react';
import {MdTabs} from "../../../components/md-tabs";

export function MdTabsPage(props) {
    const tabs = [
        {
            tab: 'one some text some',
            tabContent: <div>
                <div
                    className="md-padding _md md-content">
                    <h1 className="md-display-2">Tab One</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                        Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus. In
                        sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
                        feugiat ultricies mi.
                    </p>
                </div>
            </div>
        },
        {
            tab: 'two some text some',
            tabContent: <div>
                <div className="md-content md-padding _md">
                    <h1 className="md-display-2">Tab Two</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                        Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus. In
                        sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
                        feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
                        orci enim rutrum enim, vel tempor sapien arcu a tellus. Vivamus convallis sodales ante
                        varius gravida. Curabitur a purus vel augue ultrices ultricies id a nisl. Nullam
                        malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae
                        posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis,
                        vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec
                        ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor
                        purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris
                        semper.</p>
                    <p>Morbi viverra, ante vel aliquet tincidunt, leo dolor pharetra quam, at semper massa
                        orci nec magna. Donec posuere nec sapien sed laoreet. Etiam cursus nunc in condimentum
                        facilisis. Etiam in tempor tortor. Vivamus faucibus egestas enim, at convallis diam
                        pulvinar vel. Cras ac orci eget nisi maximus cursus. Nunc urna libero, viverra sit amet
                        nisl at, hendrerit tempor turpis. Maecenas facilisis convallis mi vel tempor. Nullam
                        vitae nunc leo. Cras sed nisl consectetur, rhoncus sapien sit amet, tempus sapien.</p>
                    <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur
                        posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae
                        hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo
                        volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo
                        lectus.</p>
                </div>
            </div>
        },
        {
            tab: 'three some text two',
            tabContent: <div>
                <div className="md-content md-padding _md">
                    <h1 className="md-display-2">Tab Three</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
                        Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus. In
                        sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec,
                        feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor,
                        orci enim rutrum enim, vel tempor sapien arcu a tellus. Vivamus convallis sodales ante
                        varius gravida. Curabitur a purus vel augue ultrices ultricies id a nisl. Nullam
                        malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae
                        posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis,
                        vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec
                        ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor
                        purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris
                        semper.</p>
                    <p>Morbi viverra, ante vel aliquet tincidunt, leo dolor pharetra quam, at semper massa
                        orci nec magna. Donec posuere nec sapien sed laoreet. Etiam cursus nunc in condimentum
                        facilisis. Etiam in tempor tortor. Vivamus faucibus egestas enim, at convallis diam
                        pulvinar vel. Cras ac orci eget nisi maximus cursus. Nunc urna libero, viverra sit amet
                        nisl at, hendrerit tempor turpis. Maecenas facilisis convallis mi vel tempor. Nullam
                        vitae nunc leo. Cras sed nisl consectetur, rhoncus sapien sit amet, tempus sapien.</p>
                    <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur
                        posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae
                        hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo
                        volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo
                        lectus.</p>
                </div>
            </div>
        },

    ];


    return (
        <MdTabs
            tabs={tabs}
        />
    )
}