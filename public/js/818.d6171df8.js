"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[818], {
    818: function(e, t, s) {
        s.r(t),
        s.d(t, {
            default: function() {
                return g
            }
        });
        var n = s(88412)
          , r = s(51538)
          , a = s(89796);
        const l = {
            class: "bg-gray-700 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-gray-700 before:absolute before:left-3.5"
        }
          , i = {
            class: "flex items-center gap-1 ml-3 relative"
        }
          , o = (0,
        n._)("span", {
            class: "bg-blue-500 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-blue-500 before:absolute before:left-[18px]"
        }, " Auto ", -1)
          , u = {
            class: "flex items-center gap-1 ml-3 relative mt-1"
        }
          , f = {
            class: "bg-green-600 text-white px-1.5 py-0.5 text-xs rounded-md before:content-['⬥'] before:text-green-600 before:absolute before:left-[14px] whitespace-nowrap"
        };
        function c(e, t, s, c, p, b) {
            const d = (0,
            n.up)("UserIcon")
              , h = (0,
            n.up)("Icon")
              , x = (0,
            n.up)("UserCheckIcon");
            return (0,
            n.wg)(),
            (0,
            n.iD)(n.HY, null, [((0,
            n.wg)(!0),
            (0,
            n.iD)(n.HY, null, (0,
            n.Ko)(e.staffList, ((t,s)=>(0,
            n.wy)(((0,
            n.wg)(),
            (0,
            n.iD)("div", {
                key: s,
                class: (0,
                r.C_)(["flex items-center gap-1 ml-3 relative", Number(e.staffList?.length - 1) === s ? "" : "mb-1"])
            }, [(0,
            n.Wm)(d, {
                class: "w-4 h-4 inline"
            }), (0,
            n._)("span", l, (0,
            r.zw)(e.getUsername(t)), 1)], 2)), [[a.F8, e.staffList?.length]]))), 128)), (0,
            n.wy)((0,
            n._)("div", i, [(0,
            n.Wm)(h, {
                icon: "fluent:bot-sparkle-20-regular",
                width: "20",
                height: "20"
            }), o], 512), [[a.F8, !e.staffList?.length]]), (0,
            n.wy)((0,
            n._)("div", u, [(0,
            n.Wm)(x, {
                class: "w-4 h-4 inline"
            }), (0,
            n._)("span", f, (0,
            r.zw)(e.finishedByLabel(e.finishedBy)), 1)], 512), [[a.F8, e.finishedBy]])], 64)
        }
        var p = s(87873)
          , b = s(81120)
          , d = (0,
        n.aZ)({
            props: {
                staffList: {
                    type: Array,
                    default: ()=>[]
                },
                finishedBy: {
                    type: String,
                    default: ""
                },
                jobType: {
                    type: Number,
                    default: 0
                }
            },
            setup(e) {
                const {t: t} = (0,
                b.QT)()
                  , s = (0,
                n.Fl)((()=>e.jobType === p.O4.DEPOSIT ? t("txJob.manual.adjustSuccessDeposit") : e.jobType === p.O4.WITHDRAW ? t("txJob.manual.adjustSuccessWithdraw") : ""))
                  , r = e=>{
                    const t = e?.split("@")[0];
                    return t || t
                }
                  , a = e=>{
                    const t = r(e);
                    return `${t} (${s.value})`
                }
                ;
                return {
                    getUsername: r,
                    finishedByLabel: a
                }
            }
        })
          , h = s(57886);
        const x = (0,
        h.Z)(d, [["render", c]]);
        var g = x
    }
}]);
