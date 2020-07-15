import React, {useRef, useState, useEffect} from 'react';
import {useCtx, useRect, useCanvasText} from "./hooks";
import {drawImage} from "./helpers";
import animals from "./images/d.png"
import sample from "./images/sample.jpg";
import {isEmpty} from "../../helpers";
import {Button} from "../button";

let perimeter = [];
let complete = false;

let polygons = [];
let id = 0;

export function CanvasPoly(props) {
    const {
        texts = [],
        init = [],
    } = props;
    const canvasRef = useRef(null);
    const canvas = canvasRef.current;
    const {offsetX, offsetY} = useRect({canvas});
    const [preparedText] = useCanvasText({canvasRef, texts, init});
    let [ctx] = useCtx({canvasRef, texts: preparedText});
    const [isDraw, setIsDraw] = useState(false);

    let startX;
    let startY;
    let isDown;
    useEffect(() => {
        start();
    }, [ctx]);


    function line_intersects(p0, p1, p2, p3) {
        let s1_x, s1_y, s2_x, s2_y;
        s1_x = p1['x'] - p0['x'];
        s1_y = p1['y'] - p0['y'];
        s2_x = p3['x'] - p2['x'];
        s2_y = p3['y'] - p2['y'];

        let s, t;
        s = (-s1_y * (p0['x'] - p2['x']) + s1_x * (p0['y'] - p2['y'])) / (-s2_x * s1_y + s1_x * s2_y);
        t = (s2_x * (p0['y'] - p2['y']) - s2_y * (p0['x'] - p2['x'])) / (-s2_x * s1_y + s1_x * s2_y);

        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
        // No collision
    }

    function point(x, y) {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.fillRect(x - 2, y - 2, 6, 6);
        ctx.moveTo(x, y);
    }

    function undo() {
        perimeter.pop();
        complete = false;
        start(true);
    }

    function clearCanvas() {
        perimeter = [];
        polygons = [];
        complete = false;
        //document.getElementById('coordinates').value = '';
        start();
    }

    function draw(end) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawImage({src: sample, ctx, width: canvas.width, height: canvas.height});


        polygons.forEach(item => {
            define(item);
        });

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.lineCap = "round";
        ctx.beginPath();

        for (let i = 0; i < perimeter.length; i++) {
            if (i === 0) {
                ctx.moveTo(perimeter[i]['x'], perimeter[i]['y']);
                end || point(perimeter[i]['x'], perimeter[i]['y']);
            } else {
                ctx.lineTo(perimeter[i]['x'], perimeter[i]['y']);
                end || point(perimeter[i]['x'], perimeter[i]['y']);
            }
        }

        if (end) {
            setIsDraw(false);
            ctx.lineTo(perimeter[0]['x'], perimeter[0]['y']);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fill();
            ctx.strokeStyle = 'blue';
            complete = true;
            polygons.push( {points: perimeter, x: 0, y: 0});
            console.log({polygons});
        }
        ctx.stroke();

        // print coordinates
        // if (perimeter.length === 0) {
        //     document.getElementById('coordinates').value = '';
        // } else {
        //     document.getElementById('coordinates').value = JSON.stringify(perimeter);
        // }
    }

    function check_intersect(x, y) {
        if (perimeter.length < 4) {
            return false;
        }
        const p0 = [];
        const p1 = [];
        const p2 = [];
        const p3 = [];

        p2['x'] = perimeter[perimeter.length - 1]['x'];
        p2['y'] = perimeter[perimeter.length - 1]['y'];
        p3['x'] = x;
        p3['y'] = y;

        for (let i = 0; i < perimeter.length - 1; i++) {
            p0['x'] = perimeter[i]['x'];
            p0['y'] = perimeter[i]['y'];
            p1['x'] = perimeter[i + 1]['x'];
            p1['y'] = perimeter[i + 1]['y'];
            if (p1['x'] === p2['x'] && p1['y'] === p2['y']) {
                continue;
            }
            if (p0['x'] === p3['x'] && p0['y'] === p3['y']) {
                continue;
            }
            if (line_intersects(p0, p1, p2, p3) === true) {
                return true;
            }
        }
        return false;
    }

    function BigCircle(ctx, x, y, color, circleSize) {
        ctx.beginPath();
        ctx.arc(x, y, circleSize, 0, Math.PI * 2, true);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        this.clicked = function () {
            ctx.fillStyle = '#5eb62b';
            ctx.fill();
        }
    }

    function point_it(event) {
        if (!isDraw) return;
        const [firstPoint] = perimeter;
        if (firstPoint) {
            const mouseX = event.clientX - offsetX;
            const mouseY = event.clientY - offsetY;
            if (Math.pow(mouseX - firstPoint.x, 2) + Math.pow(mouseY - firstPoint.y, 2) < Math.pow(4, 2)) {
                draw(true);
            }

        }

        if (complete) {
            complete = false;
            perimeter = [];
            return false;
        }

        let rect, x, y;

        if (event.ctrlKey || event.which === 3 || event.button === 2) {
            if (perimeter.length === 2) {
                alert('You need at least three points for a polygon');
                return false;
            }
            x = perimeter[0]['x'];
            y = perimeter[0]['y'];
            if (check_intersect(x, y)) {
                alert('The line you are drowing intersect another line');
                return false;
            }
            draw(true);
            alert('Polygon closed');
            event.preventDefault();
            return false;
        } else {
            rect = canvas.getBoundingClientRect();
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
            if (perimeter.length > 0 && x === perimeter[perimeter.length - 1]['x'] && y === perimeter[perimeter.length - 1]['y']) {
                // same point - double click
                draw(false);
                return false;
            }
            if (check_intersect(x, y)) {
                alert('The line you are drowing intersect another line');
                return false;
            }
            perimeter.push({'x': x, 'y': y});
            draw(false);
            return false;
        }
    }

    function start(with_draw) {
        const img = new Image();
        img.src = sample;
        img.onload = function () {
            if (!ctx) return;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (with_draw === true) {
                draw(false);
            }
        }
    }

    function mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawImage({src: sample, ctx, width: canvas.width, height: canvas.height});

        polygons.forEach((item, i) => {
            define(item);
            if (ctx.isPointInPath(startX, startY)) {
                isDown = true;
                id = i;
            }
        });


    }

    function mouseUp(e) {
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();

        // Put your mouseup stuff here
        isDown = false;
    }

    function mouseOut(e) {
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();

        // Put your mouseOut stuff here
        isDown = false;
    }

    function mouseMove(e) {
        const [firstPoint] = perimeter;
        if (firstPoint) {
            const mouseX = e.clientX - offsetX;
            const mouseY = e.clientY - offsetY;
            let bigGreen = new BigCircle(ctx, firstPoint.x, firstPoint.y, '#fff', 4);
            if (Math.pow(mouseX - firstPoint.x, 2) + Math.pow(mouseY - firstPoint.y, 2) < Math.pow(4, 2)) {
                bigGreen.clicked();
            }

        }
        if (!isDown) {
            return;
        }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();

        const mouseX = e.clientX - offsetX;
        const mouseY = e.clientY - offsetY;

        // Put your mousemove stuff here
        let dx = mouseX - startX;
        let dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        const poly = polygons[id];
        poly.x += dx;
        poly.y += dy;
        draw();
    }

    function define(poly) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(poly.points[0].x + poly.x, poly.points[0].y + poly.y);
        for (let i = 0; i < poly.points.length; i++) {
            ctx.lineTo(poly.points[i].x + poly.x, poly.points[i].y + poly.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke()
    }

    return (
        <>
        <div className="wrap-polygon-btn">
            <Button
                mdRaised
                events={{onClick: () => setIsDraw(!isDraw)}}
            >
                Draw polygon
            </Button>
            <Button
                mdRaised
                events={{onClick: () => undo()}}
            >
                Undo
            </Button>
            <Button
                mdRaised
                events={{onClick: () => clearCanvas()}}
            >
                Clear
            </Button>
        </div>
        <canvas
            ref={canvasRef}
            width={600}
            height={403}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
            onMouseOut={mouseOut}
            onClick={point_it}
        />
        </>
    )
}