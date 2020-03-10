import React, {useState} from "react";
import "./styles.css";
import {Button} from "./components/button";
import {MdToggleArrow} from "./components/md-toggle-arrow";
import {MenuToggle} from "./components/menu-toggle";
import {Sidenav} from "./components/sidenave";

export default function App() {
    const [isToggle, setToggle] = useState(false);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Button
          mdRaised
          styleBtn={{ color: '#000'}}
          events={{onClick:() => setToggle(!isToggle)}}
      >
          CLICK ME
      </Button>
        <div style={{width: '240px', top: 0, right: 0, position: 'absolute'}}>
            <MenuToggle />
            <MenuToggle />
        </div>
        <Sidenav isToggle={isToggle}/>
    </div>
  );
}
