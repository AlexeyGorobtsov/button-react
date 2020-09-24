import React, {useEffect, useRef} from 'react';
import 'label-studio/build/static/js/main.e963e015';
import 'label-studio/build/static/css/main.09b8161e.css'

import {Button} from "../../../components/button";

export function LabelStudioPage(props) {
    const LabelStudio = window.LabelStudio;
    const myLabelStudioRef = useRef(null);

    useEffect(() => {
        myLabelStudioRef.current = new LabelStudio("label-studio", {
            config: `
  <View style="padding: 25px;
               box-shadow: 2px 2px 8px #AAA">
    <Header value="Label the image with polygons"/>
    <Image name="img" value="$image" maxWidth="400px"/>

    <PolygonLabels name="tag" toName="img">
      <Label value="He" background="blue" class="test" />
      <Label value="Rd" background="red"/>
    </PolygonLabels>
  </View>
    `,

            interfaces: [],

            user: {},
            task: {
                "completions":[
                    {
                        "result":[
                            {
                                "from_name":"tag",
                                "to_name":"img",
                                "type":"polygonlabels",
                                "value":{
                                    "points":[
                                        [
                                            27.2,
                                            41.24629080118694
                                        ],
                                        [
                                            25.73333333333333,
                                            70.62314540059347
                                        ],
                                        [
                                            48.13333333333333,
                                            62.61127596439169
                                        ],
                                        [
                                            48.13333333333333,
                                            32.93768545994065
                                        ]
                                    ],
                                    "polygonlabels":[
                                        "Hello"
                                    ]
                                }
                            },
                            {
                                "id":"XSMXwwsaTa",
                                "from_name":"tag",
                                "to_name":"img",
                                "type":"polygonlabels",
                                "value":{
                                    "points":[
                                        [20.75, 17],
                                        [34.5, 21.8],
                                        [16, 27.800000000000004],
                                    ],
                                    "polygonlabels":[
                                        "Hello"
                                    ]
                                }
                            }


                        ]
                    }
                ],
                predictions: [],
                id: 1,
                data: {
                    image:
                        "https://htx-misc.s3.amazonaws.com/opensource/label-studio/examples/images/nick-owuor-astro-nic-visuals-wDifg5xc9Z4-unsplash.jpg",
                },

                onEntityCreate: function(region) {
                    console.log(region)
                },

            },

            onLabelStudioLoad: function (LS) {
                const c = LS.completionStore.addCompletion({
                    userGenerate: true,
                });
                LS.completionStore.selectCompletion(c.id);
            },
        });
    }, []);

    return (
        <>
            <div id="label-studio"/>
            <Button
                events={{onClick: () => {
                    const completions = window.Htx.completionStore.completions[0];
                    const regions = completions.regionStore.regions.toJSON();
                    const result = regions.reduce((acc, item, i) => {
                        acc[i] = {points: []};
                        item.points.toJSON().map(el => {
                            acc[i].points.push([el.relativeX, el.relativeY]);
                            return acc;
                        });

                        return acc;
                    }, {});
                    console.log(result)
                    }}}
            >
                Get result
            </Button>
        </>
    );
}

