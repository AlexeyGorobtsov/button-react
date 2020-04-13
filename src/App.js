import React, {useState} from "react";
import "./styles.css";
import {Button} from "./components/button";
import {MdToggleArrow} from "./components/md-toggle-arrow";
import {MenuToggle} from "./components/menu-toggle";
import {Sidenav} from "./components/sidenave";
import {IconButton} from "./components/md-icon-button";
import {MdCheckbox} from "./components/checkbox";
import {MdTooltip} from "./components/md-tooltip";
import {MdList} from "./components/md-list";
import {OutsideClickEvent} from "./components/OutsideClickEvent";
import {MdPanel} from "./components/md-panel";

export default function App() {
    const [isToggle, setToggle] = useState(false);
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <div>
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
            ><span>Hello world!</span>
            </MdTooltip>
            <IconButton tooltipLabel={'Hello world!'} position={'top'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'left'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'bottom'}>Yes</IconButton>
            <IconButton tooltipLabel={'Hello world!'} position={'right'}>Yes</IconButton>
            <div style={{width: '240px', top: 0, right: 0, position: 'absolute'}}>
                <MenuToggle/>
                <MenuToggle/>
            </div>
            <Sidenav isToggle={isToggle}/>
            <div className={'wrap-checkbox'}>
                <MdCheckbox/>
            </div>
            <div className={"center"}>
                <div style={{width: 400}}>
                    <MdList list={['item1', 'item2', 'item3']}/>
                </div>
            </div>
        </div>
    );
}
