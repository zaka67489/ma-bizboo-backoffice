"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[5079], {
    5079: function(o, e, n) {
        n.r(e),
        n.d(e, {
            default: function() {
                return h
            }
        });
        var r = n(88412)
          , s = n(51538);
        const c = {
            class: "flex items-center gap-3 min-w-max"
        }
          , t = {
            class: "form-check form-switch"
        }
          , i = {
            class: "font-display font-medium text-[10px] text-center cursor-pointer"
        }
          , u = (0,
        r._)("div", {
            class: "border-l border-black/20 h-[32px]"
        }, null, -1)
          , d = {
            class: "form-check form-switch"
        }
          , l = {
            class: "font-display font-medium text-[10px] text-center cursor-pointer"
        };
        function a(o, e, n, a, k, f) {
            const S = (0,
            r.up)("Icon");
            return (0,
            r.wg)(),
            (0,
            r.iD)("div", c, [(0,
            r._)("div", {
                class: (0,
                s.C_)(["flex flex-col items-center cursor-pointer hover:text-green-600", o.isSuccessSound ? "hover:text-green-600" : "hover:text-red-600"]),
                onClick: e[0] || (e[0] = (...e)=>o.onClickSuccessSound && o.onClickSuccessSound(...e))
            }, [(0,
            r._)("div", t, [o.isSuccessSound ? ((0,
            r.wg)(),
            (0,
            r.j4)(S, {
                key: 0,
                icon: "akar-icons:sound-on",
                width: "14"
            })) : ((0,
            r.wg)(),
            (0,
            r.j4)(S, {
                key: 1,
                icon: "akar-icons:sound-off",
                width: "14"
            }))]), (0,
            r._)("div", i, (0,
            s.zw)(o.t("txJob.successJob")), 1)], 2), u, (0,
            r._)("div", {
                class: (0,
                s.C_)(["flex flex-col items-center cursor-pointer", o.isErrorSound ? "hover:text-green-600" : "hover:text-red-600"]),
                onClick: e[1] || (e[1] = (...e)=>o.onClickErrorSound && o.onClickErrorSound(...e))
            }, [(0,
            r._)("div", d, [o.isErrorSound ? ((0,
            r.wg)(),
            (0,
            r.j4)(S, {
                key: 0,
                icon: "akar-icons:sound-on",
                width: "14"
            })) : ((0,
            r.wg)(),
            (0,
            r.j4)(S, {
                key: 1,
                icon: "akar-icons:sound-off",
                width: "14"
            }))]), (0,
            r._)("div", l, (0,
            s.zw)(o.t("txJob.failureJob")), 1)], 2)])
        }
        var k = n(81120)
          , f = n(42921)
          , S = (0,
        r.aZ)({
            name: "JobSoundSetting",
            setup() {
                const {t: o} = (0,
                k.QT)()
                  , e = (0,
                f._aR)("isSuccessSound", !0)
                  , n = (0,
                f._aR)("isErrorSound", !0)
                  , r = ()=>{
                    n.value = !n.value
                }
                  , s = ()=>{
                    e.value = !e.value
                }
                ;
                return {
                    t: o,
                    isSuccessSound: e,
                    isErrorSound: n,
                    onClickSuccessSound: s,
                    onClickErrorSound: r
                }
            }
        })
          , v = n(57886);
        const x = (0,
        v.Z)(S, [["render", a]]);
        var h = x
    }
}]);
