const player = document.getElementById('radioPlayer');
const uploadInput = document.getElementById('upload');
const canvasWave = document.getElementById('waveform');
const ctxWave = canvasWave.getContext('2d');
const canvasWaterfall = document.getElementById('waterfall');
const ctxWaterfall = canvasWaterfall.getContext('2d');

// Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = null;
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 1024;
const bufferLength = analyser.frequencyBinCount;
const dataArrayFreq = new Uint8Array(bufferLength);
const dataArrayTime = new Uint8Array(bufferLength);

// Upload audio lokal
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if(file) {
        const url = URL.createObjectURL(file);
        player.src = url;
        player.loop = true; // putar berulang

        // Hubungkan Web Audio API
        if(source) source.disconnect();
        source = audioCtx.createMediaElementSource(player);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
    }
});

function playAudio() {
    audioCtx.resume().then(() => player.play());
}
function pauseAudio() {
    player.pause();
}

// Draw waveform
function drawWaveform() {
    requestAnimationFrame(drawWaveform);
    if(!source) return;

    analyser.getByteTimeDomainData(dataArrayTime);

    ctxWave.fillStyle = "#000";
    ctxWave.fillRect(0, 0, canvasWave.width, canvasWave.height);

    ctxWave.lineWidth = 2;
    ctxWave.strokeStyle = "#0f0";
    ctxWave.beginPath();
    const sliceWidth = canvasWave.width / bufferLength;
    let x = 0;
    for(let i = 0; i < bufferLength; i++){
        const v = dataArrayTime[i] / 128.0;
        const y = v * canvasWave.height / 2;
        if(i === 0) ctxWave.moveTo(x, y);
        else ctxWave.lineTo(x, y);
        x += sliceWidth;
    }
    ctxWave.lineTo(canvasWave.width, canvasWave.height/2);
    ctxWave.stroke();
}

