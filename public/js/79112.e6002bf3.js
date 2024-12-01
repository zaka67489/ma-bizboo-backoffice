"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[79112], {
    79112: function(a, e, n) {
        n.r(e),
        n.d(e, {
            default: function() {
                return k
            }
        });
        var t = n(88412)
          , o = n(51538);
        const s = {
            class: "grid grid-cols-12 gap-5"
        }
          , d = {
            class: "col-span-12 xxl:col-span-9"
        }
          , r = {
            class: "grid grid-cols-12 gap-5"
        }
          , i = {
            class: "col-span-12 mt-5"
        }
          , c = {
            class: "intro-y flex items-center"
        };
        function l(a, e, n, l, h, u) {
            const b = (0,
            t.up)("RefreshCcwIcon")
              , p = (0,
            t.up)("base-button")
              , g = (0,
            t.up)("dashboard-card-info")
              , m = (0,
            t.up)("dashboard-chart")
              , C = (0,
            t.up)("ReleaseNoteContainer");
            return (0,
            t.wg)(),
            (0,
            t.iD)("div", s, [(0,
            t._)("div", d, [(0,
            t._)("div", r, [(0,
            t._)("div", i, [(0,
            t._)("div", c, [(0,
            t.Wm)(p, {
                loading: a.loadingChart,
                onClick: e[0] || (e[0] = e=>a.fetchDashboard(a.period)),
                class: "btn btn-outline-dark font-medium truncate btn font-display w-32 h-9 disabled:border-gray-400"
            }, {
                default: (0,
                t.w5)((()=>[(0,
                t.Wm)(b, {
                    class: "w-4 h-4 mr-3"
                }), (0,
                t.Uk)(" " + (0,
                o.zw)(a.t("dashboard.updateButton")), 1)])),
                _: 1
            }, 8, ["loading"])])]), (0,
            t.Wm)(g, {
                onOnPeriodChange: a.onPeriodChange
            }, null, 8, ["onOnPeriodChange"]), (0,
            t.Wm)(m)]), (0,
            t.Wm)(C)])])
        }
        var h = n(37325)
          , u = n(29260)
          , b = n(81120);
        const p = (0,
        t.RC)((()=>Promise.resolve().then(n.bind(n, 17243))))
          , g = (0,
        t.RC)((()=>n.e(35120).then(n.bind(n, 35120))))
          , m = (0,
        t.RC)((()=>n.e(95481).then(n.bind(n, 95481))))
          , C = (0,
        t.RC)((()=>n.e(40229).then(n.bind(n, 40229))));
        var f = (0,
        t.aZ)({
            name: "Home",
            components: {
                DashboardChart: g,
                DashboardCardInfo: m,
                BaseButton: p,
                ReleaseNoteContainer: C
            },
            setup() {
                const {t: a} = (0,
                b.QT)()
                  , e = (0,
                u.oR)()
                  , n = (0,
                h.iH)("")
                  , o = (0,
                t.Fl)((()=>e.getters["wait/is"]("loading.getDashboardInfo")))
                  , s = async a=>{
                    await e.dispatch("dashboard/getDashboardInfo", a)
                }
                ;
                (0,
                t.Ah)((()=>{
                    e.commit("dashboard/setDepositLatest", []),
                    e.commit("dashboard/setWithdrawalLatest", [])
                }
                ));
                const d = async a=>{
                    n.value = a,
                    await s(a)
                }
                ;
                return {
                    t: a,
                    period: n,
                    loadingChart: o,
                    fetchDashboard: s,
                    onPeriodChange: d
                }
            }
        })
          , w = n(57886);
        const v = (0,
        w.Z)(f, [["render", l]]);
        var k = v
    }
}]);
