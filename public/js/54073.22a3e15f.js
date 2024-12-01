"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[54073], {
    54073: function(e, t, a) {
        a.r(t),
        a.d(t, {
            default: function() {
                return F
            }
        });
        var n = a(88412)
          , i = a(51538);
        const s = {
            class: "w-24"
        }
          , m = {
            class: "block"
        }
          , r = {
            class: "pl-1 items-center font-semibold"
        }
          , o = {
            class: "block text-xs font-light"
        };
        function d(e, t, a, d, u, l) {
            return (0,
            n.wg)(),
            (0,
            n.iD)("div", s, [(0,
            n._)("span", m, [(0,
            n.Uk)((0,
            i.zw)(e.getDateFormatted) + " ", 1), (0,
            n._)("span", r, (0,
            i.zw)(e.getTimeFormatted), 1)]), (0,
            n._)("span", o, (0,
            i.zw)(e.getHumanizeFormatted ? `(${e.getHumanizeFormatted})` : "-"), 1)])
        }
        var u = a(64838)
          , l = (0,
        n.aZ)({
            props: {
                dateTimeUnix: {
                    type: Number,
                    default: ()=>0
                }
            },
            setup(e) {
                const t = (0,
                n.Fl)((()=>e.dateTimeUnix ? (0,
                u.o0)(1e3 * e.dateTimeUnix, "DD/MM/YY") : ""))
                  , a = (0,
                n.Fl)((()=>e.dateTimeUnix ? (0,
                u.o0)(1e3 * e.dateTimeUnix, "HH:mm") : ""))
                  , i = (0,
                n.Fl)((()=>e.dateTimeUnix ? (0,
                u.iL)(1e3 * e.dateTimeUnix) : ""));
                return {
                    getDateFormatted: t,
                    getTimeFormatted: a,
                    getHumanizeFormatted: i
                }
            }
        })
          , c = a(57886);
        const p = (0,
        c.Z)(l, [["render", d]]);
        var F = p
    }
}]);
