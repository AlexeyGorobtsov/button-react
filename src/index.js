import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import App from "./App";
import {CaptchaPage} from "./pages/captcha-page";
import {RadioButtonPage} from "./pages/radio-button-page";
import { DrawerPage} from "./pages/drawer-page";
import {ButtonPage} from "./pages/button-page";
import {TooltipPage} from "./pages/tooltip-page";
import {CanvasPage} from "./pages/canvas-page";
import {CommonPage} from "./pages/common-page";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
      <Router>
          <div>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/drawer">Drawer</Link>
                  </li>
                  <li>
                      <Link to="/canvas">Canvas</Link>
                  </li>
                  <li>
                      <Link to="/radio-button">Radio Button</Link>
                  </li>
                  <li>
                      <Link to="/captcha">Captcha</Link>
                  </li>
                  <li>
                      <Link to="/button">Button</Link>
                  </li>
                  <li>
                      <Link to="/tooltip">Tooltip</Link>
                  </li>
                  <li>
                      <Link to="/common">Common</Link>
                  </li>
              </ul>
          </div>
          <Switch>
              <Route exact path="/">
                  <App />
              </Route>
              <Route path="/drawer">
                  <DrawerPage />
              </Route>
              <Route path="/canvas">
                  <CanvasPage/>
              </Route>
              <Route path="/radio-button">
                  <RadioButtonPage />
              </Route>
              <Route path="/captcha">
                <CaptchaPage/>
              </Route>
              <Route path="/button">
                  <ButtonPage/>
              </Route>
              <Route path="/tooltip">
                  <TooltipPage/>
              </Route>
              <Route path="/common">
                  <CommonPage/>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  rootElement
);
