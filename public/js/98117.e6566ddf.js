"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[98117], {
    98117: function(t, e, o) {
        o.r(e),
        o.d(e, {
            default: function() {
                return w
            }
        });
        var a = o(88412)
          , n = o(51538);
        const s = {
            class: "m-6 overflow-auto"
        }
          , l = {
            class: "text-gray-600 text-xs px-6 pb-6"
        };
        function p(t, e, o, p, i, r) {
            const u = (0,
            a.up)("ToppayStatementTableContainer")
              , c = (0,
            a.up)("base-modal");
            return (0,
            a.wg)(),
            (0,
            a.j4)(c, {
                "is-show": t.isShow,
                title: `${t.t("txJob.statement.title")}${t.selectedBankTitle}`,
                "modal-class": "modal-2xl",
                onClose: t.onClose
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a._)("div", s, [(0,
                a.Wm)(u)]), (0,
                a._)("div", l, (0,
                n.zw)(t.$t("txJob.statement.remark")), 1)])),
                _: 1
            }, 8, ["is-show", "title", "onClose"])
        }
        var i = o(29260)
          , r = o(81120);
        const u = (0,
        a.RC)((()=>o.e(59215).then(o.bind(o, 59215))))
          , c = (0,
        a.RC)((()=>o.e(89961).then(o.bind(o, 89961))));
        var d = (0,
        a.aZ)({
            name: "ToppayStatementTableModal",
            components: {
                BaseModal: u,
                ToppayStatementTableContainer: c
            },
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                selectedBankTitle: {
                    type: String,
                    default: ""
                }
            },
            emits: ["close-modal"],
            setup() {
                const {t: t} = (0,
                r.QT)()
                  , {commit: e} = (0,
                i.oR)()
                  , o = ()=>{
                    e("bank/setShowToppayStatementModal", !1)
                }
                ;
                return {
                    onClose: o,
                    t: t
                }
            }
        })
          , m = o(57886);
        const b = (0,
        m.Z)(d, [["render", p]]);
        var w = b
    }
}]);
