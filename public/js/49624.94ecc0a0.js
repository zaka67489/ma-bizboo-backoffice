"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[49624], {
    49624: function(e, t, n) {
        n.r(t),
        n.d(t, {
            default: function() {
                return p
            }
        });
        var o = n(88412)
          , l = n(51538);
        const s = {
            key: 0,
            "wire:loading": "",
            class: "fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-50 opacity-75 flex flex-col items-center justify-center"
        }
          , a = {
            class: "text-center text-sm font-semibold font-display"
        };
        function i(e, t, n, i, r, c) {
            const u = (0,
            o.up)("loading-circle");
            return e.loading ? ((0,
            o.wg)(),
            (0,
            o.iD)("div", s, [(0,
            o.Wm)(u), (0,
            o._)("h2", a, (0,
            l.zw)(e.t("loading")) + "...", 1)])) : (0,
            o.kq)("", !0)
        }
        var r = n(81120)
          , c = n(11823)
          , u = (0,
        o.aZ)({
            name: "LoadingOverlay",
            components: {
                LoadingCircle: c["default"]
            },
            props: {
                loading: {
                    type: Boolean,
                    default: !0
                }
            },
            setup() {
                const {t: e} = (0,
                r.QT)();
                return {
                    t: e
                }
            }
        })
          , d = n(57886);
        const f = (0,
        d.Z)(u, [["render", i]]);
        var p = f
    }
}]);
