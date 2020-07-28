import React, {useState, useEffect} from 'react';

import {useDebounce} from "../../../hooks/use-debounce";

const TIF = {}
TIF._binBE =
    {
        nextZero: function (data, o) {
            while (data[o] !== 0) o++;
            return o;
        },
        readUshort: function (buff, p) {
            return (buff[p] << 8) | buff[p + 1];
        },
        readShort: function (buff, p) {
            var a = TIF._binBE.ui8;
            a[0] = buff[p + 1];
            a[1] = buff[p + 0];
            return TIF._binBE.i16[0];
        },
        readInt: function (buff, p) {
            var a = TIF._binBE.ui8;
            a[0] = buff[p + 3];
            a[1] = buff[p + 2];
            a[2] = buff[p + 1];
            a[3] = buff[p + 0];
            return TIF._binBE.i32[0];
        },
        readUint: function (buff, p) {
            var a = TIF._binBE.ui8;
            a[0] = buff[p + 3];
            a[1] = buff[p + 2];
            a[2] = buff[p + 1];
            a[3] = buff[p + 0];
            return TIF._binBE.ui32[0];
        },
        readASCII: function (buff, p, l) {
            var s = "";
            for (var i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);
            return s;
        },
        readFloat: function (buff, p) {
            var a = TIF._binBE.ui8;
            for (var i = 0; i < 4; i++) a[i] = buff[p + 3 - i];
            return TIF._binBE.fl32[0];
        },
        readDouble: function (buff, p) {
            var a = TIF._binBE.ui8;
            for (var i = 0; i < 8; i++) a[i] = buff[p + 7 - i];
            return TIF._binBE.fl64[0];
        },

        writeUshort: function (buff, p, n) {
            buff[p] = (n >> 8) & 255;
            buff[p + 1] = n & 255;
        },
        writeUint: function (buff, p, n) {
            buff[p] = (n >> 24) & 255;
            buff[p + 1] = (n >> 16) & 255;
            buff[p + 2] = (n >> 8) & 255;
            buff[p + 3] = (n >> 0) & 255;
        },
        writeASCII: function (buff, p, s) {
            for (var i = 0; i < s.length; i++) buff[p + i] = s.charCodeAt(i);
        },
        writeDouble: function (buff, p, n) {
            TIF._binBE.fl64[0] = n;
            for (var i = 0; i < 8; i++) buff[p + i] = TIF._binBE.ui8[7 - i];
        }
    }

TIF._binBE.ui8 = new Uint8Array(8);
TIF._binBE.i16 = new Int16Array(TIF._binBE.ui8.buffer);
TIF._binBE.i32 = new Int32Array(TIF._binBE.ui8.buffer);
TIF._binBE.ui32 = new Uint32Array(TIF._binBE.ui8.buffer);
TIF._binBE.fl32 = new Float32Array(TIF._binBE.ui8.buffer);
TIF._binBE.fl64 = new Float64Array(TIF._binBE.ui8.buffer);

TIF._binLE =
    {
        nextZero: TIF._binBE.nextZero,
        readUshort: function (buff, p) {
            return (buff[p + 1] << 8) | buff[p];
        },
        readShort: function (buff, p) {
            var a = TIF._binBE.ui8;
            a[0] = buff[p + 0];
            a[1] = buff[p + 1];
            return TIF._binBE.i16[0];
        },
        readInt: function (buff, p) {
            var a = TIF._binBE.ui8;
            a[0] = buff[p + 0];
            a[1] = buff[p + 1];
            a[2] = buff[p + 2];
            a[3] = buff[p + 3];
            return TIF._binBE.i32[0];
        },
        readUint: function (buff, p) {
            var a = TIF._binBE.ui8;
            a[0] = buff[p + 0];
            a[1] = buff[p + 1];
            a[2] = buff[p + 2];
            a[3] = buff[p + 3];
            return TIF._binBE.ui32[0];
        },
        readASCII: TIF._binBE.readASCII,
        readFloat: function (buff, p) {
            var a = TIF._binBE.ui8;
            for (var i = 0; i < 4; i++) a[i] = buff[p + i];
            return TIF._binBE.fl32[0];
        },
        readDouble: function (buff, p) {
            var a = TIF._binBE.ui8;
            for (var i = 0; i < 8; i++) a[i] = buff[p + i];
            return TIF._binBE.fl64[0];
        }
    }

