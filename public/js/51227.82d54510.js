"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[51227], {
    51227: function(e, t, s) {
        s.r(t),
        s.d(t, {
            default: function() {
                return k
            }
        });
        var l = s(88412)
          , n = s(51538);
        const a = {
            class: "m-6 overflow-x-scroll lg:flex flex-col items-center"
        }
          , o = {
            class: "text-gray-600 text-xs px-6 pb-6"
        };
        function c(e, t, s, c, i, r) {
            const d = (0,
            l.up)("statement-table-container")
              , u = (0,
            l.up)("base-modal");
            return (0,
            l.wg)(),
            (0,
            l.j4)(u, {
                "is-show": e.isShow,
                title: `${e.t("txJob.statement.title")}${e.selectedBankTitle}`,
                "modal-class": "modal-xl",
                onClose: e.onClose
            }, {
                default: (0,
                l.w5)((()=>[(0,
                l._)("div", a, [(0,
                l.Wm)(d, {
                    "select-bank-id": e.selectBankId
                }, null, 8, ["select-bank-id"])]), (0,
                l._)("div", o, (0,
                n.zw)(e.$t("txJob.statement.remark")), 1)])),
                _: 1
            }, 8, ["is-show", "title", "onClose"])
        }
        var i = s(29260)
          , r = s(81120);
        const d = (0,
        l.RC)((()=>s.e(59215).then(s.bind(s, 59215))))
          , u = (0,
        l.RC)((()=>s.e(21209).then(s.bind(s, 21209))));
        var m = (0,
        l.aZ)({
            name: "StatementTableModal",
            components: {
                BaseModal: d,
                StatementTableContainer: u
            },
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                selectBankId: {
                    type: Number,
                    default: 0
                },
                selectedBankTitle: {
                    type: String,
                    default: ""
                }
            },
            emits: ["close-modal"],
            setup() {
                const {t: e} = (0,
                r.QT)()
                  , {commit: t} = (0,
                i.oR)()
                  , s = ()=>{
                    t("bank/setShowStatementModal", !1)
                }
                ;
                return {
                    onClose: s,
                    t: e
                }
            }
        })
          , p = s(57886);
        const b = (0,
        p.Z)(m, [["render", c]]);
        var k = b
    }
}]);
