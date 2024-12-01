"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[44803], {
    44803: function(e, t, s) {
        s.r(t),
        s.d(t, {
            default: function() {
                return f
            }
        });
        var r = s(88412)
          , n = s(51538);
        const o = {
            class: "w-60 flex flex-col"
        }
          , l = {
            key: 0,
            class: "flex"
        }
          , a = {
            class: "relative"
        }
          , i = {
            key: 1,
            class: "text-xs text-gray-500"
        };
        function u(e, t, s, u, c, p) {
            const g = (0,
            r.up)("tooltip");
            return (0,
            r.wg)(),
            (0,
            r.iD)("div", o, [e.errorCode ? ((0,
            r.wg)(),
            (0,
            r.iD)("span", l, [(0,
            r.Uk)((0,
            n.zw)(e.errorMessageString) + " ", 1), (0,
            r._)("div", a, [e.hint ? ((0,
            r.wg)(),
            (0,
            r.j4)(g, {
                key: 0,
                class: "mr-1 block text-gray-800",
                message: e.hint,
                positionClass: "right-10 top-0"
            }, null, 8, ["message"])) : (0,
            r.kq)("", !0)])])) : (0,
            r.kq)("", !0), e.notes ? ((0,
            r.wg)(),
            (0,
            r.iD)("span", i, (0,
            n.zw)(e.t("notes")) + ": " + (0,
            n.zw)(e.notes), 1)) : (0,
            r.kq)("", !0)])
        }
        var c = s(81120);
        const p = (0,
        r.RC)((()=>Promise.resolve().then(s.bind(s, 68178))));
        var g = (0,
        r.aZ)({
            components: {
                Tooltip: p
            },
            props: {
                errorCode: {
                    type: Number,
                    default: null
                },
                notes: {
                    type: String,
                    default: null
                },
                hint: {
                    type: String,
                    default: null
                }
            },
            setup(e) {
                const {t: t} = (0,
                c.QT)()
                  , s = (0,
                r.Fl)((()=>t(`errorCode.${e.errorCode}`)));
                return {
                    t: t,
                    errorMessageString: s
                }
            }
        })
          , k = s(57886);
        const d = (0,
        k.Z)(g, [["render", u]]);
        var f = d
    }
}]);