TIF.decode = function (buff) {
    // TIF.decode._decodeG3.allow2D = null;
    var data = new Uint8Array(buff), offset = 0;

    var id = TIF._binBE.readASCII(data, offset, 2);
    offset += 2;
    var bin = id === "II" ? TIF._binLE : TIF._binBE;
    var num = bin.readUshort(data, offset);
    offset += 2;

    var ifdo = bin.readUint(data, offset);
    offset += 4;
    var ifds = [];

    while (true) {
        var noff = TIF._readIFD(bin, data, ifdo, ifds, 0, false);
        ifdo = bin.readUint(data, noff);
        if (ifdo === 0) break;
    }
    return ifds;
}

TIF._readIFD = function (bin, data, offset, ifds, depth, debug) {
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    var ifd = {};
    ifds.push(ifd);

    if (debug) console.log("   ".repeat(depth), ifds.length - 1, ">>>----------------");
    for (var i = 0; i < cnt; i++) {
        var tag = bin.readUshort(data, offset);
        offset += 2;
        var type = bin.readUshort(data, offset);
        offset += 2;
        var num = bin.readUint(data, offset);
        offset += 4;
        var voff = bin.readUint(data, offset);
        offset += 4;

        var arr = [];
        //ifd["t"+tag+"-"+TIF.tags[tag]] = arr;
        if (type === 1 || type === 7) {
            arr = new Uint8Array(data.buffer, (num < 5 ? offset - 4 : voff), num);
        }
        if (type === 2) {
            var o0 = (num < 5 ? offset - 4 : voff), c = data[o0];
            if (c < 128) arr.push(bin.readASCII(data, o0, num - 1));
            else arr = new Uint8Array(data.buffer, o0, num - 1);
        }
        if (type === 3) {
            for (var j = 0; j < num; j++) arr.push(bin.readUshort(data, (num < 3 ? offset - 4 : voff) + 2 * j));
        }
        if (type === 4) {
            for (var j = 0; j < num; j++) arr.push(bin.readUint(data, (num < 2 ? offset - 4 : voff) + 4 * j));
        }
        if (type === 5) {
            for (var j = 0; j < num; j++) arr.push(bin.readUint(data, voff + j * 8) / bin.readUint(data, voff + j * 8 + 4));
        }
        if (type === 8) {
            for (var j = 0; j < num; j++) arr.push(bin.readShort(data, (num < 3 ? offset - 4 : voff) + 2 * j));
        }
        if (type === 9) {
            for (var j = 0; j < num; j++) arr.push(bin.readInt(data, (num < 2 ? offset - 4 : voff) + 4 * j));
        }
        if (type === 10) {
            for (var j = 0; j < num; j++) arr.push(bin.readInt(data, voff + j * 8) / bin.readInt(data, voff + j * 8 + 4));
        }
        if (type === 11) {
            for (var j = 0; j < num; j++) arr.push(bin.readFloat(data, voff + j * 4));
        }
        if (type === 12) {
            for (var j = 0; j < num; j++) arr.push(bin.readDouble(data, voff + j * 8));
        }

        ifd["t" + tag] = arr;

        if (num !== 0 && arr.length === 0) {
            console.log("unknown TIFF tag type: ", type, "num:", num);
        }
        if (debug) console.log("   ".repeat(depth), tag, type, TIF.tags[tag], arr);

        if (tag === 330 && ifd["t272"] && ifd["t272"][0] === "DSLR-A100") {
        }
        // ifd["t258"]=[12];  ifd["t259"]=[32767];  ifd["t273"]=[offset+arr[0]];  ifd["t277"]=[1];  ifd["t279"]=[1];  ifd["t33421"]=[2,2];  ifd["t33422"]=[0,1,1,2];
        else if (tag === 330 || tag === 34665 || (tag === 50740 && bin.readUshort(data, bin.readUint(arr, 0)) < 300)) {
            var oarr = tag === 50740 ? [bin.readUint(arr, 0)] : arr;
            var subfd = [];
            for (var j = 0; j < oarr.length; j++) TIF._readIFD(bin, data, oarr[j], subfd, depth + 1, debug);
            if (tag === 330) ifd.subIFD = subfd;
            if (tag === 34665) ifd.exifIFD = subfd[0];
            if (tag === 50740) ifd.dngPrvt = subfd[0];
        }
        if (tag === 37500) {
            var mn = arr;
            //console.log(bin.readASCII(mn,0,mn.length), mn);
            if (bin.readASCII(mn, 0, 5) === "Nikon") ifd.makerNote = TIF["decode"](mn.slice(10).buffer)[0];
            else if (bin.readUshort(data, voff) < 300) {
                var subsub = [];
                TIF._readIFD(bin, data, voff, subsub, depth + 1, debug);
                ifd.makerNote = subsub[0];
            }
        }
    }
    if (debug) console.log("   ".repeat(depth), "<<<---------------");
    return offset;
}

