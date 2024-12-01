"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[22152], {
    22152: function(t, e, s) {
        s.r(e),
        s.d(e, {
            default: function() {
                return v
            }
        });
        var a = s(88412)
          , n = s(51538);
        const l = {
            class: "flex items-center"
        }
          , r = {
            class: "pl-4"
        }
          , u = {
            class: "text-slate-500 font-display"
        }
          , i = {
            class: "mt-1.5 flex items-center"
        }
          , p = {
            class: "text-lg"
        }
          , c = {
            class: "text-gray-600 text-xs pl-2"
        };
        function o(t, e, s, o, d, f) {
            return (0,
            a.wg)(),
            (0,
            a.iD)("div", l, [(0,
            a.WI)(t.$slots, "img"), (0,
            a._)("div", r, [(0,
            a._)("div", u, (0,
            n.zw)(t.title), 1), (0,
            a._)("div", i, [(0,
            a._)("div", p, [(0,
            a.Uk)((0,
            n.zw)(t.amountFormatted), 1), (0,
            a._)("span", c, (0,
            n.zw)(t.type), 1)])])])])
        }
        var d = s(88182)
          , f = (0,
        a.aZ)({
            name: "JobInfoItem",
            props: {
                imgUrl: {
                    type: String,
                    default: ""
                },
                title: {
                    type: String,
                    default: ""
                },
                amount: {
                    type: Number,
                    default: 0
                },
                type: {
                    type: String,
                    default: ""
                }
            },
            setup(t) {
                const e = (0,
                a.Fl)((()=>(0,
                d.uf)(t.amount)));
                return {
                    amountFormatted: e
                }
            }
        })
          , m = s(57886);
        const g = (0,
        m.Z)(f, [["render", o]]);
        var v = g
    }
}]);
