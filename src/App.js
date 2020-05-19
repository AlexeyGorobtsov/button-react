import React, {useState, useEffect} from "react";
import "./styles.css";
import {Button} from "./components/button";
import {MdToggleArrow} from "./components/md-toggle-arrow";
import {MenuToggle} from "./components/menu-toggle";
import {Sidenav} from "./components/sidenave";
import {IconButton} from "./components/md-icon-button";
import {MdCheckbox} from "./components/checkbox";
import {MdTooltip} from "./components/md-tooltip";
import {MdList} from "./components/md-list";
import {OutsideClickEvent} from "./components/outside-click-event";
import {MdPanel} from "./components/md-panel";
import {Timeline} from "./components/timeline";
import {Message} from "./components/message";
import {MdSwitch} from "./components/md-switch";
import {CanvasCaptcha} from "./components/canvas/";
import {MdInput} from "./components/md-input";
import {Badge} from "./components/badge";
import {GMSearch} from './components/gm-search';
import {useObservable} from "./hooks/use-observable.js";

const arr = [
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
];

export default function App() {
    const [isToggle, setToggle] = useState(false);
    const [texts, setTexts] = useState([]);
    const [input, setInput] = useState('');
    // const [observableData] = useObservable(arr, 1000);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
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
            <MdTooltip
                tooltipLabel={'Hello world'}
                isEllipses
            >
                <span>Hello world!</span>
            </MdTooltip>
            <IconButton tooltipLabel={'Hello world!'} position={'top'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'left'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'bottom'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'right'}>Yes</IconButton>
            <div style={{width: '240px', top: 0, right: 0, position: 'absolute'}}>
                <MenuToggle/>
                <MenuToggle/>
            </div>
            {/*<Sidenav isToggle={isToggle}/>*/}
            <div className={'wrap-checkbox'}>
                <MdCheckbox/>
            </div>
            <div className={"center"}>
                <div style={{width: 400}}>
                    <MdList list={['item1', 'item2', 'item3']}/>
                </div>
            </div>
            <Timeline steps={[
                {step: 'Выберите модель', done: 'vcv-step-done'},
                {step: 'Заполните форму', done: ''},
                {step: 'Отправьте данные', done: ''},
            ]}/>
            <Message messages={['Action in progress..']}/>
            <div className="flex-b">
                <MdSwitch label={'Hello world!'}/>
                <div style={{width: '60px', position: 'relative'}}>
                    <Badge label={12}/>
                </div>
            </div>
            <div className="gm-container">
                <Button mdRaised>click</Button>
                <GMSearch placeholder='Search' />
                <Button mdRaised>click</Button>
            </div>
            <div className="flex-b">
                <MdInput label="Captcha"/>
                {/*<ul>*/}
                {/*    {observableData.map((item) => <li>{item}</li>)}*/}
                {/*</ul>*/}

            </div>
            <div className="container-canvas">
                <div className="row">
                    <div className="wrap-btn">
                        <MdInput label="Captcha" events={{onChange: (e) => setInput(e.target.value)}}/>
                        <Button
                            mdRaised
                            events={{onClick:() => setTexts([input])}}
                        >
                            Draw text
                        </Button>
                    </div>
                    <CanvasCaptcha texts={texts}/>
                </div>
            </div>
        </div>
    );
}
