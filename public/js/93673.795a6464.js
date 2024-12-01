"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[93673, 1553], {
    93673: function(t, e, o) {
        o.r(e),
        o.d(e, {
            default: function() {
                return c
            }
        });
        var n = o(88412)
          , r = o(51538);
        function u(t, e, o, u, l, p) {
            const s = (0,
            n.up)("JobTypeComponent")
              , i = (0,
            n.up)("Icon");
            return (0,
            n.wg)(),
            (0,
            n.iD)("div", {
                class: (0,
                r.C_)(["w-20", t.promotionId ? "mt-1.5" : ""])
            }, [(0,
            n.Wm)(s, {
                type: t.type
            }, null, 8, ["type"]), t.promotionId ? ((0,
            n.wg)(),
            (0,
            n.iD)("span", {
                key: 0,
                onClick: e[0] || (e[0] = (...e)=>t.onClickPromotion && t.onClickPromotion(...e)),
                class: (0,
                r.C_)(["rounded-full px-0.5 font-semibold mt-1.5 text-[10px] hover:underline cursor-pointer flex items-center justify-center min-w-max", t.getPromotionColor])
            }, [(0,
            n.Uk)((0,
            r.zw)(t.t("txJob.getPromotion")) + " ", 1), (0,
            n.Wm)(i, {
                icon: "material-symbols:info-outline",
                class: "w-3 h-3"
            })], 2)) : (0,
            n.kq)("", !0)], 2)
        }
        var l = o(81120)
          , p = o(1553)
          , s = o(29260)
          , i = o(87873)
          , a = (0,
        n.aZ)({
            components: {
                JobTypeComponent: p["default"]
            },
            props: {
                type: {
                    type: Number,
                    default: ()=>null
                },
                promotionId: {
                    type: Number,
                    default: ()=>null
                },
                promotionRecordId: {
                    type: Number,
                    default: ()=>null
                },
                jobId: {
                    type: Number,
                    default: ()=>null
                },
                status: {
                    type: Number,
                    default: ()=>0
                }
            },
            setup(t) {
                const e = (0,
                s.oR)()
                  , {t: o} = (0,
                l.QT)()
                  , r = (0,
                n.Fl)((()=>t.status === i.uH.CANCEL || t.status === i.uH.SUCCESS ? t.promotionRecordId ? "text-blue-500" : "text-red-500" : "text-gray-400"))
                  , u = ()=>{
                    e.commit("txJob/setJobIdSelected", t.jobId),
                    e.commit("txJob/setShowPromotionJobModal", !0)
                }
                ;
                return {
                    t: o,
                    getPromotionColor: r,
                    onClickPromotion: u
                }
            }
        })
          , m = o(57886);
        const d = (0,
        m.Z)(a, [["render", u]]);
        var c = d
    },
    1553: function(t, e, o) {
        o.r(e),
        o.d(e, {
            default: function() {
                return m
            }
        });
        var n = o(88412)
          , r = o(51538);
        function u(t, e, o, u, l, p) {
            return (0,
            n.wg)(),
            (0,
            n.iD)("span", {
                class: (0,
                r.C_)([t.getTypeColor, "text-white rounded-full px-2.5 py-1 text-xs"])
            }, (0,
            r.zw)(t.t(`job.type.${t.getTypeLabel}`)), 3)
        }
        var l = o(81120)
          , p = o(87873)
          , s = (0,
        n.aZ)({
            props: {
                type: {
                    type: Number,
                    default: ()=>null
                }
            },
            setup(t) {
                const {t: e} = (0,
                l.QT)()
                  , o = (0,
                n.Fl)((()=>t.type === p.O4.DEPOSIT ? p.XG.DEPOSIT : p.XG.WITHDRAW))
                  , r = (0,
                n.Fl)((()=>t.type === p.O4.DEPOSIT ? "bg-green-600" : "bg-red-600"));
                return {
                    getTypeLabel: o,
                    getTypeColor: r,
                    t: e
                }
            }
        })
          , i = o(57886);
        const a = (0,
        i.Z)(s, [["render", u]]);
        var m = a
    }
}]);
