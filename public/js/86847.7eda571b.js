"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[86847], {
    86847: function(e, t, a) {
        a.r(t),
        a.d(t, {
            default: function() {
                return j
            }
        });
        var o = a(88412)
          , r = a(51538);
        const s = {
            class: "intro-y flex items-center h-10 mt-5"
        }
          , n = {
            class: "text-lg font-medium truncate mr-5"
        }
          , d = {
            class: "mt-5"
        }
          , l = {
            key: 0,
            class: "box px-4 py-4 mb-3 flex items-center zoom-in"
        }
          , m = {
            key: 0,
            class: "p-2 bg-amber-100 rounded"
        }
          , i = {
            class: "ml-4 mr-auto"
        }
          , b = {
            class: "font-medium"
        }
          , u = {
            key: 0,
            class: "w-32 block text-left truncate text-sm"
        }
          , c = {
            class: "text-slate-500 text-xs mt-0.5"
        }
          , k = {
            key: 1,
            class: "box px-4 py-4 mb-3 flex items-center zoom-in"
        }
          , p = {
            class: "ml-4 mr-auto"
        }
          , f = {
            class: "font-medium"
        }
          , x = {
            class: "text-slate-500 text-xs mt-0.5"
        };
        function w(e, t, a, w, g, h) {
            const y = (0,
            o.up)("job-info-card")
              , C = (0,
            o.up)("bank-logo")
              , v = (0,
            o.up)("CreditCardIcon")
              , z = (0,
            o.up)("router-link");
            return (0,
            o.wg)(),
            (0,
            o.iD)(o.HY, null, [(0,
            o.Wm)(y, {
                item: e.jobStat
            }, null, 8, ["item"]), (0,
            o._)("div", s, [(0,
            o._)("h2", n, (0,
            r.zw)(e.t("dashboard.dashboardJobCard.recentTx")), 1)]), (0,
            o._)("div", d, [((0,
            o.wg)(!0),
            (0,
            o.iD)(o.HY, null, (0,
            o.Ko)(e.latestJobList, (t=>((0,
            o.wg)(),
            (0,
            o.iD)("div", {
                class: "intro-y",
                key: t?.id
            }, [e.isTmn(t) ? (0,
            o.kq)("", !0) : ((0,
            o.wg)(),
            (0,
            o.iD)("div", l, [(0,
            o.Wm)(C, {
                "bank-code": t?.bankMember?.bankCode,
                class: "rounded",
                logoClass: "w-8 h-8"
            }, null, 8, ["bank-code"]), t?.bankMember ? (0,
            o.kq)("", !0) : ((0,
            o.wg)(),
            (0,
            o.iD)("div", m, [(0,
            o.Wm)(v)])), (0,
            o._)("div", i, [(0,
            o._)("div", b, (0,
            r.zw)(t?.bankMember?.accountName), 1), t?.bankMember ? (0,
            o.kq)("", !0) : ((0,
            o.wg)(),
            (0,
            o.iD)("span", u, (0,
            r.zw)(t?.txnRemark || t?.fullname || "-"), 1)), (0,
            o._)("div", c, (0,
            r.zw)(e.formatHumanizeFormatted(t.transferredAt)), 1)]), (0,
            o._)("div", {
                class: (0,
                r.C_)([1 === t?.jobType ? "bg-green-600" : "bg-red-600", "py-1 px-2 rounded-full text-xs text-white cursor-pointer font-medium"])
            }, (0,
            r.zw)(e.getTypeLabel(t?.jobType)) + " " + (0,
            r.zw)(e.formatNumberFormatted(t?.amount)), 3)])), e.isTmn(t) ? ((0,
            o.wg)(),
            (0,
            o.iD)("div", k, [(0,
            o.Wm)(C, {
                "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                class: "rounded",
                logoClass: "w-8 h-8"
            }, null, 8, ["bank-code"]), (0,
            o._)("div", p, [(0,
            o._)("div", f, (0,
            r.zw)(t?.fullname), 1), (0,
            o._)("div", x, (0,
            r.zw)(e.formatHumanizeFormatted(t.transferredAt)), 1)]), (0,
            o._)("div", {
                class: (0,
                r.C_)([1 === t?.jobType ? "bg-green-600" : "bg-red-600", "py-1 px-2 rounded-full text-xs text-white cursor-pointer font-medium"])
            }, (0,
            r.zw)(e.getTypeLabel(t?.jobType)) + " " + (0,
            r.zw)(e.formatNumberFormatted(t?.amount)), 3)])) : (0,
            o.kq)("", !0)])))), 128)), (0,
            o.Wm)(z, {
                to: "/tx-job",
                class: "intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
            }, {
                default: (0,
                o.w5)((()=>[(0,
                o.Uk)((0,
                r.zw)(e.t("dashboard.dashboardJobCard.showAll")), 1)])),
                _: 1
            })])], 64)
        }
        var g = a(29260)
          , h = a(81120)
          , y = a(64838)
          , C = a(88182)
          , v = a(90714);
        const z = (0,
        o.RC)((()=>a.e(17679).then(a.bind(a, 17679))))
          , _ = (0,
        o.RC)((()=>a.e(998).then(a.bind(a, 998))));
        var T = (0,
        o.aZ)({
            name: "DashboardJobCard",
            components: {
                BankLogo: z,
                JobInfoCard: _
            },
            setup() {
                const {state: e, commit: t} = (0,
                g.oR)()
                  , {t: a} = (0,
                h.QT)()
                  , r = (0,
                o.Fl)((()=>e.dashboard.registerStat))
                  , s = (0,
                o.Fl)((()=>e.dashboard.jobStat))
                  , n = (0,
                o.Fl)((()=>e.dashboard.latestJobList))
                  , d = (0,
                o.Fl)((()=>v.hX))
                  , l = e=>e?.bankPartner?.bankCode === v.hX.TMN?.toUpperCase()
                  , m = e=>(0,
                y.iL)(1e3 * e)
                  , i = e=>(0,
                C.uf)(e)
                  , b = e=>1 === e ? "ฝาก" : "ถอน";
                return (0,
                o.Ah)((()=>{
                    t("dashboard/setLatestJobList", [])
                }
                )),
                {
                    isTmn: l,
                    getTypeLabel: b,
                    formatHumanizeFormatted: m,
                    formatNumberFormatted: i,
                    latestJobList: n,
                    registerStat: r,
                    jobStat: s,
                    initialsBankCompany: d,
                    t: a
                }
            }
        })
          , F = a(57886);
        const L = (0,
        F.Z)(T, [["render", w]]);
        var j = L
    }
}]);
