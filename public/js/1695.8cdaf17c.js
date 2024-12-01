"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[1695], {
    1695: function(e, t, a) {
        a.r(t),
        a.d(t, {
            default: function() {
                return P
            }
        });
        var o = a(88412)
          , l = a(51538);
        const r = {
            class: "p-1 rounded-lg border border-yellow-300 bg-gradient-to-tr from-yellow-400 to-yellow-50 shadow-xl"
        }
          , d = {
            class: "p-3 border-b-2 border-yellow-300"
        }
          , n = {
            class: "flex items-center justify-between mb-4"
        }
          , s = {
            class: "text-xl font-display font-medium"
        }
          , i = {
            class: "h-8"
        }
          , u = {
            class: "grid grid-cols-2"
        }
          , m = {
            class: "p-3"
        }
          , g = {
            class: "mb-4 text-lg font-display font-medium"
        }
          , c = {
            class: "h-6"
        }
          , y = {
            key: 1,
            class: "text-lg font-semibold text-blue-600"
        }
          , w = {
            class: "p-3"
        }
          , p = {
            class: "mb-4 text-lg font-display font-medium"
        }
          , h = {
            class: "h-6"
        }
          , v = {
            key: 1,
            class: "text-lg font-semibold text-red-600"
        };
        function b(e, t, a, b, f, C) {
            const k = (0,
            o.up)("period-date-dropdown")
              , x = (0,
            o.up)("loading-circle");
            return (0,
            o.wg)(),
            (0,
            o.iD)("div", r, [(0,
            o._)("div", d, [(0,
            o._)("div", n, [(0,
            o._)("h1", s, (0,
            l.zw)(e.t("dashboard.summaryInfoCard.title")), 1), (0,
            o.Wm)(k, {
                onChangePeriodDate: e.onChangePeriod
            }, null, 8, ["onChangePeriodDate"])]), (0,
            o._)("div", i, [e.loading ? ((0,
            o.wg)(),
            (0,
            o.j4)(x, {
                key: 0,
                loading: e.loading
            }, null, 8, ["loading"])) : ((0,
            o.wg)(),
            (0,
            o.iD)("h2", {
                key: 1,
                class: (0,
                l.C_)([e.getTotalWinLoseColor, "text-2xl font-semibold font-display"])
            }, (0,
            l.zw)(e.getFormatNumber(e.totalWinLose)) + " " + (0,
            l.zw)(e.currency), 3))])]), (0,
            o._)("div", u, [(0,
            o._)("div", m, [(0,
            o._)("h1", g, (0,
            l.zw)(e.t("dashboard.summaryInfoCard.period.deposit")), 1), (0,
            o._)("div", c, [e.loading ? ((0,
            o.wg)(),
            (0,
            o.j4)(x, {
                key: 0,
                loading: e.loading
            }, null, 8, ["loading"])) : ((0,
            o.wg)(),
            (0,
            o.iD)("h2", y, (0,
            l.zw)(e.getFormatNumber(e.summaryItem?.deposit)), 1))])]), (0,
            o._)("div", w, [(0,
            o._)("h1", p, (0,
            l.zw)(e.t("dashboard.summaryInfoCard.period.withdraw")), 1), (0,
            o._)("div", h, [e.loading ? ((0,
            o.wg)(),
            (0,
            o.j4)(x, {
                key: 0,
                loading: e.loading
            }, null, 8, ["loading"])) : ((0,
            o.wg)(),
            (0,
            o.iD)("h2", v, (0,
            l.zw)(e.getFormatNumber(e.summaryItem?.withdraw)), 1))])])])])
        }
        var f = a(37325)
          , C = a(81120)
          , k = a(88182)
          , x = a(29260);
        const _ = (0,
        o.RC)((()=>Promise.resolve().then(a.bind(a, 11823))))
          , I = (0,
        o.RC)((()=>Promise.all([a.e(32900), a.e(33758)]).then(a.bind(a, 33758))));
        var D = (0,
        o.aZ)({
            name: "SummaryInfoCard",
            components: {
                PeriodDateDropdown: I,
                LoadingCircle: _
            },
            props: {
                summaryItem: {
                    type: Object,
                    default: ()=>({})
                },
                loading: {
                    type: Boolean,
                    default: !1
                }
            },
            setup(e, {emit: t}) {
                const {t: a} = (0,
                C.QT)()
                  , l = (0,
                x.oR)()
                  , r = (0,
                f.iH)("today")
                  , d = (0,
                f.iH)("today")
                  , n = e=>{
                    "today" == e.value ? r.value = "today" : "yesterday" == e.value ? r.value = "yesterday" : "week" == e.value ? r.value = "week" : "month" == e.value ? r.value = "month" : "lastMonth" == e.value && (r.value = "lastMonth"),
                    d.value = e.value,
                    t("on-period-change", d.value)
                }
                  , s = e=>(0,
                k.uf)(e)
                  , i = (0,
                o.Fl)((()=>l.state.profile.currency))
                  , u = (0,
                o.Fl)((()=>{
                    const t = e.summaryItem?.deposit
                      , a = e.summaryItem?.withdraw;
                    return t + a
                }
                ))
                  , m = (0,
                o.Fl)((()=>u.value > 0 ? "text-green-500" : "text-red-600"));
                return {
                    t: a,
                    currency: i,
                    getFormatNumber: s,
                    onChangePeriod: n,
                    getTotalWinLoseColor: m,
                    dateLabel: r,
                    currentSummary: d,
                    totalWinLose: u
                }
            }
        })
          , z = a(57886);
        const F = (0,
        z.Z)(D, [["render", b]]);
        var P = F
    }
}]);
