"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[15233], {
    32902: function(e, t, a) {
        a.d(t, {
            w: function() {
                return s
            }
        });
        var n = a(90714);
        function s() {
            const e = e=>e === n.hX.SMK88PAY?.toLocaleUpperCase();
            return {
                isSmk88Pay: e
            }
        }
    },
    12867: function(e, t, a) {
        a.d(t, {
            O: function() {
                return c
            },
            f: function() {
                return s
            }
        });
        var n = a(90714);
        function s(e) {
            switch (e) {
            case n.hX.KK.toUpperCase():
                return "###-######-#####";
            case n.hX.BAAC.toUpperCase():
                return "###-######-###";
            case n.hX.GSB.toUpperCase():
                return "###-######-######";
            case n.hX.TISCO.toUpperCase():
                return "###-######-#####";
            case n.hX.BCEL.toUpperCase():
                return "###-######-######-######-#";
            default:
                return "###-######-#"
            }
        }
        function o(e, t, a, n, s) {
            return a || n || s ? n || s ? n ? s ? `${t}-${a}-${n}-${s}` : `${t}-${a}-${n}` : `${t}-${a}-${s}` : `${t}-${a}` : e
        }
        function c(e) {
            const t = /(\d{3})(\d{1})?(\d{5})?(\d{1,6})?/gs;
            return e ? e.replace(t, o) : ""
        }
    },
    15233: function(e, t, a) {
        a.r(t),
        a.d(t, {
            default: function() {
                return R
            }
        });
        var n = a(88412)
          , s = a(51538);
        const o = {
            class: "flex justify-between"
        }
          , c = {
            class: "flex items-center"
        }
          , i = {
            key: 1,
            class: "w-3 h-3 mr-1.5 bg-red-500"
        }
          , l = {
            class: "flex flex-col pl-1"
        }
          , r = {
            class: "pl-1.5 text-xs xl:text-sm whitespace-nowrap"
        }
          , u = {
            class: "pl-1.5 text-xs text-gray-600"
        }
          , d = {
            class: "flex justify-end items-center"
        }
          , m = {
            class: "sm:hidden lg:block text-xs whitespace-nowrap"
        }
          , p = {
            class: "flex items-center justify-between pt-4"
        }
          , b = {
            class: "text-xl font-semibold number-display"
        }
          , k = {
            key: 0,
            class: "flex"
        }
          , g = ["disabled"]
          , w = {
            key: 1,
            class: "w-3 h-3 bg-gray-500"
        }
          , f = {
            key: 1,
            class: "flex items-center"
        }
          , y = {
            key: 0,
            class: "text-xs text-gray-500"
        }
          , x = {
            typeof: "button",
            class: "hover:bg-gray-200 rounded-full ml-1 h-7 w-7 flex justify-center items-center cursor-pointer"
        };
        function h(e, t, a, h, C, B) {
            const v = (0,
            n.up)("PlayIcon")
              , S = (0,
            n.up)("app-bank-logo")
              , _ = (0,
            n.up)("bank-logo")
              , A = (0,
            n.up)("ListIcon")
              , $ = (0,
            n.up)("tooltip")
              , P = (0,
            n.up)("LoaderIcon")
              , U = (0,
            n.up)("RefreshCwIcon")
              , j = (0,
            n.up)("XIcon")
              , I = (0,
            n.up)("SettingsIcon");
            return (0,
            n.wg)(),
            (0,
            n.iD)("div", {
                class: (0,
                s.C_)(["border-l-4 mb-4 px-2 py-2", !e.item.isActive && "filter grayscale"])
            }, [(0,
            n._)("div", o, [(0,
            n._)("div", c, [e.item.isActive ? ((0,
            n.wg)(),
            (0,
            n.j4)(v, {
                key: 0,
                class: "text-green-600 mr-1.5"
            })) : ((0,
            n.wg)(),
            (0,
            n.iD)("div", i)), e.item?.appCode ? ((0,
            n.wg)(),
            (0,
            n.j4)(S, {
                key: 2,
                appCode: e.item?.appCode,
                class: "mr-2",
                "logo-class": "rounded w-5"
            }, null, 8, ["appCode"])) : ((0,
            n.wg)(),
            (0,
            n.j4)(_, {
                key: 3,
                "bank-code": e.item?.bankCode,
                "logo-class": "w-8 h-8"
            }, null, 8, ["bank-code"])), (0,
            n._)("div", l, [(0,
            n._)("span", r, (0,
            s.zw)(e.isSmk88Pay(e.item?.bankCode) ? "" : e.accountNumberFormatted(e.item?.accountNumber)), 1), (0,
            n._)("span", u, (0,
            s.zw)(e.item?.accountName), 1)])]), (0,
            n._)("div", d, [(0,
            n._)("div", m, (0,
            s.zw)(e.$t("txJob.bankAccount.viewStatements")), 1), (0,
            n.Wm)($, {
                class: "block",
                "position-class": "bottom-2.5",
                message: e.$t("txJob.bankAccount.viewStatements")
            }, {
                default: (0,
                n.w5)((()=>[(0,
                n._)("button", {
                    class: "btn ml-1 p-1 border",
                    onClick: t[0] || (t[0] = (...t)=>e.onShowStatementModal && e.onShowStatementModal(...t))
                }, [(0,
                n.Wm)(A, {
                    class: "w-3 h-3"
                })])])),
                _: 1
            }, 8, ["message"])])]), (0,
            n._)("div", p, [(0,
            n._)("h3", b, (0,
            s.zw)(e.amountFormatted(e.item?.amount)), 1), e.isSetting && e.item.id === e.currentBankId ? ((0,
            n.wg)(),
            (0,
            n.iD)("div", k, [(0,
            n.Wm)($, {
                "position-class": "bottom-2.5",
                message: e.isSyncBalance ? e.$t("txJob.bankAccount.updateAmount") : e.$t("txJob.bankAccount.reload")
            }, {
                default: (0,
                n.w5)((()=>[(0,
                n._)("button", {
                    disabled: e.loadingReloadBank,
                    class: "btn btn-secondary mr-1 p-1.5 relative",
                    onClick: t[1] || (t[1] = (...t)=>e.onReloadBank && e.onReloadBank(...t))
                }, [e.loadingReloadBank && e.item.id === e.currentBankId ? ((0,
                n.wg)(),
                (0,
                n.j4)(P, {
                    key: 0,
                    class: "animate-spin w-3 h-3 block text-blue-500"
                })) : ((0,
                n.wg)(),
                (0,
                n.j4)(U, {
                    key: 1,
                    class: "w-3 h-3"
                }))], 8, g)])),
                _: 1
            }, 8, ["message"]), e.item.isActive ? ((0,
            n.wg)(),
            (0,
            n.j4)($, {
                key: 0,
                "position-class": "bottom-2.5",
                message: e.$t("txJob.bankAccount.suspend")
            }, {
                default: (0,
                n.w5)((()=>[(0,
                n._)("button", {
                    class: "btn btn-secondary mr-1 p-1.5",
                    onClick: t[2] || (t[2] = t=>e.onPauseBank(e.item))
                }, [e.loadingPauseBank && e.item.id === e.currentBankId ? ((0,
                n.wg)(),
                (0,
                n.j4)(P, {
                    key: 0,
                    class: "animate-spin w-3 h-3 block text-blue-500"
                })) : ((0,
                n.wg)(),
                (0,
                n.iD)("div", w))])])),
                _: 1
            }, 8, ["message"])) : ((0,
            n.wg)(),
            (0,
            n.j4)($, {
                key: 1,
                "position-class": "bottom-2.5",
                message: e.$t("txJob.bankAccount.active")
            }, {
                default: (0,
                n.w5)((()=>[(0,
                n._)("button", {
                    class: "btn btn-secondary mr-1 p-1.5",
                    onClick: t[3] || (t[3] = t=>e.onPauseBank(e.item))
                }, [e.loadingPauseBank && e.item.id === e.currentBankId ? ((0,
                n.wg)(),
                (0,
                n.j4)(P, {
                    key: 0,
                    class: "animate-spin w-3 h-3 block text-blue-500"
                })) : ((0,
                n.wg)(),
                (0,
                n.j4)(v, {
                    key: 1,
                    class: "text-gray-500 w-3 h-3"
                }))])])),
                _: 1
            }, 8, ["message"])), (0,
            n.Wm)($, {
                "position-class": "bottom-2.5",
                message: e.$t("txJob.bankAccount.closeMenu")
            }, {
                default: (0,
                n.w5)((()=>[(0,
                n._)("button", {
                    class: "btn btn-secondary p-1.5",
                    onClick: t[4] || (t[4] = t=>e.onSetting(e.item.id))
                }, [(0,
                n.Wm)(j, {
                    class: "w-3 h-3"
                })])])),
                _: 1
            }, 8, ["message"])])) : ((0,
            n.wg)(),
            (0,
            n.iD)("div", f, [e.item.isActive ? ((0,
            n.wg)(),
            (0,
            n.iD)("span", y, (0,
            s.zw)(e.$t("txJob.bankAccount.lastUpdate")) + ": " + (0,
            s.zw)(e.lastTxUpdate) + " น. ", 1)) : (0,
            n.kq)("", !0), (0,
            n.Wm)($, {
                "position-class": "bottom-2.5",
                message: e.$t("txJob.bankAccount.manage")
            }, {
                default: (0,
                n.w5)((()=>[(0,
                n._)("div", x, [(0,
                n.Wm)(I, {
                    class: "w-4 h-4",
                    onClick: t[5] || (t[5] = t=>e.onSetting(e.item.id))
                })])])),
                _: 1
            }, 8, ["message"])]))])], 2)
        }
        var C = a(37325)
          , B = a(64838)
          , v = a(88182)
          , S = a(12867)
          , _ = a(90714)
          , A = a(32902);
        const $ = (0,
        n.RC)((()=>a.e(28877).then(a.bind(a, 28877))))
          , P = (0,
        n.RC)((()=>Promise.resolve().then(a.bind(a, 68178))))
          , U = (0,
        n.RC)((()=>a.e(17679).then(a.bind(a, 17679))));
        var j = (0,
        n.aZ)({
            components: {
                BankLogo: U,
                Tooltip: P,
                AppBankLogo: $
            },
            name: "BankStatusCard",
            props: {
                item: {
                    type: Object,
                    default: ()=>({})
                },
                loadingReloadBank: {
                    type: Boolean,
                    default: !1
                },
                loadingPauseBank: {
                    type: Boolean,
                    default: !1
                },
                isSetting: {
                    type: Boolean,
                    default: !1
                },
                currentBankId: {
                    type: Number,
                    default: 0
                }
            },
            emits: ["show-statement-modal", "pause-bank", "reload-bank", "setting-bank", "sync-balance-bank"],
            setup(e, {emit: t}) {
                const a = (0,
                C.iH)(15)
                  , {isSmk88Pay: s} = (0,
                A.w)()
                  , o = e=>(0,
                v.uf)(e)
                  , c = (0,
                n.Fl)((()=>S.O))
                  , i = (0,
                n.Fl)((()=>e.item?.lastTxUpdate ? (0,
                B.o0)(1e3 * e.item?.lastTxUpdate, "HH:mm:ss") : ""))
                  , l = (0,
                n.Fl)((()=>{
                    const t = [_.hX.SCB?.toUpperCase(), _.hX.KBANK?.toUpperCase()];
                    return t?.includes(e.item.bankCode)
                }
                ))
                  , r = e=>{
                    t("setting-bank", e)
                }
                  , u = e=>{
                    t("pause-bank", e)
                }
                  , d = ()=>{
                    const a = [_.hX.SCB?.toUpperCase(), _.hX.KBANK?.toUpperCase(), _.hX.SMK88PAY?.toUpperCase()];
                    a?.includes(e.item.bankCode) ? t("sync-balance-bank", e.item.bankPartnerId) : t("reload-bank", e.item.bankPartnerId)
                }
                  , m = ()=>{
                    t("show-statement-modal", e.item)
                }
                ;
                return {
                    isSmk88Pay: s,
                    isSyncBalance: l,
                    lastTxUpdate: i,
                    countdown: a,
                    accountNumberFormatted: c,
                    amountFormatted: o,
                    onSetting: r,
                    onPauseBank: u,
                    onReloadBank: d,
                    onShowStatementModal: m
                }
            }
        })
          , I = a(57886);
        const X = (0,
        I.Z)(j, [["render", h]]);
        var R = X
    }
}]);