TIF.decodeImage = function (buff, img, ifds) {
    var data = new Uint8Array(buff);
    var id = TIF._binBE.readASCII(data, 0, 2);

    if (img["t256"] === null) return;	// No width => probably not an image
    img.isLE = id === "II";
    img.width = img["t256"][0];  //delete img["t256"];
    img.height = img["t257"][0];  //delete img["t257"];

    var cmpr = img["t259"] ? img["t259"][0] : 1;  //delete img["t259"];
    var fo = img["t266"] ? img["t266"][0] : 1;  //delete img["t266"];
    if (img["t284"] && img["t284"][0] === 2) console.log("PlanarConfiguration 2 should not be used!");

    var bipp;  // bits per pixel
    if (img["t258"]) bipp = Math.min(32, img["t258"][0]) * img["t258"].length;
    else bipp = (img["t277"] ? img["t277"][0] : 1);
    // Some .NEF files have t258===14, even though they use 16 bits per pixel
    if (cmpr === 1 && img["t279"] !== null && img["t278"] && img["t262"][0] === 32803) {
        bipp = Math.round((img["t279"][0] * 8) / (img.width * img["t278"][0]));
    }
    var bipl = Math.ceil(img.width * bipp / 8) * 8;
    var soff = img["t273"];
    if (soff === null) soff = img["t324"];
    var bcnt = img["t279"];
    if (cmpr === 1 && soff.length === 1) bcnt = [img.height * (bipl >>> 3)];
    if (bcnt === null) bcnt = img["t325"];
    var bytes = new Uint8Array(img.height * (bipl >>> 3)), bilen = 0;

    if (img["t322"] != null) // tiled
    {
        var tw = img["t322"][0], th = img["t323"][0];
        var tx = Math.floor((img.width + tw - 1) / tw);
        var ty = Math.floor((img.height + th - 1) / th);
        var tbuff = new Uint8Array(Math.ceil(tw * th * bipp / 8) | 0);
        for (var y = 0; y < ty; y++)
            for (var x = 0; x < tx; x++) {
                var i = y * tx + x;
                for (var j = 0; j < tbuff.length; j++) tbuff[j] = 0;
                TIF.decode._decompress(img, ifds, data, soff[i], bcnt[i], cmpr, tbuff, 0, fo);
                // Might be required for 7 too. Need to check
                if (cmpr === 6) bytes = tbuff;
                else TIF._copyTile(tbuff, Math.ceil(tw * bipp / 8) | 0, th, bytes, Math.ceil(img.width * bipp / 8) | 0, img.height, Math.ceil(x * tw * bipp / 8) | 0, y * th);
            }
        bilen = bytes.length * 8;
    } else	// stripped
    {
        var rps = img["t278"] ? img["t278"][0] : img.height;
        rps = Math.min(rps, img.height);
        for (var i = 0; i < soff.length; i++) {
            TIF.decode._decompress(img, ifds, data, soff[i], bcnt[i], cmpr, bytes, Math.ceil(bilen / 8) | 0, fo);
            bilen += bipl * rps;
        }
        bilen = Math.min(bilen, bytes.length * 8);
    }
    img.data = new Uint8Array(bytes.buffer, 0, Math.ceil(bilen / 8) | 0);
}

