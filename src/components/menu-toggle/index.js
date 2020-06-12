import React, {useState, useCallback, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from "../button";
import {MdToggleArrow} from "../md-toggle-arrow";
import {isEmpty} from "../../helpers";

import './style.css'

export function MenuToggle(props) {
    const {label = '', path = '/', children = []} = props;
    const [isToggle, setToggle] = useState(false);
    const [style, setStyle] = useState({});
    const [height, setHeight] = useState(0);
    const ulRef = useCallback(node => {
        if (node !== null) {
            const height = node.getBoundingClientRect().height;
            setHeight(height);
        }
    }, []);
    useEffect(() => {
        isToggle ? setStyle({height: `${height}px`}) : setStyle({height: 0})
    }, [isToggle]);
    const isShow = !isEmpty(children);

    return (
        <li>
            <div className={'menu-toggle'}>
                <Button
                    events={{onClick: () => setToggle(!isToggle)}}
                >
                    <div className={'layout-row flex'}>
                        {!isShow ? <NavLink to={path}>{label}</NavLink> : <span>{label}</span>}
                        <span className={'flex'}/>
                        <MdToggleArrow
                            isToggle={isToggle}
                            color={'#000000de'}
                            isShow={isShow}
                        />
                    </div>
                </Button>
                <ul
                    className={'menu-toggle-list animate-menu'}
                    style={style}
                    ref={ulRef}
                >
                    {children.map((el, i) =>
                        <li
                            key={i}
                        >
                            <Button>
                                <NavLink to={el.path}>{el.label}</NavLink>
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </li>
    )
}