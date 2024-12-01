"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[56037], {
    56037: function(t, s, u) {
        u.r(s),
        u.d(s, {
            default: function() {
                return f
            }
        });
        var a = u(88412)
          , e = u(51538);
        const r = {
            class: "flex items-center"
        }
          , l = {
            key: 0,
            class: "animate-ping rounded-full bg-red-500 opacity-75 w-2 h-2 block mr-1.5"
        };
        function n(t, s, u, n, E, o) {
            return (0,
            a.wg)(),
            (0,
            a.iD)("div", r, [(0,
            a._)("span", {
                class: (0,
                e.C_)([t.statusColorClass, "px-3 py-1 rounded-full min-w-max text-xs cursor-default whitespace-nowrap relative flex items-center"])
            }, [t.isStatusError ? ((0,
            a.wg)(),
            (0,
            a.iD)("span", l)) : (0,
            a.kq)("", !0), (0,
            a.Uk)(" " + (0,
            e.zw)(t.t(`job.status.${t.getStatusLabel}`)), 1)], 2)])
        }
        var E = u(81120)
          , o = u(87873)
          , C = (0,
        a.aZ)({
            props: {
                status: {
                    type: Number,
                    default: ()=>null
                }
            },
            setup(t) {
                const {t: s} = (0,
                E.QT)()
                  , u = (0,
                a.Fl)((()=>t.status === o.uH.PENDING ? o.MB.PENDING : t.status === o.uH.APPROVED ? o.MB.APPROVED : t.status === o.uH.WAITING ? o.MB.WAITING : t.status === o.uH.ERROR ? o.MB.ERROR : t.status === o.uH.CANCEL ? o.MB.CANCEL : o.MB.SUCCESS))
                  , e = (0,
                a.Fl)((()=>t.status === o.uH.PENDING ? o.f.PENDING : t.status === o.uH.APPROVED ? o.f.APPROVED : t.status === o.uH.WAITING ? o.f.WAITING : t.status === o.uH.ERROR ? o.f.ERROR : t.status === o.uH.CANCEL ? o.f.CANCEL : o.f.SUCCESS))
                  , r = (0,
                a.Fl)((()=>t.status === o.uH.ERROR));
                return {
                    isStatusError: r,
                    statusColorClass: u,
                    getStatusLabel: e,
                    t: s
                }
            }
        })
          , R = u(57886);
        const c = (0,
        R.Z)(C, [["render", n]]);
        var f = c
    }
}]);
