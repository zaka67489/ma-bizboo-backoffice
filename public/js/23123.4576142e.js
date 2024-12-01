"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[23123], {
    23123: function(e, t, o) {
        o.r(t),
        o.d(t, {
            default: function() {
                return oe
            }
        });
        var a = o(88412)
          , n = o(51538);
        const l = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[52] m-0 p-0"
        }
          , s = {
            class: "modal-dialog mx-auto my-3 flex justify-center items-center"
        }
          , i = {
            class: "modal-content bg-primary"
        }
          , c = {
            class: "modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0"
        }
          , r = {
            class: "text-center"
        }
          , b = {
            class: "font-medium font-display mr-auto text-2xl mb-5 text-white"
        }
          , m = {
            class: "text-sm"
        }
          , u = {
            class: "flex items-center py-1"
        }
          , d = (0,
        a._)("div", {
            class: "w-24 text-right mr-3"
        }, "Id:", -1)
          , p = {
            class: "flex items-center py-1"
        }
          , k = {
            class: "w-24 text-right mr-3"
        }
          , w = {
            class: "flex items-center py-1"
        }
          , g = {
            class: "w-24 text-right mr-3"
        }
          , x = {
            class: "flex items-center py-1"
        }
          , v = {
            class: "w-24 text-right mr-3"
        }
          , j = {
            class: "flex items-center py-1"
        }
          , y = {
            class: "w-24 text-right mr-3"
        }
          , f = {
            key: 0
        }
          , _ = {
            key: 1,
            class: "flex items-center"
        }
          , C = {
            class: "pl-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , h = {
            key: 1
        }
          , J = {
            key: 1,
            class: "flex items-center"
        }
          , z = {
            class: "p-2 bg-amber-100 rounded"
        }
          , I = {
            class: "ml-2 w-40 block text-left break-words custom__line-clamp-2"
        }
          , B = {
            class: "flex items-center py-1"
        }
          , D = {
            class: "w-24 text-right mr-3"
        }
          , M = {
            class: "flex items-center py-1"
        }
          , T = {
            class: "w-24 text-right mr-3"
        }
          , q = {
            class: "flex items-center pt-1"
        }
          , N = {
            class: "w-24 text-right mr-3"
        }
          , P = {
            class: "flex text-left"
        }
          , R = {
            class: "w-full flex flex-col"
        }
          , F = {
            key: 0,
            class: "flex"
        }
          , U = {
            class: "relative"
        }
          , W = {
            key: 1
        }
          , S = {
            class: "flex justify-center gap-3 mt-5"
        };
        function A(e, t, o, A, X, $) {
            const G = (0,
            a.up)("XIcon")
              , Z = (0,
            a.up)("job-type")
              , L = (0,
            a.up)("job-bank-account")
              , O = (0,
            a.up)("bank-logo")
              , Q = (0,
            a.up)("CreditCardIcon")
              , Y = (0,
            a.up)("job-status")
              , E = (0,
            a.up)("tooltip")
              , H = (0,
            a.up)("JobPromotionDetail")
              , K = (0,
            a.up)("CheckIcon")
              , V = (0,
            a.up)("base-button");
            return e.isShow ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", l, [(0,
            a._)("div", s, [(0,
            a._)("div", i, [(0,
            a._)("div", c, [(0,
            a.Wm)(G, {
                class: "cursor-pointer text-white",
                onClick: e.onClose
            }, null, 8, ["onClick"])]), (0,
            a._)("div", r, [(0,
            a._)("h1", b, (0,
            n.zw)(e.t("txJob.manual.approveJob")), 1), (0,
            a._)("div", {
                class: (0,
                n.C_)(["bg-white rounded-lg p-5 m-5", e.loadingGetJobById ? "blur-sm" : ""])
            }, [(0,
            a._)("div", m, [(0,
            a._)("div", u, [d, (0,
            a._)("div", null, "#" + (0,
            n.zw)(e.job?.id), 1)]), (0,
            a._)("div", p, [(0,
            a._)("div", k, (0,
            n.zw)(e.t("txJob.manual.type")) + ":", 1), (0,
            a._)("div", null, [(0,
            a.Wm)(Z, {
                type: e.job?.jobType
            }, null, 8, ["type"])])]), (0,
            a._)("div", w, [(0,
            a._)("div", g, (0,
            n.zw)(e.t("txJob.manual.amount")) + ":", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.getAmountFormat(e.job?.amount)), 1)]), (0,
            a._)("div", x, [(0,
            a._)("div", v, (0,
            n.zw)(e.t("txJob.manual.username")) + ":", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.job?.username), 1)]), (0,
            a._)("div", j, [(0,
            a._)("div", y, (0,
            n.zw)(e.t("txJob.manual.memberName")) + ":", 1), e.isTmn(e.job) ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", f, [e.job?.fullname && e.job?.phone ? ((0,
            a.wg)(),
            (0,
            a.j4)(L, {
                key: 0,
                "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                "account-name": e.job?.fullname,
                "account-number": e.job?.phone
            }, null, 8, ["bank-code", "account-name", "account-number"])) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", _, [(0,
            a.Wm)(O, {
                "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                "logo-class": "rounded w-7 h-7"
            }, null, 8, ["bank-code"]), (0,
            a._)("span", C, (0,
            n.zw)(e.job?.txnRemark || "-"), 1)]))])) : (0,
            a.kq)("", !0), e.isTmn(e.job) ? (0,
            a.kq)("", !0) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", h, [e.job?.bankMember ? ((0,
            a.wg)(),
            (0,
            a.j4)(L, {
                key: 0,
                "bank-code": e.job?.bankMember?.bankCode,
                "account-name": e.job?.bankMember?.accountName,
                "account-number": e.job?.bankMember?.accountNumber
            }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
            a.kq)("", !0), e.job?.bankMember ? (0,
            a.kq)("", !0) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", J, [(0,
            a._)("div", z, [(0,
            a.Wm)(Q)]), (0,
            a._)("span", I, (0,
            n.zw)(e.job?.txnRemark || "-"), 1)]))]))]), (0,
            a._)("div", B, [(0,
            a._)("div", D, (0,
            n.zw)(e.t("txJob.manual.webAccount")) + ":", 1), e.job?.bankPartner ? ((0,
            a.wg)(),
            (0,
            a.j4)(L, {
                key: 0,
                "bank-code": e.job?.bankPartner?.bankCode,
                "account-name": e.job?.bankPartner?.accountName,
                "account-number": e.job?.bankPartner?.accountNumber
            }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
            a.kq)("", !0)]), (0,
            a._)("div", M, [(0,
            a._)("div", T, (0,
            n.zw)(e.t("txJob.manual.status")) + ":", 1), (0,
            a._)("div", null, [e.job?.status ? ((0,
            a.wg)(),
            (0,
            a.j4)(Y, {
                key: 0,
                status: e.job?.status
            }, null, 8, ["status"])) : (0,
            a.kq)("", !0)])]), (0,
            a._)("div", q, [(0,
            a._)("div", N, (0,
            n.zw)(e.t("txJob.manual.moreInfo")) + ":", 1), (0,
            a._)("div", P, [(0,
            a._)("div", R, [e.job?.errorCode ? ((0,
            a.wg)(),
            (0,
            a.iD)("span", F, [(0,
            a.Uk)((0,
            n.zw)(e.t(`errorCode.${e.job?.errorCode}`)) + " ", 1), (0,
            a._)("div", U, [e.job?.errorData?.message ? ((0,
            a.wg)(),
            (0,
            a.j4)(E, {
                key: 0,
                class: "mr-1 block text-gray-800",
                message: e.job?.errorData?.message,
                positionClass: "right-10 top-0"
            }, null, 8, ["message"])) : (0,
            a.kq)("", !0)])])) : ((0,
            a.wg)(),
            (0,
            a.iD)("span", W, "-"))])])]), e.job?.promotion ? ((0,
            a.wg)(),
            (0,
            a.j4)(H, {
                key: 0,
                title: e.job?.promotion?.label,
                "image-url": e.job?.promotion?.imageUrl,
                content: e.job?.promotion?.detail
            }, null, 8, ["title", "image-url", "content"])) : (0,
            a.kq)("", !0)]), (0,
            a._)("div", S, [(0,
            a.Wm)(V, {
                type: "submit",
                loading: e.loading,
                onClick: e.onSubmit,
                class: "btn btn-primary w-24"
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Wm)(K, {
                    class: "mr-2"
                }), (0,
                a.Uk)(" " + (0,
                n.zw)(e.t("txJob.manual.confirm")), 1)])),
                _: 1
            }, 8, ["loading", "onClick"]), (0,
            a.Wm)(V, {
                onClick: e.onClose,
                class: "btn btn-outline-dark w-16"
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Uk)((0,
                n.zw)(e.t("txJob.manual.close")), 1)])),
                _: 1
            }, 8, ["onClick"])])], 2)])])])])) : (0,
            a.kq)("", !0)
        }
        var X = o(29260)
          , $ = o(81120)
          , G = o(17243)
          , Z = o(88182)
          , L = o(90714);
        const O = (0,
        a.RC)((()=>o.e(1553).then(o.bind(o, 1553))))
          , Q = (0,
        a.RC)((()=>o.e(56037).then(o.bind(o, 56037))))
          , Y = (0,
        a.RC)((()=>Promise.resolve().then(o.bind(o, 68178))))
          , E = (0,
        a.RC)((()=>o.e(25707).then(o.bind(o, 25707))))
          , H = (0,
        a.RC)((()=>o.e(17679).then(o.bind(o, 17679))))
          , K = (0,
        a.RC)((()=>o.e(1968).then(o.bind(o, 1968))));
        var V = (0,
        a.aZ)({
            name: "ConfirmJobModal",
            components: {
                JobBankAccount: E,
                Tooltip: Y,
                BaseButton: G["default"],
                JobType: O,
                JobStatus: Q,
                BankLogo: H,
                JobPromotionDetail: K
            },
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                jobItem: {
                    type: Object,
                    default: ()=>({})
                }
            },
            setup(e) {
                const {t: t} = (0,
                $.QT)()
                  , o = (0,
                X.oR)()
                  , n = (0,
                a.Fl)((()=>L.hX))
                  , l = (0,
                a.Fl)((()=>o.getters["wait/is"]("loading.approveJob")))
                  , s = (0,
                a.Fl)((()=>o.getters["wait/is"]("loading.getJobById")));
                (0,
                a.YP)((()=>e.jobItem?.id), (async e=>{
                    e && await o.dispatch("txJob/getJobById", e)
                }
                ), {
                    immediate: !0
                });
                const i = e=>e?.bankPartner?.bankCode === L.hX.TMN?.toUpperCase()
                  , c = (0,
                a.Fl)((()=>o.state.profile.currency))
                  , r = (0,
                a.Fl)((()=>o.state.txJob.jobItem))
                  , b = e=>Number(e) ? `${(0,
                Z.uf)(r.value?.amount)} ${c.value}` : "0"
                  , m = async()=>{
                    await o.dispatch("txJob/approveJob", r.value?.id)
                }
                  , u = ()=>{
                    o.commit("txJob/setShowConfirmJobModal", !1),
                    o.commit("txJob/setJobItem", null)
                }
                ;
                return {
                    t: t,
                    job: r,
                    loading: l,
                    loadingGetJobById: s,
                    initialsBankCompany: n,
                    isTmn: i,
                    getAmountFormat: b,
                    onClose: u,
                    onSubmit: m
                }
            }
        })
          , ee = o(57886);
        const te = (0,
        ee.Z)(V, [["render", A]]);
        var oe = te
    }
}]);