//WebSDR HTML5 client side - Copyright 2013-2020, pa3fwm@websdr.org - all rights reserved
//Since the intended use of this code involves sending a copy to the client computer, I (PA3FWM) hereby allow making it available unmodified, via my original WebSDR server software, to original WebSDR clients. Other use, including distribution in part or entirety or as part of other software, or reverse engineering, is not allowed without my explicit prior permission.
(function() {
    var u = !0
      , v = null
      , x = !1
      , y = 0
      , C = 0
      , E = 1;
    if (!window.requestAnimationFrame)
        for (var O; ; ) {
            if (O = window.mozRequestAnimationFrame) {
                window.requestAnimationFrame = O;
                break
            }
            if (O = window.webkitRequestAnimationFrame) {
                window.requestAnimationFrame = O;
                break
            }
            E = 0;
            break
        }
    function ia() {
        function P(b) {
            var a = b.layerX || b.offsetX
              , c = b.wheelDelta || -b.detail;
            0 < c ? T(-2, a) : 0 > c && T(-1, a);
            return cancelEvent(b)
        }
        var c = waterfallapplet[i];
        function U(b, g) {
            var e = g;
            0 > e && (e = a.b);
            var h = a.width << a.maxzoom - e;
            a.strictbandlimits ? (0 > b && (b = 0),
            h = (1024 << a.maxzoom) - h) : (b < -h / 2 && (b = -h / 2),
            h = (1024 << a.maxzoom) - h / 2);
            b > h && (b = h);
            b &= -1 << a.maxzoom - e;
            E ? (a.r = b,
            a.s = g,
            c.t = 1) : (e = a.c,
            h = a.b,
            a.c = b,
            0 <= g ? (a.e("GET /~~waterparam?start=" + b + "&zoom=" + g),
            A = v,
            a.b = g) : a.D(b),
            Q(e, a.c, h, x),
            zoomchange(a.o, a.b, a.c))
        }
        function V(b) {
            U(dragorigval - (b - dragorigX << a.maxzoom - a.b), -1)
        }
        function ja(b) {
            var a = getMouseXY(b);
            V(a.x);
            return cancelEvent(b)
        }
        function Z(b) {
            b.preventDefault();
            a.m = u;
            a.l = 10
        }
        function $(b) {
            b.preventDefault();
            setTimeout(ka, 300)
        }
        function ka() {
            a.m = x
        }
        function aa(b) {
            b.preventDefault();
            var c = 0;
            b = Math.floor(10 * b.scale);
            b > a.l + 1 && (c = -1);
            b < a.l - 1 && (c = 1);
            0 != c && (F(c, (a.q + a.z) / 2),
            a.l = b)
        }
        function ba(b) {
            clearTimeout(W);
            b.preventDefault();
            1 == b.targetTouches.length && (a.F = dragorigX,
            dragorigX = b.targetTouches[0].pageX,
            a.m == x && (dragging = u,
            dragorigval = a.c,
            a.v = a.i,
            a.i = (new Date).getTime(),
            clearTimeout(a.C)));
            B = R = (new Date).getTime();
            H = X = dragorigX
        }
        function ca(b) {
            b.preventDefault();
            b = b.touches[0];
            var c = (new Date).getTime();
            c >= B + 100 ? (R = B,
            B = c,
            X = H,
            H = b.pageX) : B < R + 100 && (B = c,
            H = b.pageX);
            a.z = a.q;
            a.q = b.pageX;
            a.m == x && (V(b.pageX),
            a.v = 0,
            a.i = 0)
        }
        function la() {
            F(1, dragorigX)
        }
        function da(b) {
            b.preventDefault();
            dragging = x;
            var c = a.i - a.v;
            if (c)
                c && 300 > c ? F(-1, dragorigX) : a.i && 300 > (new Date).getTime() - a.i && (a.C = setTimeout(la, 300));
            else if (c = H - X,
            B > (new Date).getTime() - 100 && 3 < Math.abs(c)) {
                var e = B - R;
                S = b.changedTouches[0].pageX;
                t = 100 * (c / e);
                W = setTimeout(ea, 100)
            }
        }
        function ea() {
            S += t;
            V(S);
            var b = 1;
            0 > t && (b = -1);
            t *= b;
            t -= 10;
            0 <= t && (t *= b,
            W = setTimeout(ea, 100))
        }
        function fa() {
            if (c.t) {
                c.t = 0;
                var b = a.c
                  , g = a.b;
                a.c = a.r;
                0 <= a.s ? (a.e("GET /~~waterparam?start=" + a.r + "&zoom=" + a.s),
                A = v,
                a.b = a.s) : a.D(a.r);
                Q(b, a.c, g, x);
                zoomchange(a.o, a.b, a.c)
            }
            c.u && (b = e.p,
            c.u = 0,
            e.a.drawImage(e, 0, 1, e.width, e.height - 1, 0, 0, e.width, e.height - 1),
            e.a.putImageData(b, 0, e.height - 1),
            (a.h != a.b || a.g != a.c) && Q(a.g, a.c, a.h, u));
            requestAnimationFrame(fa)
        }
        function Q(b, g, l, h) {
            var d = c.width
              , j = 0
              , f = e.height - j;
            if (h)
                if (C) {
                    if (j = s - 1,
                    f = 1,
                    0 > j)
                        return
                } else
                    j = e.height - 1,
                    f = 1;
            if (l == a.b)
                try {
                    if (g < b) {
                        var m = b - g >> a.maxzoom - a.b;
                        e.a.drawImage(e, 0, j, d - m, f, m, j, d - m, f);
                        e.a.fillStyle = "#000000";
                        e.a.fillRect(0, j, m, f);
                        h || (k.a.drawImage(k, 0, j, d - m, f, m, j, d - m, f),
                        k.a.fillStyle = "#000000",
                        k.a.fillRect(0, j, m, f))
                    } else if (g > b) {
                        var n = g - b >> a.maxzoom - a.b;
                        e.a.drawImage(e, n, j, d - n, f, 0, j, d - n, f);
                        e.a.fillStyle = "#000000";
                        e.a.fillRect(d - n, j, n, f);
                        h || (k.a.drawImage(k, n, j, d - n, f, 0, j, d - n, f),
                        k.a.fillStyle = "#000000",
                        k.a.fillRect(d - n, j, n, f))
                    }
                } catch (r) {}
            else if (a.n = u,
            l > a.b)
                n = 1 << l - a.b,
                m = 0.5 + 1024 * (-g + b) / (1024 << a.maxzoom - a.b),
                e.a.drawImage(e, 0, j, d, f, m, j, d / n, f),
                e.a.fillStyle = "#000000",
                e.a.fillRect(0, j, m, f),
                e.a.fillRect(m + d / n, j, d, f),
                !h && C && (k.a.drawImage(k, 0, j, 1024, f, m, j, 1024 / n, f),
                k.a.fillStyle = "#000000",
                k.a.fillRect(0, j, m, f),
                k.a.fillRect(m + d / n, j, d, f));
            else {
                n = 1 << a.b - l;
                m = 0.5 + (g - b >> a.maxzoom - l);
                try {
                    e.a.drawImage(e, m, j, d / n, f, 0, j, d, f),
                    !h && C && k.a.drawImage(k, m, j, d / n, f, 0, j, d, f)
                } catch (p) {
                    e.a.fillStyle = "#000000",
                    e.a.fillRect(0, j, d, f),
                    !h && C && k.a.fillRect(0, j, d, f)
                }
            }
        }
        function F(b, c) {
            if (0 != a.maxzoom) {
                var e = a.c + (c << a.maxzoom - a.b)
                  , d = a.b - b;
                0 > d && (d = 0);
                d > a.maxzoom && (d = a.maxzoom);
                U(e - (c << a.maxzoom - d), d)
            }
        }
        function T(b, c) {
            if (-1 == b)
                F(1, c);
            else if (-2 == b)
                F(-1, c);
            else {
                var a = b;
                0 > a && (a = 0);
                a > this.maxzoom && (a = this.maxzoom);
                U(c, a)
            }
        }
        c.width || (c.width = 1024);
        c.height && (c.height = c.height);
        c.height || (c.height = window.G || 100);
        document.getElementById(c.div).innerHTML = '<div id="wfcdiv' + y + '" style="height:' + c.height + 'px;overflow:hidden;position:relative;"><canvas class="html5waterfall" id="wf1canvas' + y + '" width="' + c.width + '" height="' + c.height + '" style="position:absolute">test</canvas><canvas class="html5waterfall" id="wf2canvas' + y + '" width="' + c.width + '" height="' + c.height + '" style="position:absolute">test</canvas></div>';
        c.f = document.getElementById("wfcdiv" + y);
        var D = 0 <= y ? "on" : "off";
        c.f.o = c.id;
        c.f.band = c.band;
        c.f.width = c.width;
        c.f.height = c.height;
        c.f.maxzoom = c.maxzoom;
        c.f.strictbandlimits = c.strictbandlimits;
        c = c.f;
        c.u = 0;
        c.t = 0;
        c.destroy = function() {
            try {
                c.d.close()
            } catch (b) {}
            c.parentNode.removeChild(c)
        }
        ;
        var I = document.getElementById("wf1canvas" + y)
          , J = document.getElementById("wf2canvas" + y)
          , e = I
          , k = J;
        C || (k.height = 0);
        y++;
        I.a = I.getContext("2d");
        J.a = J.getContext("2d");
        e.a.fillStyle = "#000000";
        e.a.fillRect(0, 0, e.width, e.height);
        I.p = I.a.createImageData(1024, 1);
        J.p = J.a.createImageData(1024, 1);
        var a = c;
        -1 < y && (D += "mes");
        c.mode = 1;
        var K = new Uint8Array(256), L = new Uint8Array(256), M = new Uint8Array(256), d;
        for (d = 0; 64 > d; d++)
            K[d] = 0,
            L[d] = 0,
            M[d] = 2 * d;
        for (; 128 > d; d++)
            K[d] = 3 * d - 192,
            L[d] = 0,
            M[d] = 2 * d;
        for (; 192 > d; d++)
            K[d] = d + 64,
            L[d] = 256 * Math.sqrt((d - 128) / 64),
            M[d] = 511 - 2 * d;
        for (; 256 > d; d++)
            K[d] = 255,
            L[d] = 255,
            M[d] = 2 * d - 256;
        c.b = 0;
        c.c = 0;
        -2 < y && (D += "sa");
        c.h = 0;
        c.g = 0;
        c.j = c.width;
        c.n = u;
        c.B = [];
        c.m = x;
        c.l = 10;
        c.q = 0;
        c.z = 0;
        c.v = 0;
        c.i = 0;
        c.C = 0;
        var N = [];
        for (d = 0; 1024 > d; d++)
            N[d] = 0;
        -3 < y && (D += "ge");
        var w = new Uint8Array(1024);
        for (d = 0; d < a.j; d++)
            w[d] = 8;
        var s = 0;
        onmessage = function(b) {
            b = new Uint8Array(b.data);
            if (255 == b[0]) {
                if (255 != b[1]) {
                    var g = b;
                    b = w;
                    1 == g[1] && (a.g = g[3] + (g[4] << 8) + (g[5] << 16) + (g[6] << 24),
                    128 > g[2] && (a.h = g[2]),
                    g = g.subarray(8));
                    if (2 == g[1]) {
                        a.j = g[2] + (g[3] << 8);
                        for (g = 0; g < a.j; g++)
                            b[g] = 8
                    }
                    return
                }
                b = b.subarray(1)
            }
            for (g = 0; 1 > g; g++) {
                if (0 == a.k) {
                    var l = b
                      , h = w;
                    for (d = 0; d < l.length; d++)
                        h[d] = l[d]
                }
                if (1 == a.k) {
                    l = b;
                    h = w;
                    for (d = 0; d < l.length; d++)
                        z = 16 * (l[d] & 15) + 2,
                        h[2 * d] = z,
                        z = l[d] & 242,
                        h[2 * d + 1] = z
                }
                if (9 == a.k)
                    for (var l = b, h = w, q = 0, j = 0, f = 0, m = 0, n = 0, r = 0; f < c.j; ) {
                        var m = l[j] << 8 + q | l[j + 1] << q
                          , p = 0
                          , t = 1;
                        m & 32768 && (m = 128 * n + ((m & 32512) >> 8),
                        p = ga[m],
                        t = ha[m]);
                        q += t;
                        8 <= q && (q -= 8,
                        j++);
                        if (1 == p || -1 == p)
                            n = 1;
                        if (1 < p || -1 > p)
                            n = 2;
                        0 == p && (n = 0);
                        r += p << 4;
                        p = h[f] + r;
                        0 > p && (p = 8);
                        255 < p && (p = 248);
                        h[f] = p;
                        f++
                    }
                if (10 == a.k) {
                    l = b;
                    h = w;
                    for (r = n = p = f = j = q = 0; f < c.j; ) {
                        p = l[j] << 8 + q | l[j + 1] << q;
                        r = 0;
                        m = 1;
                        p & 32768 && (p = 128 * n + ((p & 32512) >> 8),
                        r = ga[p],
                        m = ha[p]);
                        q += m;
                        8 <= q && (q -= 8,
                        j++);
                        if (1 == r || -1 == r)
                            n = 1;
                        if (1 < r || -1 > r)
                            n = 2;
                        0 == r && (n = 0);
                        r <<= 4;
                        p = h[f] + r;
                        if (16 == r || -16 == r)
                            p = h[f] + (r >> N[f]);
                        0 > p && (p = 0);
                        255 < p && (p = 255);
                        h[f] = p;
                        0 == r ? 4 > N[f] && N[f]++ : N[f] = 0;
                        f++
                    }
                }
            }
            g = e.p;
            if (0 != a.mode) {
                for (b = 0; 1024 > b; b++)
                    l = w[b],
                    g.data[4 * b] = K[l],
                    g.data[4 * b + 1] = L[l],
                    g.data[4 * b + 2] = M[l],
                    g.data[4 * b + 3] = 255;
                C ? (e.a.putImageData(g, 0, s),
                e.style.top = e.height - s + "px",
                k.style.top = -s + "px",
                s++,
                s >= e.height && (s = 0,
                b = k,
                k = e,
                e = b)) : E ? c.u = 1 : (e.a.drawImage(e, 0, 1, e.width, e.height - 1, 0, 0, e.width, e.height - 1),
                e.a.putImageData(g, 0, e.height - 1));
                !E && (a.h != a.b || a.g != a.c) && Q(a.g, a.c, a.h, u)
            } else {
                e.a.fillStyle = "#000000";
                e.a.fillRect(0, 0, e.width, e.height);
                e.a.fillStyle = "#00ffff";
                if (a.n) {
                    for (b = 0; 1024 > b; b++)
                        a.B[b] = w[b];
                    a.n = x
                }
                for (b = 0; b < c.width; b++)
                    l = w[b],
                    a.B[b] = l,
                    l *= e.height / 255,
                    e.a.fillRect(b, e.height - l, 1, l)
            }
        }
        ;
        e.addEventListener("mousewheel", P);
        e.addEventListener("DOMMouseScroll", P);
        k.addEventListener("mousewheel", P);
        k.addEventListener("DOMMouseScroll", P);
        c.onmousedown = function(b) {
            var c = getMouseXY(b);
            dragging = u;
            document.onmousemove = ja;
            dragorigX = c.x;
            dragorigval = this.c;
            return cancelEvent(b)
        }
        ;
        var R, B, X, H, t = 0, S = 0, W;
        E && requestAnimationFrame(fa);
        window.isTouchDev && (e.addEventListener("gesturestart", Z),
        e.addEventListener("gesturechange", aa),
        e.addEventListener("gestureend", $),
        k.addEventListener("gesturestart", Z),
        k.addEventListener("gesturechange", aa),
        k.addEventListener("gestureend", $),
        e.addEventListener("touchstart", ba),
        e.addEventListener("touchmove", ca),
        e.addEventListener("touchend", da),
        k.addEventListener("touchstart", ba),
        k.addEventListener("touchmove", ca),
        k.addEventListener("touchend", da));
        c.setSize = function(b, a) {
            var d = document.createElement("canvas")
              , h = Math.min(e.height, a)
              , q = Math.min(e.width, b);
            d.width = q;
            d.height = h;
            C ? (d.height = h,
            0 < s && d.getContext("2d").drawImage(e, 0, 0, q, s, 0, h - s, q, s),
            0 < h - s && d.getContext("2d").drawImage(k, 0, k.height - (h - s), q, h - s, 0, 0, q, h - s),
            e.height = a,
            e.width = b,
            k.height = a,
            k.width = b,
            this.style.height = a + "px",
            k.a.drawImage(d, 0, a - d.height),
            s = 0) : (d.height = h,
            d.getContext("2d").drawImage(e, 0, e.height - h, q, h, 0, 0, q, h),
            e.height = a,
            e.width = b,
            e.a.drawImage(d, 0, a - d.height));
            this.style.height = a + "px";
            this.style.width = b + "px";
            c.width = b;
            this.e("GET /~~waterparam?width=" + b)
        }
        ;
        c.setheight = function() {}
        ;
        c.setzoom = T;
        c.A = 4;
        c.setslow = function(b) {
            c.A = b;
            this.e("GET /~~waterparam?slow=" + b)
        }
        ;
        c.setmode = function(b) {
            if ((2 <= this.mode || 2 <= b) && this.mode != b) {
                var a = b;
                0 == a && (a = 1);
                this.e("GET /~~waterparam?scale=" + a)
            }
            0 == b && 0 != this.mode && (s = e.height - 1,
            k.style.top = e.height + "px",
            e.style.top = "0px",
            smoothbinvalid = u);
            this.mode = b
        }
        ;
        c.setdmin = function(b) {
            this.e("GET /~~waterparam?dmin=" + b)
        }
        ;
        c.setdmax = function(b) {
            this.e("GET /~~waterparam?dmax=" + b)
        }
        ;
        c.setdminmax = function(b, a) {
            this.e("GET /~~waterparam?dmin=" + b + "&dmax=" + a)
        }
        ;
        c.setband = function(b, a, c, d) {
            this.h = this.b = c;
            this.g = this.c = d;
            this.maxzoom = a;
            this.e("GET /~~waterparam?band=" + b + "&zoom=" + this.b + "&start=" + this.c);
            A = v
        }
        ;
        var ma = c.width;
        c.k = 10;
        c.d = v;
        c.w = 1;
        c.startstop = function(b) {
            if (b && !c.d)
                c.d = new WebSocket("ws://" + window.location.host + "/~~waterstream" + c.band + "?format=" + c.k + "&width=" + ma + "&zoom=" + this.b + "&start=" + this.c),
                c.d.binaryType = "arraybuffer",
                c.d[D] = onmessage,
                c.n = u,
                w = new Uint8Array(1024),
                c.d.onopen = !c.w ? function() {
                    c.e("GET /~~waterparam?zoom=" + c.b + "&start=" + c.c + "&slow=" + c.A);
                    A = v
                }
                : function() {
                    waterfallappletstarted(this.o)
                }
                ,
                c.w = 0;
            else if (!b && c.d) {
                try {
                    c.d.close()
                } catch (a) {}
                c.d = v
            }
        }
        ;
        c.e = function(a) {
            if (this.d)
                try {
                    this.d.send(a)
                } catch (c) {}
        }
        ;
        var Y = v
          , A = v;
        ws2send2_do = function() {
            Y = v;
            A !== v && (a.e("GET /~~waterparam?start=" + A),
            A = v)
        }
        ;
        c.D = function(a) {
            A = a;
            Y || (ws2send2_do(),
            Y = setTimeout("ws2send2_do();", 250))
        }
        ;
        c.startstop(1);
        var ga = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, 5, 5, 7, 7, 9, 11, 13, 15, -5, -5, -7, -7, -9, -11, -13, -15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, 7, 7, 9, 9, 11, 11, 13, 15, -7, -7, -9, -9, -11, -11, -13, -15]
          , ha = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 8, 8, 8, 8, 7, 7, 7, 7, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 8, 8];
        return c
    }
    var nwaterfalls = 1;
    var waterfallapplet = [];

    window.prep_html5waterfalls = function() {
        for (i = 0; i < nwaterfalls; i++)
            waterfallapplet[i] = ia()
    }
    ;
    prep_html5waterfalls();
}
)();