TIF.decode._decompress = function (img, ifds, data, off, len, cmpr, tgt, toff, fo)  // fill order
{
    if (cmpr === 1 || (len === tgt.length && cmpr !== 32767)) for (var j = 0; j < len; j++) tgt[toff + j] = data[off + j];
    else if (cmpr === 3) TIF.decode._decodeG3(data, off, len, tgt, toff, img.width, fo);
    else if (cmpr === 4) TIF.decode._decodeG4(data, off, len, tgt, toff, img.width, fo);
    else if (cmpr === 5) TIF.decode._decodeLZW(data, off, tgt, toff);
    else if (cmpr === 6) TIF.decode._decodeOldJPEG(img, data, off, len, tgt, toff);
    else if (cmpr === 7) TIF.decode._decodeNewJPEG(img, data, off, len, tgt, toff);
    else if (cmpr === 32767) TIF.decode._decodeARW(img, data, off, len, tgt, toff);
    else if (cmpr === 32773) TIF.decode._decodePackBits(data, off, len, tgt, toff);
    else if (cmpr === 32809) TIF.decode._decodeThunder(data, off, len, tgt, toff);
    else if (cmpr === 34713) //for(var j=0; j<len; j++) tgt[toff+j] = data[off+j];
        TIF.decode._decodeNikon(img, ifds, data, off, len, tgt, toff);
    else console.log("Unknown compression", cmpr);

    var bps = (img["t258"] ? Math.min(32, img["t258"][0]) : 1);
    var noc = (img["t277"] ? img["t277"][0] : 1), bpp = (bps * noc) >>> 3,
        h = (img["t278"] ? img["t278"][0] : img.height), bpl = Math.ceil(bps * noc * img.width / 8);

    // convert to Little Endian  /*
    if (bps === 16 && !img.isLE && img["t33422"] === null)  // not DNG
        for (var y = 0; y < h; y++) {
            //console.log("fixing endianity");
            var roff = toff + y * bpl;
            for (var x = 1; x < bpl; x += 2) {
                var t = tgt[roff + x];
                tgt[roff + x] = tgt[roff + x - 1];
                tgt[roff + x - 1] = t;
            }
        }  //*/

    if (img["t317"] && img["t317"][0] === 2) {
        for (var y = 0; y < h; y++) {
            var ntoff = toff + y * bpl;
            if (bps === 16) for (var j = bpp; j < bpl; j += 2) {
                var nv = ((tgt[ntoff + j + 1] << 8) | tgt[ntoff + j]) + ((tgt[ntoff + j - bpp + 1] << 8) | tgt[ntoff + j - bpp]);
                tgt[ntoff + j] = nv & 255;
                tgt[ntoff + j + 1] = (nv >>> 8) & 255;
            }
            else if (noc === 3) for (var j = 3; j < bpl; j += 3) {
                tgt[ntoff + j] = (tgt[ntoff + j] + tgt[ntoff + j - 3]) & 255;
                tgt[ntoff + j + 1] = (tgt[ntoff + j + 1] + tgt[ntoff + j - 2]) & 255;
                tgt[ntoff + j + 2] = (tgt[ntoff + j + 2] + tgt[ntoff + j - 1]) & 255;
            }
            else for (var j = bpp; j < bpl; j++) tgt[ntoff + j] = (tgt[ntoff + j] + tgt[ntoff + j - bpp]) & 255;
        }
    }
}

const blob2ArrayBuffer = blob =>
    new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("loadend", () => resolve(reader.result));
        reader.readAsArrayBuffer(blob);
    })

const tiffArrayBufferToImageData = buffer => {
    const ifds = TIF.decode(buffer);

    const timage = ifds[0];
    const array = new Uint8ClampedArray(TIF.toRGBA8(timage));
    return new ImageData(array, timage.width, timage.height);
}

const getTiffImageData = async image => blob2ArrayBuffer(image).then(tiffArrayBufferToImageData)


const image2canvas = (imageData) => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
}


export function UseDebouncePage(props) {
    const [text, setText] = useState('Hello!');
    const [src, setSrc] = useState('')
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const debouncedText = useDebounce(text, 1000);

    function onchange(e) {
        const file = e.target.files[0]
        var reader = new FileReader();

        reader.addEventListener("loadend", (e) => {
            imgLoaded(e)
        });
        reader.readAsArrayBuffer(file);
    }

    function imgLoaded(e) {
        var ifds = TIF.decode(e.target.result);
        TIF.decodeImage(e.target.result, ifds[0])
        
        const timage = ifds[0];
        console.log({ifds: ifds, timage: timage['t34675']})
        // const data = decode(e.target.result);
        const array = new Uint8ClampedArray(timage.data);
        const dataIm = new ImageData(array, timage.width, timage.height);
        setWidth(timage.width);
        setHeight(timage.height)
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.putImageData(dataIm, 0, 0);
        const url = canvas.toDataURL("image/png");


        setSrc(url)
    }

    return (
        <div>
            <input
                type="text"
                defaultValue="Hello!"
                onChange={e => setText(e.target.value)}
            />
            <p>Actual value {text}</p>
            <p>Debounced value {debouncedText}</p>
            <input type="file" onChange={onchange}/>
            <canvas style={{display: 'none'}} id="canvas" width={width} height={height}/>
            <div style={{width: 600, height: 400}}>
                <img src={src} alt=""/>
            </div>
        </div>
    )
}