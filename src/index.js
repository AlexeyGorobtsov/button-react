import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import App from "./App";
import {Canvas} from "./pages/Canvas";
import {Drawer} from "./pages/Drawer";

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
              </ul>
          </div>
          <Switch>
              <Route exact path="/">
                  <App />
              </Route>
              <Route path="/drawer">
                  <Drawer />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  rootElement
);
