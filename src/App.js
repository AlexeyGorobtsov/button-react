import React, {useState} from "react";
import "./styles.css";
import {Button} from "./components/button";
import {MdToggleArrow} from "./components/md-toggle-arrow";
import {MenuToggle} from "./components/menu-toggle";

export default function App() {
    const [isToggle, setToggle] = useState(false);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Button
          mdRaised
          bg={'#2196f3'}
          events={{onClick:() => setToggle(!isToggle)}}
      >
          <MdToggleArrow isToggle={isToggle} />
      </Button>
        <div style={{width: '240px'}}>
            <MenuToggle />
            <MenuToggle />
        </div>
    </div>
  );
}
