import React, {useState, useCallback, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import className from 'classnames';

import {Button} from "../button";
import {MdToggleArrow} from "../md-toggle-arrow";
import {isEmpty} from "../../helpers";

import './style.css'

export function MenuToggle(props) {
    const {label = '', path = '/', children = []} = props;
    const [isToggle, setToggle] = useState(false);
    const [style, setStyle] = useState({});
    const [height, setHeight] = useState(0);
    const [isActive, setIsActive] = useState(null);
    const ulRef = useCallback(node => {
        if (node !== null) {
            const height = node.getBoundingClientRect().height;
            setHeight(height);
        }
    }, []);
    useEffect(() => {
        isToggle ? setStyle({height: `${height}px`}) : setStyle({height: 0})
    }, [isToggle]);


    return (
        <li>
            <div className={'menu-toggle'}>
                <Button
                    events={{onClick: () => setToggle(!isToggle)}}
                >
                    <div className={'layout-row flex'}>
                        <NavLink activClassName="is-active-link" to={path}>{label}</NavLink>
                        <span className={'flex'}/>
                        <MdToggleArrow
                            isToggle={isToggle}
                            color={'#000000de'}
                            isShow={!isEmpty(children)}
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
                            onClick={() => setIsActive(i)}
                            className={className({isActive: isActive === i})}
                            key={i}
                        >
                            <Button>
                                <a href="#">{el}</a>
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </li>
    )
}