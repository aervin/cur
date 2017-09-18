var t = ['number']
var usd = function(f, u) {
    if (val(f)) {
        var _f = rnd(f, 2).toString()
        var _u = u
        var n = f < 0
        var d = f.toString().search(/\./)
        var s = f.toString().search(/\./) !== -1
        var lod = /.+?(?=\.)/g
        var rod = /[^.]+$/g
        var ln =
            (s ? _f.match(lod)[0] : _f) ||
            undefined
        ln =
            typeof ln !== `undefined` && n
                ? ln.slice(1)
                : ln
        var rn = s
            ? _f.match(rod)[0]
            : undefined
        rn =
            typeof rn !== 'undefined' && rn.length === 1
                ? rn + `0`
                : rn
        var r = parseInt(rn) >= 50 || false
        var d =
            ln !== undefined && ln !== `0`
                ? sep(ln)
                : undefined
        var c
        if (_u && !s) {
            c = '00'
        } else if (_u && s) {
            c = _f.match(rod)[0] || undefined
            c =
                c !== undefined && c.length < 2 ? (c += `0`) : c
        }
        if (!_u) {
            d = r
                ? sep(
                      (parseInt(ln) + 1).toString()
                  )
                : d
        }
        var res = `${n ? `-` : ``}${d || ``}${c !==
        undefined
            ? `.` + c
            : ``}`
        return res
    }
    return undefined
}
module.exports = usd
var sep = function(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
var rnd = function(v, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math.round(v)
    }
    v = +v
    exp = +exp
    if (isNaN(v) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN
    }
    v = v.toString().split('e')
    v = Math.round(+(v[0] + 'e' + (v[1] ? +v[1] + exp : exp)))
    v = v.toString().split('e')
    return +(v[0] + 'e' + (v[1] ? +v[1] - exp : -exp))
}
var val = function(a) {
    return t.indexOf(typeof a) >= 0 ? true : false
}
