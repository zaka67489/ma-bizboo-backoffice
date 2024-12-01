"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[65867], {
    65867: function(t, o, e) {
        e.r(o),
        e.d(o, {
            default: function() {
                return C
            }
        });
        var r = e(88412)
          , l = e(51538);
        const a = {
            class: "report-box- zoom-in- shadow-xl"
        }
          , n = {
            class: "flex"
        }
          , s = {
            class: "ml-auto text-right mb-8"
        }
          , i = {
            class: "mt-1 font-display text-lg lg:text-xl font-medium"
        }
          , d = {
            class: "text-4xl font-bold leading-8 my-6"
        }
          , u = {
            key: 0
        };
        function c(t, o, e, c, f, g) {
            const p = (0,
            r.up)("loading-circle");
            return (0,
            r.wg)(),
            (0,
            r.iD)("div", a, [(0,
            r._)("div", {
                class: (0,
                l.C_)(["box p-5 border", t.borderColor])
            }, [(0,
            r._)("div", n, [((0,
            r.wg)(),
            (0,
            r.j4)((0,
            r.LL)(t.icon), {
                class: (0,
                l.C_)(["report-box__icon", t.iconClass])
            }, null, 8, ["class"])), (0,
            r._)("div", s, [(0,
            r._)("div", i, (0,
            l.zw)(t.title), 1), (0,
            r._)("div", d, [(0,
            r.Wm)(p, {
                loading: t.loadingDashBoard
            }, null, 8, ["loading"]), t.loadingDashBoard ? (0,
            r.kq)("", !0) : ((0,
            r.wg)(),
            (0,
            r.iD)("span", u, [(0,
            r.Uk)((0,
            l.zw)(t.formatCurrency(t.mainValue)) + " ", 1), (0,
            r.WI)(t.$slots, "suffix")]))])])]), (0,
            r._)("div", {
                class: (0,
                l.C_)([t.borderFooter, "mt-1 border-t-4 pt-2 text-lg"])
            }, (0,
            l.zw)(t.footer), 3)], 2)])
        }
        var f = e(29260)
          , g = e(88182);
        const p = (0,
        r.RC)((()=>Promise.resolve().then(e.bind(e, 11823))));
        var m = (0,
        r.aZ)({
            name: "ReportBox",
            components: {
                LoadingCircle: p
            },
            props: {
                title: {
                    type: String,
                    default: ""
                },
                mainValue: {
                    type: Number,
                    default: 0
                },
                footer: {
                    type: String,
                    default: ""
                },
                icon: {
                    type: String,
                    default: ""
                },
                iconClass: {
                    type: String,
                    default: ""
                },
                borderColor: {
                    type: String,
                    default: ""
                },
                borderFooter: {
                    type: String,
                    default: ""
                }
            },
            setup() {
                const t = (0,
                f.oR)()
                  , o = (0,
                r.Fl)((()=>t.getters["wait/is"]("loading.getDashboardInfo")))
                  , e = (0,
                r.Fl)((()=>g.uf));
                return {
                    formatCurrency: e,
                    loadingDashBoard: o
                }
            }
        })
          , b = e(57886);
        const x = (0,
        b.Z)(m, [["render", c]]);
        var C = x
    }
}]);
