import React from "react";

import {MenuToggle} from "./components/menu-toggle";
import {MdIconButton} from "./components/md-icon-button";
import {Drawer} from "./components/drawer/Drawer";
import {routes} from "./routs";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useDrawer} from "./hooks/use-drawer";
import {Menu} from "./pages/drawer-page/svg/menu";
import {BackBurger} from "./pages/drawer-page/svg/back-burger";
import {Header} from "./common-components/header";
import {InfoContent} from "./container/info-components";
import './styles.css';

export default function App() {
    // const [observableData] = useObservable(arr, 1000);
    const {
        opening,
        closing,
        animate,
        open,
        isOpen,
        menuClick
    } = useDrawer();

    return (
        <div className="App">
            <Header
                menuClick={menuClick}
                isOpen={isOpen}
            />
            <Router>
                <Drawer
                    opening={opening}
                    animate={animate}
                    closing={closing}
                    open={open}
                    cn={'app-drawer'}
                >
                    <ul className="side-bar">
                        {routes.map((item, i) =>
                            <MenuToggle key={i} {...item} />
                        )}
                    </ul>
                </Drawer>
                <Switch>
                    <>
                    <div className="mdc-drawer-app-content">
                        <div className="drawer-main-content">
                            <div className="mdc-top-app-bar--fixed-adjust"/>
                            {
                                routes.map((item, i) => {
                                    if(item.children) {
                                        return item.children.map((child, j) => {
                                         return  <Route
                                             key={j}
                                             path={child.path}
                                             component={child.component}
                                         />
                                        })
                                    }

                                    return <Route
                                        key={i}
                                        path={item.path}
                                        component={item.component}
                                    />
                                })
                            }
                            <InfoContent/>
                        </div>
                    </div>
                        </>
                </Switch>
            </Router>

            {/*    <div className={'wrap-checkbox'}>*/}
            {/*        <MdCheckbox/>*/}
            {/*    </div>*/}
            {/*    <div className={"center"}>*/}
            {/*        <div style={{width: 400}}>*/}
            {/*            <MdList list={['item1', 'item2', 'item3']}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <Timeline steps={[*/}
            {/*        {step: 'Выберите модель', done: 'vcv-step-done'},*/}
            {/*        {step: 'Заполните форму', done: ''},*/}
            {/*        {step: 'Отправьте данные', done: ''},*/}
            {/*    ]}/>*/}
            {/*    <div className="flex-b">*/}
            {/*        <MdSwitch label={'Hello world!'}/>*/}
            {/*        <div style={{width: '60px', position: 'relative'}}>*/}
            {/*            <Badge label={12}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="gm-container">*/}
            {/*        <Button mdRaised>click</Button>*/}
            {/*        <GMSearch placeholder='Search' />*/}
            {/*        <Button mdRaised>click</Button>*/}
            {/*    </div>*/}
            {/*    <div className="flex-b">*/}
            {/*        <MdInput label="Captcha"/>*/}
            {/*        /!*<ul>*!/*/}
            {/*        /!*    {observableData.map((item) => <li>{item}</li>)}*!/*/}
            {/*        /!*</ul>*!/*/}

            {/*    </div>*/}
        </div>
    );
}
