(function (global) {
    function $(e) {
        if (typeof e == 'string') e = document.getElementById(e);
        return e
    };

    function collect(a, f) {
        var n = [];
        for (var i = 0; i < a.length; i++) {
            var v = f(a[i]);
            if (v != null) n.push(v)
        }
        return n
    };

    ajax = {};
    ajax.x = function () {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP')
            } catch (e) {
                return new XMLHttpRequest()
            }
        }
    };
    ajax.serialize = function (f) {
        var g = function (n) {
            return f.getElementsByTagName(n)
        };
        var nv = function (e) {
            if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
            else return ''
        };
        var i = collect(g('input'), function (i) {
            if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i)
        });
        var s = collect(g('select'), nv);
        var t = collect(g('textarea'), nv);
        return i.concat(s).concat(t).join('&');
    };

    ajax.send = function (u, f, m, a, e) {
        var x = ajax.x();
        x.open(m, u, true);
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status < 400) {
                cType = x.getResponseHeader("Content-Type");
                f(x.responseText, cType);
            } else if (x.readyState == 4) {
                if (e == undefined) {
                    console.log(x.status + " (" + x.statusText + ") ");
                } else {
                    e(x.status, x);
                }
            }
        };
        if (m == 'POST')
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.send(a);
    };

    ajax.get = function (url, func, err) {
        ajax.send(url, func, 'GET', {}, err)
    };

    ajax.gets = function (url) {
        var x = ajax.x();
        x.open('GET', url, false);
        x.send(null);
        return x.responseText
    };

    ajax.post = function (url, func, args, err) {
        ajax.send(url, func, 'POST', args, err)
    };

    ajax.update = function (url, elm) {
        var e = $(elm);
        var f = function (r) {
            e.innerHTML = r
        };
        ajax.get(url, f)
    };
    ajax.submit = function (url, elm, frm) {
        var e = $(elm);
        var f = function (r) {
            e.innerHTML = r
        };
        ajax.post(url, f, ajax.serialize(frm))
    };
    global.ajax = ajax;
})(this);
