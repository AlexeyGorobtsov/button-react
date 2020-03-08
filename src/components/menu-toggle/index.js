import React, {useState, useCallback, useEffect} from 'react';
import className from 'classnames';
import {Button} from "../button";
import {MdToggleArrow} from "../md-toggle-arrow";

import './style.css'

const liArr = ['paragraph-1', 'paragraph-2', 'paragraph-3', 'paragraph-4']

export function MenuToggle(props) {
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
        <div className={'menu-toggle'}>
            <Button
                events={{onClick: () => setToggle(!isToggle)}}
            >
                <div className={'layout-row flex'}>
                    Demo
                    <span className={'flex'}/>
                    <MdToggleArrow
                        isToggle={isToggle}
                        color={'#000'}
                    />
                </div>
            </Button>
            <ul
                className={'menu-toggle-list animate-menu'}
                style={style}
                ref={ulRef}
            >
                {liArr.map((el, i) =>
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
    )
}