import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import App from "./App";
import {Canvas} from "./pages/canvas-page";
import {CaptchaPage} from "./pages/captcha";
import {RadioButtonPage} from "./pages/radio-button-page";
import { DrawerPage} from "./pages/drawer-page";

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
                      <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                      <Link to="/radio-button">Radio Button</Link>
                  </li>
                  <li>
                      <Link to="/captcha">Captcha</Link>
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
              <Route path="/radio-button">
                  <RadioButtonPage />
              </Route>
              <Route path="/captcha">
                <CaptchaPage/>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  rootElement
);
