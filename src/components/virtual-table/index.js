import React, {useRef, useState, useEffect} from 'react';

import './style.css';

function VirtualList(config) {
    var width = (config && config.w + "px") || "100%";
    var height = (this.height = (config && config.h + "px") || "100%");
    var itemHeight = (this.itemHeight = config.itemHeight);

    this.items = config.items;
    this.generatorFn = config.generatorFn;
    console.log(config.totalRows);
    this.totalRows = config.totalRows || (config.items && config.items.length);

    var totalHeight = itemHeight * this.totalRows;
    this.scroller = VirtualList.createScroller(totalHeight);
    this.container = VirtualList.createContainer(width, height);

    var screenItemsLen = Math.ceil(config.h / itemHeight);
    // Cache 4 times the number of items that fit in the container viewport
    var cachedItemsLen = screenItemsLen * 3;
    this._renderChunk(this.container, 0, cachedItemsLen / 2);

    var self = this;
    var lastRepaintY;
    var maxBuffer = screenItemsLen * itemHeight;

    function onScroll(e) {
        var scrollTop = e.target.scrollTop;
        var first = parseInt(scrollTop / itemHeight) - screenItemsLen;
        first = first < 0 ? 0 : first;
        if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
            self._renderChunk(self.container, first, cachedItemsLen);
            lastRepaintY = scrollTop;
            console.log({scrollTop, first, cachedItemsLen, self, lastRepaintY})
        }

        e.preventDefault && e.preventDefault();
    }

    this.container.addEventListener("scroll", onScroll);
}

VirtualList.prototype._renderChunk = function (node, fromPos, howMany) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(this.scroller);

    var finalItem = fromPos + howMany;
    if (finalItem > this.totalRows) finalItem = this.totalRows;

    for (var i = fromPos; i < finalItem; i++) {
        var item;
        console.log({i, fromPos})
        if (this.generatorFn) item = this.generatorFn(i);
        else {
            if (typeof this.items[i] === "string") {
                var itemText = document.createTextNode(this.items[i]);
                item = document.createElement("div");
                item.style.height = this.height;
                item.appendChild(itemText);
            } else {
                item = this.items[i];
            }
        }

        item.classList.add("vrow");
        item.style.position = "absolute";
        item.style.top = i * this.itemHeight + "px";
        fragment.appendChild(item);
    }

    node.innerHTML = "";
    node.appendChild(fragment);
};

VirtualList.createContainer = function (w, h) {
    var c = document.createElement("div");
    c.style.width = w;
    c.style.height = h;
    c.style.overflow = "auto";
    c.style.position = "relative";
    c.style.padding = 0;
    c.style.border = "1px solid black";
    return c;
};

VirtualList.createScroller = function (h) {
    var scroller = document.createElement("div");
    scroller.style.opacity = 0;
    scroller.style.position = "absolute";
    scroller.style.top = 0;
    scroller.style.left = 0;
    scroller.style.width = "1px";
    scroller.style.height = h + "px";
    return scroller;
};

var list = new VirtualList({
    w: 300,
    h: 300,
    itemHeight: 31,
    totalRows: 1000000,
    generatorFn: function (row) {
        var el = document.createElement("div");
        el.innerHTML = "I am row number " + row;
        el.style.backgroundColor = "red";
        el.style.background =
            "linear-gradient(to bottom, #fefefd 0%,#dce3c4 42%,#aebf76 100%)";
        el.style.textAlign = "center";
        el.style.width = "300px";
        return el;
    }
});

list.container.style.marginLeft = "auto";
list.container.style.marginRight = "auto";

// document.getElementById("placeholder").appendChild(list.container);

function newRow(i) {
    return {
        id: i,
        size: `${i}mb`,
        file: isEven(i) ? 'C:\\User\\BrainBell' : 'Hooks are a new addition in React that lets you use state and other React features without writing a class. This website provides easy to understand code examples to help you learn how hooks work and inspire you to take advantage of them in your next project.'
    }
}

function isEven(n) {
    return n % 2 === 0;
}



function range(len) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }

    return arr;
}

function makeData(len) {
    return range(len)
        .map((d, i) => {
            return newRow(i)
        })
}

const cells = [
    {label: "id", name: "id"},
    {label: "size", name: "size"},
    {label: "file", name: "file"}
];

const result = makeData(41);

function renderRow(row, cells) {
    return cells.map((cell) => {
        return (
            <td>{row[cell.name]}</td>
        )
    })
}

function Tbody(props) {
    const {
        result = [],
        cells = {}
    } = props;


    return (
        result.map((row) => {
            return (
                <tr>{renderRow(row, cells)}</tr>
            )

        })
    )
}

function getChunks(result, num) {
    const len = result.length;  // 20
    const numberOfChunk = Math.floor(len / num); // 4  num = 5
    console.log(numberOfChunk);

    const chunks = {};
    let lastUpdateResult = {};
    for(let i = 0; i < numberOfChunk; i++) {
        const updateResult = result.slice(num * i, len);
        chunks[i] = updateResult.slice(0, num);
    }
    console.log(lastUpdateResult)
    return {...chunks, ...{[numberOfChunk + 1]: result.slice(num * numberOfChunk, len)}}
}

const ch = getChunks(result, 10);

console.log(ch)


export function VirtualTable(props) {
    const divRef = useRef(null);
    const tbodyRef = useRef(null);
    const [heightTbody, setHeightTbody] = useState(2);
    const [heightScroll, setHeightScroll] = useState(10);
    const [res, setRes] = useState([]);
    useEffect(() => {
        setRes(ch[0])
    }, []);


    return (
        <div
            className="scroll-box"
            ref={divRef}
            onScroll={e => {
                // console.log({heightScroll, heightTbody})
                const top = e.target.scrollTop;
                setHeightTbody(tbodyRef.current.clientHeight);
                setHeightScroll(divRef.current.clientHeight);
                console.log({top, heightScroll})
                if(top >= heightScroll / 2.5) {
                    setRes([...ch[0], ...ch[1]])
                }
            }}
        >
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Size</th>
                    <th>File</th>
                </tr>
                </thead>
                <tbody
                    ref={tbodyRef}
                >
                <Tbody
                    result={res}
                    cells={cells}
                />
                </tbody>
            </table>
        </div>
    )
}