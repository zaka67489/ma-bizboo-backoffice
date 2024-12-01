"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[25182], {
    25182: function(e, t, a) {
        a.r(t),
        a.d(t, {
            default: function() {
                return be
            }
        });
        var o = a(88412)
          , n = a(51538)
          , s = a(89796);
        const l = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[52] m-0 p-0"
        }
          , i = {
            class: "modal-dialog mx-auto my-3 flex justify-center items-center"
        }
          , c = {
            class: "modal-content bg-primary"
        }
          , r = {
            class: "modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0"
        }
          , m = {
            class: "text-center"
        }
          , u = {
            class: "font-medium font-display mr-auto text-2xl mb-5 text-white"
        }
          , b = {
            class: "text-sm"
        }
          , d = {
            class: "bg-orange-100 p-2 rounded"
        }
          , p = {
            class: "flex items-center py-1"
        }
          , k = (0,
        o._)("div", {
            class: "w-24 text-right mr-3"
        }, "Id:", -1)
          , w = {
            class: "flex items-center py-1"
        }
          , g = {
            class: "w-24 text-right mr-3"
        }
          , f = {
            class: "flex items-center py-1"
        }
          , x = {
            class: "w-24 text-right mr-3"
        }
          , j = {
            class: "flex items-center py-1"
        }
          , v = {
            class: "w-24 text-right mr-3"
        }
          , y = {
            class: "flex items-center py-1"
        }
          , _ = {
            class: "w-24 text-right mr-3"
        }
          , h = {
            key: 0
        }
          , C = {
            key: 1,
            class: "flex items-center"
        }
          , J = {
            class: "pl-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , z = {
            key: 1
        }
          , D = {
            key: 1,
            class: "flex items-center"
        }
          , S = {
            class: "p-2 bg-amber-100 rounded"
        }
          , I = {
            class: "ml-2 w-40 block text-left break-words custom__line-clamp-2"
        }
          , M = {
            class: "flex items-center py-1"
        }
          , T = {
            class: "w-24 text-right mr-3"
        }
          , B = {
            class: "flex items-center py-1"
        }
          , W = {
            class: "w-24 text-right mr-3"
        }
          , q = {
            class: "flex items-center pt-1"
        }
          , P = {
            class: "w-24 text-right mr-3"
        }
          , R = {
            class: "flex text-left"
        }
          , F = {
            class: "w-full flex flex-col"
        }
          , N = {
            key: 0,
            class: "flex"
        }
          , U = {
            class: "relative"
        }
          , A = {
            key: 1
        }
          , V = {
            class: "form-label flex items-center capitalize"
        }
          , O = (0,
        o._)("i", {
            class: "text-danger"
        }, "* ", -1)
          , G = {
            class: "input-group"
        }
          , X = ["placeholder"]
          , Z = {
            class: "flex justify-center gap-3 mt-5"
        };
        function $(e, t, a, $, Y, E) {
            const H = (0,
            o.up)("XIcon")
              , L = (0,
            o.up)("job-type")
              , Q = (0,
            o.up)("job-bank-account")
              , K = (0,
            o.up)("bank-logo")
              , ee = (0,
            o.up)("CreditCardIcon")
              , te = (0,
            o.up)("job-status")
              , ae = (0,
            o.up)("tooltip")
              , oe = (0,
            o.up)("JobPromotionDetail")
              , ne = (0,
            o.up)("Field")
              , se = (0,
            o.up)("CheckIcon")
              , le = (0,
            o.up)("base-button")
              , ie = (0,
            o.up)("vee-form");
            return e.isShow ? ((0,
            o.wg)(),
            (0,
            o.iD)("div", l, [(0,
            o._)("div", i, [(0,
            o._)("div", c, [(0,
            o._)("div", r, [(0,
            o.Wm)(H, {
                class: "cursor-pointer text-white",
                onClick: e.onClose
            }, null, 8, ["onClick"])]), (0,
            o._)("div", m, [(0,
            o._)("h1", u, (0,
            n.zw)(e.t("txJob.manual.adjustItemStatus")), 1), (0,
            o._)("div", {
                class: (0,
                n.C_)(["bg-white rounded-lg p-5 m-5", e.loadingGetJobById ? "blur-sm" : ""])
            }, [(0,
            o.Wm)(ie, {
                class: "p-5",
                "validation-schema": e.formData.schema,
                onSubmit: e.onSubmit
            }, {
                default: (0,
                o.w5)((()=>[(0,
                o._)("div", b, [(0,
                o._)("div", d, (0,
                n.zw)(e.getSuccessStatusInfo(e.job?.jobType)), 1), (0,
                o._)("div", p, [k, (0,
                o._)("div", null, "#" + (0,
                n.zw)(e.job?.id), 1)]), (0,
                o._)("div", w, [(0,
                o._)("div", g, (0,
                n.zw)(e.t("txJob.manual.type")) + ":", 1), (0,
                o._)("div", null, [(0,
                o.Wm)(L, {
                    type: e.job?.jobType
                }, null, 8, ["type"])])]), (0,
                o._)("div", f, [(0,
                o._)("div", x, (0,
                n.zw)(e.t("txJob.manual.amount")) + ":", 1), (0,
                o._)("div", null, (0,
                n.zw)(e.getAmountFormat(e.job?.amount)), 1)]), (0,
                o._)("div", j, [(0,
                o._)("div", v, (0,
                n.zw)(e.t("txJob.manual.username")) + ":", 1), (0,
                o._)("div", null, (0,
                n.zw)(e.job?.username), 1)]), (0,
                o._)("div", y, [(0,
                o._)("div", _, (0,
                n.zw)(e.t("txJob.manual.memberName")) + ":", 1), e.isTmn(e.job) ? ((0,
                o.wg)(),
                (0,
                o.iD)("div", h, [e.job?.fullname && e.job?.phone ? ((0,
                o.wg)(),
                (0,
                o.j4)(Q, {
                    key: 0,
                    "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                    "account-name": e.job?.fullname,
                    "account-number": e.job?.phone
                }, null, 8, ["bank-code", "account-name", "account-number"])) : ((0,
                o.wg)(),
                (0,
                o.iD)("div", C, [(0,
                o.Wm)(K, {
                    "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                    "logo-class": "rounded w-7 h-7"
                }, null, 8, ["bank-code"]), (0,
                o._)("span", J, (0,
                n.zw)(e.job?.txnRemark || "-"), 1)]))])) : (0,
                o.kq)("", !0), e.isTmn(e.job) ? (0,
                o.kq)("", !0) : ((0,
                o.wg)(),
                (0,
                o.iD)("div", z, [e.job?.bankMember ? ((0,
                o.wg)(),
                (0,
                o.j4)(Q, {
                    key: 0,
                    "bank-code": e.job?.bankMember?.bankCode,
                    "account-name": e.job?.bankMember?.accountName,
                    "account-number": e.job?.bankMember?.accountNumber
                }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
                o.kq)("", !0), e.job?.bankMember ? (0,
                o.kq)("", !0) : ((0,
                o.wg)(),
                (0,
                o.iD)("div", D, [(0,
                o._)("div", S, [(0,
                o.Wm)(ee)]), (0,
                o._)("span", I, (0,
                n.zw)(e.job?.txnRemark || "-"), 1)]))]))]), (0,
                o._)("div", M, [(0,
                o._)("div", T, (0,
                n.zw)(e.t("txJob.manual.webAccount")) + ":", 1), e.job?.bankPartner ? ((0,
                o.wg)(),
                (0,
                o.j4)(Q, {
                    key: 0,
                    "bank-code": e.job?.bankPartner?.bankCode,
                    "account-name": e.job?.bankPartner?.accountName,
                    "account-number": e.job?.bankPartner?.accountNumber
                }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
                o.kq)("", !0)]), (0,
                o._)("div", B, [(0,
                o._)("div", W, (0,
                n.zw)(e.t("txJob.manual.status")) + ":", 1), (0,
                o._)("div", null, [e.job?.status ? ((0,
                o.wg)(),
                (0,
                o.j4)(te, {
                    key: 0,
                    status: e.job?.status
                }, null, 8, ["status"])) : (0,
                o.kq)("", !0)])]), (0,
                o._)("div", q, [(0,
                o._)("div", P, (0,
                n.zw)(e.t("txJob.manual.moreInfo")) + ":", 1), (0,
                o._)("div", R, [(0,
                o._)("div", F, [e.job?.errorCode ? ((0,
                o.wg)(),
                (0,
                o.iD)("span", N, [(0,
                o.Uk)((0,
                n.zw)(e.t(`errorCode.${e.job?.errorCode}`)) + " ", 1), (0,
                o._)("div", U, [e.job?.errorData?.message ? ((0,
                o.wg)(),
                (0,
                o.j4)(ae, {
                    key: 0,
                    class: "mr-1 block text-gray-800",
                    message: e.job?.errorData?.message,
                    positionClass: "right-10 top-0"
                }, null, 8, ["message"])) : (0,
                o.kq)("", !0)])])) : ((0,
                o.wg)(),
                (0,
                o.iD)("span", A, "-"))])])]), e.job?.promotion ? ((0,
                o.wg)(),
                (0,
                o.j4)(oe, {
                    key: 0,
                    class: "pb-4 border-b-2 border-dashed mb-4",
                    title: e.job?.promotion?.label,
                    "image-url": e.job?.promotion?.imageUrl,
                    content: e.job?.promotion?.detail
                }, null, 8, ["title", "image-url", "content"])) : (0,
                o.kq)("", !0), (0,
                o.Wm)(ne, {
                    name: "notes",
                    modelValue: e.formData.notes,
                    "onUpdate:modelValue": t[1] || (t[1] = t=>e.formData.notes = t)
                }, {
                    default: (0,
                    o.w5)((({errorMessage: a, field: l})=>[(0,
                    o._)("label", V, [(0,
                    o._)("span", null, [O, (0,
                    o.Uk)(" " + (0,
                    n.zw)(e.t("notes")), 1)])]), (0,
                    o._)("div", G, [(0,
                    o.wy)((0,
                    o._)("textarea", (0,
                    o.dG)({
                        class: "w-full rounded"
                    }, l, {
                        class: a ? "border-danger" : "border-gray-300",
                        placeholder: e.t("txJob.manual.notes"),
                        "onUpdate:modelValue": t[0] || (t[0] = t=>e.formData.notes = t)
                    }), null, 16, X), [[s.nr, e.formData.notes]])])])),
                    _: 1
                }, 8, ["modelValue"])]), (0,
                o._)("div", Z, [(0,
                o.Wm)(le, {
                    loading: e.loading,
                    type: "submit",
                    class: "btn btn-primary w-20"
                }, {
                    default: (0,
                    o.w5)((()=>[(0,
                    o.Wm)(se, {
                        class: "mr-2"
                    }), (0,
                    o.Uk)(" " + (0,
                    n.zw)(e.t("txJob.manual.confirm")), 1)])),
                    _: 1
                }, 8, ["loading"]), (0,
                o.Wm)(le, {
                    onClick: e.onClose,
                    class: "btn btn-outline-dark w-16"
                }, {
                    default: (0,
                    o.w5)((()=>[(0,
                    o.Uk)((0,
                    n.zw)(e.t("txJob.manual.close")), 1)])),
                    _: 1
                }, 8, ["onClick"])])])),
                _: 1
            }, 8, ["validation-schema", "onSubmit"])], 2)])])])])) : (0,
            o.kq)("", !0)
        }
        var Y = a(37325)
          , E = a(27219)
          , H = a(29260)
          , L = a(81120)
          , Q = a(72836)
          , K = a(87873)
          , ee = a(17243)
          , te = a(88182)
          , ae = a(90714);
        const oe = (0,
        o.RC)((()=>a.e(1553).then(a.bind(a, 1553))))
          , ne = (0,
        o.RC)((()=>a.e(56037).then(a.bind(a, 56037))))
          , se = (0,
        o.RC)((()=>Promise.resolve().then(a.bind(a, 68178))))
          , le = (0,
        o.RC)((()=>a.e(25707).then(a.bind(a, 25707))))
          , ie = (0,
        o.RC)((()=>a.e(17679).then(a.bind(a, 17679))))
          , ce = (0,
        o.RC)((()=>a.e(1968).then(a.bind(a, 1968))));
        var re = (0,
        o.aZ)({
            name: "ManualJobSuccessModal",
            components: {
                Field: Q.gN,
                VeeForm: Q.l0,
                Tooltip: se,
                BaseButton: ee["default"],
                JobType: oe,
                JobStatus: ne,
                JobBankAccount: le,
                BankLogo: ie,
                JobPromotionDetail: ce
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
                L.QT)()
                  , a = (0,
                H.oR)()
                  , n = (0,
                Y.qj)({
                    notes: "",
                    schema: E.Ry().shape({
                        notes: E.Z_().required()
                    })
                })
                  , s = (0,
                o.Fl)((()=>a.getters["wait/is"]("loading.manualJobSuccess")))
                  , l = (0,
                o.Fl)((()=>a.getters["wait/is"]("loading.getJobById")));
                (0,
                o.YP)((()=>e.jobItem?.id), (async e=>{
                    e && await a.dispatch("txJob/getJobById", e)
                }
                ), {
                    immediate: !0
                });
                const i = (0,
                o.Fl)((()=>ae.hX))
                  , c = (0,
                o.Fl)((()=>a.state.txJob.jobItem))
                  , r = e=>e?.bankPartner?.bankCode === ae.hX.TMN?.toUpperCase()
                  , m = (0,
                o.Fl)((()=>a.state.profile.currency))
                  , u = e=>Number(e) ? `${(0,
                te.uf)(c.value?.amount)} ${m.value}` : "0"
                  , b = e=>e === K.O4.DEPOSIT ? t("txJob.manual.tooltipAdjustDepositSuccess") : e === K.O4.WITHDRAW ? t("txJob.manual.tooltipAdjustWithdrawSuccess") : ""
                  , d = async()=>{
                    const e = {
                        id: c.value?.id,
                        notes: n.notes
                    };
                    await a.dispatch("txJob/manualJobSuccess", e)
                }
                  , p = ()=>{
                    a.commit("txJob/setShowManualJobSuccessModal", !1)
                }
                ;
                return (0,
                o.YP)((()=>c.value), (e=>{
                    e && (n.notes = e?.notes)
                }
                ), {
                    immediate: !0
                }),
                {
                    t: t,
                    job: c,
                    loadingGetJobById: l,
                    initialsBankCompany: i,
                    loading: s,
                    formData: n,
                    isTmn: r,
                    getSuccessStatusInfo: b,
                    getAmountFormat: u,
                    onClose: p,
                    onSubmit: d
                }
            }
        })
          , me = a(57886);
        const ue = (0,
        me.Z)(re, [["render", $]]);
        var be = ue
    }
}]);
