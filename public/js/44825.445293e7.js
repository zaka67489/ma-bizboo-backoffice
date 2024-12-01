(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[44825, 55689, 1197], {
    82016: function(t, e, o) {
        var a = o(20282)
          , n = o(11685);
        function s(t, e) {
            return t && t.length ? n(t, a(e, 2)) : []
        }
        t.exports = s
    },
    55689: function(t, e, o) {
        "use strict";
        o.r(e),
        o.d(e, {
            default: function() {
                return m
            }
        });
        var a = o(88412);
        const n = {
            class: "grid grid-cols-12 mt-5"
        }
          , s = {
            class: "col-span-12 sm:col-span-12"
        }
          , l = {
            class: "box px-5 pb-5"
        }
          , r = {
            class: "flex flex-col sm:flex-row items-center pt-5 pb-3 mb-3 border-b-2 border-primary"
        }
          , i = {
            class: "text-lg font-display mr-auto flex items-center text-neutral-600 uppercase font-bold"
        }
          , c = {
            class: "w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0"
        };
        function d(t, e, o, d, b, u) {
            return (0,
            a.wg)(),
            (0,
            a.iD)("div", n, [(0,
            a._)("div", s, [(0,
            a._)("div", l, [(0,
            a._)("div", r, [(0,
            a._)("h2", i, [(0,
            a.WI)(t.$slots, "header-title")]), (0,
            a._)("div", c, [(0,
            a.WI)(t.$slots, "header-action")])]), (0,
            a.WI)(t.$slots, "page-content")])])])
        }
        var b = (0,
        a.aZ)({
            name: "TemplateContent"
        })
          , u = o(57886);
        const p = (0,
        u.Z)(b, [["render", d]]);
        var m = p
    },
    1197: function(t, e, o) {
        "use strict";
        o.r(e),
        o.d(e, {
            default: function() {
                return C
            }
        });
        var a = o(88412)
          , n = o(51538);
        const s = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[99] m-0 p-0"
        }
          , l = {
            class: "modal-dialog mx-auto my-3 flex justify-center items-center modal-lg"
        }
          , r = {
            class: "modal-content bg-primary"
        }
          , i = {
            class: "modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0"
        }
          , c = {
            class: "text-center"
        }
          , d = {
            class: "font-medium font-display mr-auto text-2xl mb-5 text-white"
        }
          , b = {
            class: "bg-white rounded-lg p-5 m-5"
        }
          , u = {
            class: "font-display text-base text-center"
        }
          , p = {
            class: "font-display text-lg flex flex-col items-center"
        }
          , m = ["src"]
          , h = {
            class: "flex justify-center gap-3 mt-1"
        };
        function w(t, e, o, w, x, f) {
            const g = (0,
            a.up)("XIcon")
              , y = (0,
            a.up)("base-button");
            return t.isShow ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", s, [(0,
            a._)("div", l, [(0,
            a._)("div", r, [(0,
            a._)("div", i, [(0,
            a.Wm)(g, {
                class: "cursor-pointer text-white",
                onClick: t.onClose
            }, null, 8, ["onClick"])]), (0,
            a._)("div", c, [(0,
            a._)("h1", d, (0,
            n.zw)(t.t("transfer.qrCode")), 1), (0,
            a._)("div", b, [(0,
            a._)("div", u, [(0,
            a._)("div", p, [t.qrCodeUrl ? ((0,
            a.wg)(),
            (0,
            a.iD)("img", {
                key: 0,
                src: t.qrCodeUrl,
                alt: "qr code",
                class: "w-56 h-56"
            }, null, 8, m)) : (0,
            a.kq)("", !0)])]), (0,
            a._)("div", h, [(0,
            a.Wm)(y, {
                onClick: t.onClose,
                class: "btn btn-outline-dark w-16"
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Uk)((0,
                n.zw)(t.t("close")), 1)])),
                _: 1
            }, 8, ["onClick"])])])])])])])) : (0,
            a.kq)("", !0)
        }
        var x = o(29260)
          , f = o(81120)
          , g = o(17243)
          , y = (0,
        a.aZ)({
            name: "TxJobMatchDetailModal",
            components: {
                BaseButton: g["default"]
            },
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                qrCodeUrl: {
                    type: String,
                    default: ""
                }
            },
            setup() {
                const {t: t} = (0,
                f.QT)()
                  , e = (0,
                x.oR)()
                  , o = ()=>{
                    e.commit("transfer/setShowQrCodeModal", !1)
                }
                ;
                return {
                    t: t,
                    onClose: o
                }
            }
        })
          , J = o(57886);
        const k = (0,
        J.Z)(y, [["render", w]]);
        var C = k
    },
    44825: function(t, e, o) {
        "use strict";
        o.r(e),
        o.d(e, {
            default: function() {
                return qt
            }
        });
        var a = o(88412)
          , n = o(51538);
        const s = {
            class: "uppercase font-bold"
        }
          , l = {
            class: "overflow-x-auto"
        };
        function r(t, e, o, r, i, c) {
            const d = (0,
            a.up)("AlignJustifyIcon")
              , b = (0,
            a.up)("loading-circle")
              , u = (0,
            a.up)("RefreshCwIcon")
              , p = (0,
            a.up)("tooltip")
              , m = (0,
            a.up)("latest-job-table")
              , h = (0,
            a.up)("template-content")
              , w = (0,
            a.up)("QrCodeModal");
            return (0,
            a.wg)(),
            (0,
            a.iD)(a.HY, null, [(0,
            a.Wm)(h, null, {
                "header-title": (0,
                a.w5)((()=>[(0,
                a.Wm)(d, {
                    class: "w-6 h-6 mr-3 text-blue-800 inline"
                }), (0,
                a._)("h2", s, (0,
                n.zw)(t.t("txJob.last.title")), 1)])),
                "header-action": (0,
                a.w5)((()=>[(0,
                a._)("button", {
                    class: "btn btn-primary w-8 h-8 rounded",
                    onClick: e[0] || (e[0] = (...e)=>t.onReloadJobList && t.onReloadJobList(...e))
                }, [(0,
                a.Wm)(p, {
                    class: "block text-gray-800",
                    message: t.$t("refresh")
                }, {
                    default: (0,
                    a.w5)((()=>[t.loadingRefreshTxJobDoneList ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)(b, {
                        key: 0,
                        loading: t.loadingRefreshTxJobDoneList
                    }, null, 8, ["loading"])) : ((0,
                    a.wg)(),
                    (0,
                    a.j4)(u, {
                        key: 1,
                        class: "text-white px-0.5"
                    }))])),
                    _: 1
                }, 8, ["message"])])])),
                "page-content": (0,
                a.w5)((()=>[(0,
                a._)("div", l, [(0,
                a.Wm)(m, {
                    loading: t.loadingGetTxJobDoneList,
                    list: t.txJobDoneList,
                    onFetchDoneJobList: t.onChangePage,
                    onShowJobMatchDetail: t.onShowTxJobMatchDetail,
                    onShowQrCode: t.onShowQrCode
                }, null, 8, ["loading", "list", "onFetchDoneJobList", "onShowJobMatchDetail", "onShowQrCode"])])])),
                _: 1
            }), ((0,
            a.wg)(),
            (0,
            a.j4)(a.lR, {
                to: "body"
            }, [(0,
            a.Wm)(w, {
                "is-show": t.isShowQrCodeModal,
                "qr-code-url": t.qrCodeUrl
            }, null, 8, ["is-show", "qr-code-url"])]))], 64)
        }
        var i = o(37325)
          , c = o(81120)
          , d = o(29260)
          , b = o(82016)
          , u = o.n(b)
          , p = o(89796);
        const m = {
            class: "grid grid-cols-12"
        }
          , h = {
            class: "intro-y box col-span-12 sm:col-span-12"
        }
          , w = {
            class: "overflow-x-auto job-done_max-height",
            ref: "el"
        }
          , x = {
            class: "text-xs border w-full"
        }
          , f = {
            class: "sticky top-0 z-10"
        }
          , g = {
            class: "bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm font-semibold"
        }
          , y = (0,
        a._)("th", {
            class: "py-1 px-2 whitespace-nowrap"
        }, "#", -1)
          , J = {
            class: "py-1 px-2 whitespace-nowrap"
        }
          , k = {
            class: "py-1 px-2 whitespace-nowrap text-center"
        }
          , C = {
            class: "py-1 px-2 whitespace-nowrap text-right"
        }
          , _ = {
            class: "py-1 px-2 whitespace-nowrap text-center"
        }
          , v = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , D = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , T = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , j = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , M = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , L = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , S = {
            class: "py-1 px-2 whitespace-nowrap text-center"
        }
          , z = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , R = {
            class: "p-2 text-center w-10"
        }
          , q = {
            class: "p-2 text-center"
        }
          , Q = {
            class: "w-28"
        }
          , W = {
            class: "p-2 text-center w-20"
        }
          , F = {
            class: "p-2 text-right number-display"
        }
          , B = {
            class: "p-2 text-center number-display"
        }
          , $ = {
            class: "p-2 text-center w-[50px]"
        }
          , U = {
            class: "p-2 text-center w-[50px]"
        }
          , N = {
            class: "p-2 relative"
        }
          , I = {
            class: "flex items-center justify-between w-60"
        }
          , P = {
            key: 0
        }
          , A = {
            key: 1,
            class: "flex items-center"
        }
          , H = {
            class: "pl-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , Z = {
            key: 1
        }
          , Y = {
            class: "text-left flex items-center"
        }
          , X = {
            class: "flex items-center"
        }
          , G = {
            class: "p-2 bg-amber-100 rounded"
        }
          , E = {
            class: "ml-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , K = {
            class: "p-2 text-center"
        }
          , O = {
            class: "p-2 text-center"
        }
          , V = {
            class: "p-2 text-center"
        }
          , tt = {
            class: "w-36"
        }
          , et = {
            class: "p-2"
        }
          , ot = {
            class: "bg-yellow-50 p-2 text-center"
        }
          , at = {
            colspan: "18"
        }
          , nt = {
            class: "p-2"
        }
          , st = {
            colspan: "18",
            class: "p-2 text-center"
        };
        function lt(t, e, o, s, l, r) {
            const i = (0,
            a.up)("job-channel")
              , c = (0,
            a.up)("JobTypePromotion")
              , d = (0,
            a.up)("job-date-time")
              , b = (0,
            a.up)("JobUsername")
              , u = (0,
            a.up)("job-bank-account")
              , lt = (0,
            a.up)("bank-logo")
              , rt = (0,
            a.up)("UserIcon")
              , it = (0,
            a.up)("CreditCardIcon")
              , ct = (0,
            a.up)("JobQrCode")
              , dt = (0,
            a.up)("job-status")
              , bt = (0,
            a.up)("CreatedBy")
              , ut = (0,
            a.up)("job-error-message")
              , pt = (0,
            a.up)("loading-circle");
            return (0,
            a.wg)(),
            (0,
            a.iD)("div", m, [(0,
            a._)("div", h, [(0,
            a._)("div", w, [(0,
            a._)("table", x, [(0,
            a._)("thead", f, [(0,
            a._)("tr", g, [y, (0,
            a._)("th", J, (0,
            n.zw)(t.t("txJob.last.table.channel")), 1), (0,
            a._)("th", k, (0,
            n.zw)(t.t("txJob.last.table.type")), 1), (0,
            a._)("th", C, (0,
            n.zw)(t.t("txJob.last.table.amount")), 1), (0,
            a._)("th", _, (0,
            n.zw)(t.t("txJob.last.table.transactionAt")), 1), (0,
            a._)("th", v, (0,
            n.zw)(t.t("txJob.last.table.txDuration")), 1), (0,
            a._)("th", D, (0,
            n.zw)(t.t("txJob.last.table.duration")), 1), (0,
            a._)("th", T, (0,
            n.zw)(t.t("txJob.last.table.user")), 1), (0,
            a._)("th", j, (0,
            n.zw)(t.t("txJob.last.table.memberName")), 1), (0,
            a._)("th", M, (0,
            n.zw)(t.t("txJob.last.table.webAccount")), 1), (0,
            a._)("th", L, (0,
            n.zw)(t.t("txJob.last.table.status")), 1), (0,
            a._)("th", S, (0,
            n.zw)(t.t("txJob.last.table.transaction")), 1), (0,
            a._)("th", z, (0,
            n.zw)(t.t("txJob.last.table.note")), 1)])]), (0,
            a._)("tbody", null, [((0,
            a.wg)(!0),
            (0,
            a.iD)(a.HY, null, (0,
            a.Ko)(t.newJobList, (e=>((0,
            a.wg)(),
            (0,
            a.iD)("tr", {
                class: (0,
                n.C_)([`${1 === e.jobType ? "bg-green-50" : "bg-red-50"} ${e.isBlacklist ? "backlist-crosswalk__bg text-white" : ""}`, "p-2 hover:bg-yellow-100 px-half border-b border-gray-300"]),
                key: e.id
            }, [(0,
            a._)("td", R, (0,
            n.zw)(e.id), 1), (0,
            a._)("td", q, [(0,
            a._)("div", Q, [(0,
            a.Wm)(i, {
                "show-slip": "",
                class: "cursor-pointer",
                "channel-id": e?.channel,
                "job-id": e?.id,
                onClick: o=>t.onShowTxJobMatchDetail(e)
            }, null, 8, ["channel-id", "job-id", "onClick"])])]), (0,
            a._)("td", W, [(0,
            a.Wm)(c, {
                type: e?.jobType,
                "promotion-id": e?.promotionId,
                "promotion-record-id": e?.promotionRecordId,
                status: e?.status,
                "job-id": e?.id
            }, null, 8, ["type", "promotion-id", "promotion-record-id", "status", "job-id"])]), (0,
            a._)("td", F, (0,
            n.zw)(t.formatCurrency(e.amount)), 1), (0,
            a._)("td", B, [(0,
            a.Wm)(d, {
                "date-time-unix": e.transferredAt
            }, null, 8, ["date-time-unix"])]), (0,
            a._)("td", $, (0,
            n.zw)(t.getJobDuration(e.txDuration)), 1), (0,
            a._)("td", U, (0,
            n.zw)(t.getJobDuration(e.duration)), 1), (0,
            a._)("td", null, [(0,
            a.Wm)(b, {
                username: e?.username,
                "member-id": e.memberId,
                "member-notes": e?.memberNotes
            }, null, 8, ["username", "member-id", "member-notes"])]), (0,
            a._)("td", N, [(0,
            a._)("div", I, [(0,
            a._)("div", null, [t.isTmn(e) ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", P, [e?.fullname && e?.phone ? ((0,
            a.wg)(),
            (0,
            a.j4)(u, {
                key: 0,
                "bank-code": t.initialsBankCompany.TMN?.toUpperCase(),
                "account-name": e?.fullname,
                "account-number": e?.phone
            }, null, 8, ["bank-code", "account-name", "account-number"])) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", A, [(0,
            a.Wm)(lt, {
                "bank-code": t.initialsBankCompany.TMN?.toUpperCase(),
                "logo-class": "rounded w-7 h-7"
            }, null, 8, ["bank-code"]), (0,
            a._)("span", H, (0,
            n.zw)(e?.txnRemark || "-"), 1)]))])) : (0,
            a.kq)("", !0), t.isTmn(e) ? (0,
            a.kq)("", !0) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", Z, [(0,
            a.wy)((0,
            a.Wm)(u, {
                "bank-code": e?.bankMember?.bankCode,
                "account-name": e?.bankMember?.accountName,
                "account-number": e?.bankMember?.accountNumber
            }, null, 8, ["bank-code", "account-name", "account-number"]), [[p.F8, e?.bankMember]]), (0,
            a.wy)((0,
            a._)("span", Y, [e?.fullname ? ((0,
            a.wg)(),
            (0,
            a.j4)(rt, {
                key: 0,
                class: "h-6 w-6 mx-1.5"
            })) : (0,
            a.kq)("", !0), (0,
            a.Uk)(" " + (0,
            n.zw)(e?.fullname), 1)], 512), [[p.F8, !e?.bankMember]]), (0,
            a.wy)((0,
            a._)("div", X, [(0,
            a._)("div", G, [(0,
            a.Wm)(it)]), (0,
            a._)("span", E, (0,
            n.zw)(e?.txnRemark || "-"), 1)], 512), [[p.F8, !e?.bankMember && !e.fullname]])]))]), (0,
            a.Wm)(ct, {
                "qr-code-string": e?.qrCodeString.value,
                onShowQrCode: t.onShowQrCode
            }, null, 8, ["qr-code-string", "onShowQrCode"])])]), (0,
            a._)("td", K, [e?.bankPartner ? ((0,
            a.wg)(),
            (0,
            a.j4)(u, {
                key: 0,
                "is-detail": !!e?.txnRemark,
                onShowDetail: o=>t.onShowTxJobMatchDetail(e),
                "bank-code": e?.bankPartner?.bankCode,
                "account-name": e?.bankPartner?.accountName,
                "account-number": e?.bankPartner?.accountNumber
            }, null, 8, ["is-detail", "onShowDetail", "bank-code", "account-name", "account-number"])) : (0,
            a.kq)("", !0)]), (0,
            a._)("td", O, [e?.status ? ((0,
            a.wg)(),
            (0,
            a.j4)(dt, {
                key: 0,
                status: e?.status
            }, null, 8, ["status"])) : (0,
            a.kq)("", !0)]), (0,
            a._)("td", V, [(0,
            a._)("div", tt, [(0,
            a.Wm)(bt, {
                "staff-list": e?.staffList,
                "finished-by": e.finishedBy,
                "job-type": e.jobType
            }, null, 8, ["staff-list", "finished-by", "job-type"])])]), (0,
            a._)("td", et, [(0,
            a.Wm)(ut, {
                "error-code": e?.errorCode,
                notes: e?.notes,
                hint: e?.errorData?.message
            }, null, 8, ["error-code", "notes", "hint"])])], 2)))), 128)), (0,
            a.wy)((0,
            a._)("tr", ot, [(0,
            a._)("td", at, (0,
            n.zw)(t.t("notFound")), 1)], 512), [[p.F8, !t.loading && !t.hasList]]), (0,
            a.wy)((0,
            a._)("tr", nt, [(0,
            a._)("td", st, [(0,
            a.Wm)(pt, null, {
                default: (0,
                a.w5)((()=>[(0,
                a.Uk)((0,
                n.zw)(t.t("loading")) + " . . .", 1)])),
                _: 1
            })])], 512), [[p.F8, t.loading]])])])], 512)])])
        }
        var rt = o(87380)
          , it = o.n(rt)
          , ct = o(42921)
          , dt = o(88182)
          , bt = o(90714)
          , ut = o(51123);
        const pt = (0,
        a.RC)((()=>o.e(93673).then(o.bind(o, 93673))))
          , mt = (0,
        a.RC)((()=>o.e(56037).then(o.bind(o, 56037))))
          , ht = (0,
        a.RC)((()=>o.e(80030).then(o.bind(o, 80030))))
          , wt = (0,
        a.RC)((()=>o.e(54073).then(o.bind(o, 54073))))
          , xt = (0,
        a.RC)((()=>o.e(25707).then(o.bind(o, 25707))))
          , ft = (0,
        a.RC)((()=>o.e(44803).then(o.bind(o, 44803))))
          , gt = (0,
        a.RC)((()=>o.e(818).then(o.bind(o, 818))))
          , yt = (0,
        a.RC)((()=>Promise.resolve().then(o.bind(o, 11823))))
          , Jt = (0,
        a.RC)((()=>o.e(17679).then(o.bind(o, 17679))))
          , kt = (0,
        a.RC)((()=>o.e(25937).then(o.bind(o, 25937))))
          , Ct = (0,
        a.RC)((()=>o.e(87829).then(o.bind(o, 87829))));
        var _t = (0,
        a.aZ)({
            name: "LatestJobTable",
            components: {
                JobQrCode: Ct,
                CreatedBy: gt,
                LoadingCircle: yt,
                JobChannel: ht,
                JobStatus: mt,
                JobTypePromotion: pt,
                JobDateTime: wt,
                JobBankAccount: xt,
                JobErrorMessage: ft,
                BankLogo: Jt,
                JobUsername: kt
            },
            props: {
                list: {
                    type: Array,
                    default: ()=>[]
                },
                loading: {
                    type: Boolean,
                    default: !1
                },
                checkJobLoading: {
                    type: Boolean,
                    default: !1
                },
                denyJobLoading: {
                    type: Boolean,
                    default: !1
                },
                approveJobLoading: {
                    type: Boolean,
                    default: !1
                }
            },
            emits: ["check-job", "deny-job", "approve-job", "fetch-done-job-list", "show-job-match-detail", "show-qr-code"],
            setup(t, {emit: e}) {
                const o = (0,
                i.iH)(0)
                  , {t: n, locale: s} = (0,
                c.QT)()
                  , l = (0,
                i.iH)(null)
                  , r = (0,
                i.iH)();
                (0,
                ct.MQn)(l, (()=>{
                    e("fetch-done-job-list")
                }
                ), {
                    distance: 100
                });
                const d = (0,
                a.Fl)((()=>t.list?.length > 0))
                  , b = (0,
                a.Fl)((()=>dt.uf))
                  , u = (0,
                a.Fl)((()=>bt.hX))
                  , p = (0,
                a.Fl)((()=>t.list?.map((t=>{
                    const e = (0,
                    i.iH)(t.qrCodeString)
                      , o = (0,
                    ut.y)(e);
                    return {
                        ...t,
                        qrCodeString: o
                    }
                }
                ))))
                  , m = t=>t?.bankPartner?.bankCode === bt.hX.TMN?.toUpperCase()
                  , h = t=>t ? "check" : "pending"
                  , w = t=>{
                    o.value = t,
                    e("check-job", t)
                }
                  , x = t=>{
                    o.value = t,
                    e("deny-job", t)
                }
                  , f = (t,a)=>{
                    a && (o.value = t,
                    e("approve-job", t))
                }
                  , g = t=>{
                    e("show-job-match-detail", t)
                }
                  , y = t=>it()(1e3 * t).format("DD/MM/YYYY")
                  , J = t=>it()(1e3 * t).format("mm:ss")
                  , k = t=>{
                    const e = it().duration(it()(1e3 * t).diff(it()()));
                    return e.humanize(!0)
                }
                  , C = t=>Number(t) ? `${t} ${n("txJob.hour")}` : ""
                  , _ = t=>Number(t) ? `${t} ${n("txJob.minutes")}` : ""
                  , v = t=>Number(t) ? `${t} ${n("txJob.second")}` : ""
                  , D = t=>{
                    t && e("show-qr-code", t)
                }
                  , T = t=>{
                    const e = /s/gm
                      , o = /m/gm
                      , a = /h/gm;
                    if (t) {
                        if (a.test(t)) {
                            const e = t?.split("h")
                              , a = e[1]?.split("m");
                            return o.test(t) ? `${C(e[0])} ${_(a[0])}` : C(e[0])
                        }
                        if (o.test(t)) {
                            const o = t?.split("m")
                              , a = o[1]?.split("s");
                            return e.test(t) ? `${_(o[0])} ${v(a[0])}` : _(o[0])
                        }
                        if (e.test(t)) {
                            const e = t?.split("s");
                            return v(e[0])
                        }
                    }
                    return "-"
                }
                ;
                return {
                    t: n,
                    el: l,
                    newJobList: p,
                    dataList: r,
                    initialsBankCompany: u,
                    currentId: o,
                    locale: s,
                    formatCurrency: b,
                    hasList: d,
                    onShowQrCode: D,
                    getJobDuration: T,
                    getTransferredAt: k,
                    isTmn: m,
                    onCheckJob: w,
                    onDenyJob: x,
                    onApproveJob: f,
                    getApprovedLabel: h,
                    formatTransferredDate: y,
                    formatTransferredTime: J,
                    onShowTxJobMatchDetail: g
                }
            }
        })
          , vt = o(57886);
        const Dt = (0,
        vt.Z)(_t, [["render", lt]]);
        var Tt = Dt
          , jt = o(68178)
          , Mt = o(11823)
          , Lt = o(55689)
          , St = o(1197)
          , zt = (0,
        a.aZ)({
            name: "TxJobDoneContainerTable",
            components: {
                LatestJobTable: Tt,
                TemplateContent: Lt["default"],
                Tooltip: jt["default"],
                LoadingCircle: Mt["default"],
                QrCodeModal: St["default"]
            },
            setup() {
                const {t: t} = (0,
                c.QT)()
                  , e = (0,
                d.oR)()
                  , o = (0,
                i.iH)()
                  , n = (0,
                i.iH)(0)
                  , s = (0,
                i.iH)("");
                (0,
                a.bv)((()=>{
                    const t = {
                        current: n.value,
                        status: "done"
                    };
                    e.dispatch("txJob/getJobList", t)
                }
                ));
                const l = (0,
                a.Fl)((()=>e.getters["wait/is"]("loading.getJobList")))
                  , r = (0,
                a.Fl)((()=>e.getters["wait/is"]("loading.getJobList")))
                  , b = (0,
                a.Fl)((()=>e.state.transfer.isShowQrCodeModal))
                  , p = (0,
                a.Fl)((()=>e.state.txJob.isShowCreateModal))
                  , m = (0,
                a.Fl)((()=>e.state.txJob.isShowDeleteModal))
                  , h = (0,
                a.Fl)((()=>e.state.txJob.txJobDoneList?.length ? u()([...e.state.txJob.txJobDoneList], "id") : []))
                  , w = (0,
                a.Fl)((()=>e.state.txJob.txJobDonePagination))
                  , x = ()=>{
                    w.value?.nextPage && (n.value = Number(w.value?.current))
                }
                  , f = async()=>{
                    const t = {
                        current: 0,
                        status: "done"
                    };
                    await e.dispatch("txJob/getJobList", t)
                }
                  , g = async t=>{
                    e.commit("txJob/setTxJobMatchDetail", t),
                    e.commit("txJob/setShowTxJobMatchDetailModal", !0),
                    8 === t.channel && await e.dispatch("txJob/getJobSlipUrl", t?.id)
                }
                  , y = t=>{
                    s.value = t,
                    e.commit("transfer/setShowQrCodeModal", !0)
                }
                ;
                return (0,
                a.YP)((()=>n.value), (t=>{
                    if (t) {
                        const o = {
                            current: Number(t),
                            status: "done"
                        };
                        e.dispatch("txJob/getJobList", o)
                    }
                }
                )),
                (0,
                a.Ah)((()=>{
                    const t = {
                        list: [],
                        pagination: null
                    };
                    e.commit("txJob/setTxJobDoneList", t)
                }
                )),
                {
                    t: t,
                    qrCodeUrl: s,
                    isShowQrCodeModal: b,
                    pageMeta: w,
                    loadingGetTxJobDoneList: l,
                    loadingRefreshTxJobDoneList: r,
                    deleteDepositItem: o,
                    isShowCreateModal: p,
                    txJobDoneList: h,
                    isShowDeleteModal: m,
                    onShowQrCode: y,
                    onChangePage: x,
                    onReloadJobList: f,
                    onShowTxJobMatchDetail: g
                }
            }
        });
        const Rt = (0,
        vt.Z)(zt, [["render", r]]);
        var qt = Rt
    }
}]);
