import React, {useState} from "react";
import {Button} from "./components/button";
import {MdToggleArrow} from "./components/md-toggle-arrow";
import {MenuToggle} from "./components/menu-toggle";
import {Sidenav} from "./components/md-sidenave";
import {IconButton} from "./components/md-icon-button";
import {Drawer} from "./components/drawer/Drawer";
import {routes} from "./routs";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useDrawer} from "./hooks/use-drawer";
import {Menu} from "./pages/drawer-page/svg/menu";
import {BackBurger} from "./pages/drawer-page/svg/back-burger";
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
            <header className="mdc-top-app-bar drawer-top-app-bar">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <IconButton
                            events={{
                                onClick: menuClick
                            }}
                            background={'rgb(250,250,250)'}
                        >
                            {!isOpen ? <Menu/> : <BackBurger/>}
                        </IconButton>
                        <span className="mdc-top-app-bar__title">Dismissible Drawer</span>
                    </section>
                </div>
            </header>
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
            {/*    <Message messages={['Action in progress..']}/>*/}
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
