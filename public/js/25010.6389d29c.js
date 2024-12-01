"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[25010], {
    25010: function(e, t, a) {
        a.r(t),
        a.d(t, {
            default: function() {
                return me
            }
        });
        var o = a(88412)
          , n = a(51538)
          , l = a(89796);
        const s = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[52] m-0 p-0"
        }
          , i = {
            class: "modal-dialog mx-auto my-3 flex justify-center items-center"
        }
          , r = {
            class: "modal-content bg-primary"
        }
          , c = {
            class: "modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0"
        }
          , m = {
            class: "text-center"
        }
          , b = {
            class: "font-medium font-display mr-auto text-2xl mb-5 text-white"
        }
          , d = {
            class: "text-sm"
        }
          , u = {
            class: "flex items-center py-1"
        }
          , p = (0,
        o._)("div", {
            class: "w-24 text-right mr-3"
        }, "Id:", -1)
          , k = {
            class: "flex items-center py-1"
        }
          , w = {
            class: "w-24 text-right mr-3"
        }
          , g = {
            class: "flex items-center py-1"
        }
          , f = {
            class: "w-24 text-right mr-3"
        }
          , x = {
            class: "flex items-center py-1"
        }
          , y = {
            class: "w-24 text-right mr-3"
        }
          , j = {
            class: "flex items-center py-1"
        }
          , v = {
            class: "w-24 text-right mr-3"
        }
          , _ = {
            key: 0
        }
          , h = {
            key: 1,
            class: "flex items-center"
        }
          , C = {
            class: "pl-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , J = {
            key: 1
        }
          , z = {
            key: 1,
            class: "flex items-center"
        }
          , D = {
            class: "p-2 bg-amber-100 rounded"
        }
          , B = {
            class: "ml-2 w-40 block text-left break-words custom__line-clamp-2"
        }
          , I = {
            class: "flex items-center py-1"
        }
          , R = {
            class: "w-24 text-right mr-3"
        }
          , q = {
            class: "flex items-center py-1"
        }
          , M = {
            class: "w-24 text-right mr-3"
        }
          , F = {
            class: "flex items-center pt-1"
        }
          , N = {
            class: "w-24 text-right mr-3"
        }
          , P = {
            class: "flex text-left"
        }
          , T = {
            class: "w-full flex flex-col"
        }
          , U = {
            key: 0,
            class: "flex"
        }
          , W = {
            class: "relative"
        }
          , S = {
            key: 1
        }
          , V = {
            class: "form-label flex items-center capitalize"
        }
          , A = (0,
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
        function $(e, t, a, $, Y, L) {
            const O = (0,
            o.up)("XIcon")
              , Q = (0,
            o.up)("job-type")
              , E = (0,
            o.up)("job-bank-account")
              , H = (0,
            o.up)("bank-logo")
              , K = (0,
            o.up)("CreditCardIcon")
              , ee = (0,
            o.up)("job-status")
              , te = (0,
            o.up)("tooltip")
              , ae = (0,
            o.up)("JobPromotionDetail")
              , oe = (0,
            o.up)("Field")
              , ne = (0,
            o.up)("CheckIcon")
              , le = (0,
            o.up)("base-button")
              , se = (0,
            o.up)("vee-form");
            return e.isShow ? ((0,
            o.wg)(),
            (0,
            o.iD)("div", s, [(0,
            o._)("div", i, [(0,
            o._)("div", r, [(0,
            o._)("div", c, [(0,
            o.Wm)(O, {
                class: "cursor-pointer text-white",
                onClick: e.onClose
            }, null, 8, ["onClick"])]), (0,
            o._)("div", m, [(0,
            o._)("h1", b, (0,
            n.zw)(e.t("txJob.manual.rejectJob")), 1), (0,
            o._)("div", {
                class: (0,
                n.C_)(["bg-white rounded-lg p-5 m-5", e.loadingGetJobById ? "blur-sm" : ""])
            }, [(0,
            o.Wm)(se, {
                "validation-schema": e.formData.schema,
                onSubmit: e.onSubmit
            }, {
                default: (0,
                o.w5)((()=>[(0,
                o._)("div", d, [(0,
                o._)("div", u, [p, (0,
                o._)("div", null, "#" + (0,
                n.zw)(e.job?.id), 1)]), (0,
                o._)("div", k, [(0,
                o._)("div", w, (0,
                n.zw)(e.t("txJob.manual.type")) + ":", 1), (0,
                o._)("div", null, [(0,
                o.Wm)(Q, {
                    type: e.job?.jobType
                }, null, 8, ["type"])])]), (0,
                o._)("div", g, [(0,
                o._)("div", f, (0,
                n.zw)(e.t("txJob.manual.amount")) + ":", 1), (0,
                o._)("div", null, (0,
                n.zw)(e.getAmountFormat(e.job?.amount)), 1)]), (0,
                o._)("div", x, [(0,
                o._)("div", y, (0,
                n.zw)(e.t("txJob.manual.username")) + ":", 1), (0,
                o._)("div", null, (0,
                n.zw)(e.job?.username), 1)]), (0,
                o._)("div", j, [(0,
                o._)("div", v, (0,
                n.zw)(e.t("txJob.manual.memberName")) + ":", 1), e.isTmn(e.job) ? ((0,
                o.wg)(),
                (0,
                o.iD)("div", _, [e.job?.fullname && e.job?.phone ? ((0,
                o.wg)(),
                (0,
                o.j4)(E, {
                    key: 0,
                    "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                    "account-name": e.job?.fullname,
                    "account-number": e.job?.phone
                }, null, 8, ["bank-code", "account-name", "account-number"])) : ((0,
                o.wg)(),
                (0,
                o.iD)("div", h, [(0,
                o.Wm)(H, {
                    "bank-code": e.initialsBankCompany.TMN?.toUpperCase(),
                    "logo-class": "rounded w-7 h-7"
                }, null, 8, ["bank-code"]), (0,
                o._)("span", C, (0,
                n.zw)(e.job?.txnRemark || "-"), 1)]))])) : (0,
                o.kq)("", !0), e.isTmn(e.job) ? (0,
                o.kq)("", !0) : ((0,
                o.wg)(),
                (0,
                o.iD)("div", J, [e.job?.bankMember ? ((0,
                o.wg)(),
                (0,
                o.j4)(E, {
                    key: 0,
                    "bank-code": e.job?.bankMember?.bankCode,
                    "account-name": e.job?.bankMember?.accountName,
                    "account-number": e.job?.bankMember?.accountNumber
                }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
                o.kq)("", !0), e.job?.bankMember ? (0,
                o.kq)("", !0) : ((0,
                o.wg)(),
                (0,
                o.iD)("div", z, [(0,
                o._)("div", D, [(0,
                o.Wm)(K)]), (0,
                o._)("span", B, (0,
                n.zw)(e.job?.txnRemark || "-"), 1)]))]))]), (0,
                o._)("div", I, [(0,
                o._)("div", R, (0,
                n.zw)(e.t("txJob.manual.webAccount")) + ":", 1), e.job?.bankPartner ? ((0,
                o.wg)(),
                (0,
                o.j4)(E, {
                    key: 0,
                    "bank-code": e.job?.bankPartner?.bankCode,
                    "account-name": e.job?.bankPartner?.accountName,
                    "account-number": e.job?.bankPartner?.accountNumber
                }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
                o.kq)("", !0)]), (0,
                o._)("div", q, [(0,
                o._)("div", M, (0,
                n.zw)(e.t("txJob.manual.status")) + ":", 1), (0,
                o._)("div", null, [e.job?.status ? ((0,
                o.wg)(),
                (0,
                o.j4)(ee, {
                    key: 0,
                    status: e.job?.status
                }, null, 8, ["status"])) : (0,
                o.kq)("", !0)])]), (0,
                o._)("div", F, [(0,
                o._)("div", N, (0,
                n.zw)(e.t("txJob.manual.moreInfo")) + ":", 1), (0,
                o._)("div", P, [(0,
                o._)("div", T, [e.job?.errorCode ? ((0,
                o.wg)(),
                (0,
                o.iD)("span", U, [(0,
                o.Uk)((0,
                n.zw)(e.t(`errorCode.${e.job?.errorCode}`)) + " ", 1), (0,
                o._)("div", W, [e.job?.errorData?.message ? ((0,
                o.wg)(),
                (0,
                o.j4)(te, {
                    key: 0,
                    class: "mr-1 block text-gray-800",
                    message: e.job?.errorData?.message,
                    positionClass: "right-10 top-0"
                }, null, 8, ["message"])) : (0,
                o.kq)("", !0)])])) : ((0,
                o.wg)(),
                (0,
                o.iD)("span", S, "-"))])])]), e.job?.promotion ? ((0,
                o.wg)(),
                (0,
                o.j4)(ae, {
                    key: 0,
                    class: "pb-4 border-b-2 border-dashed mb-4",
                    title: e.job?.promotion?.label,
                    "image-url": e.job?.promotion?.imageUrl,
                    content: e.job?.promotion?.detail
                }, null, 8, ["title", "image-url", "content"])) : (0,
                o.kq)("", !0), (0,
                o.Wm)(oe, {
                    name: "notes",
                    modelValue: e.formData.notes,
                    "onUpdate:modelValue": t[1] || (t[1] = t=>e.formData.notes = t)
                }, {
                    default: (0,
                    o.w5)((({errorMessage: a, field: s})=>[(0,
                    o._)("label", V, [(0,
                    o._)("span", null, [A, (0,
                    o.Uk)(" " + (0,
                    n.zw)(e.t("notes")), 1)])]), (0,
                    o._)("div", G, [(0,
                    o.wy)((0,
                    o._)("textarea", (0,
                    o.dG)({
                        class: "w-full rounded"
                    }, s, {
                        class: a ? "border-danger" : "border-gray-300",
                        placeholder: e.t("txJob.manual.notes"),
                        "onUpdate:modelValue": t[0] || (t[0] = t=>e.formData.notes = t)
                    }), null, 16, X), [[l.nr, e.formData.notes]])])])),
                    _: 1
                }, 8, ["modelValue"])]), (0,
                o._)("div", Z, [(0,
                o.Wm)(le, {
                    loading: e.loading,
                    type: "submit",
                    class: "btn btn-primary w-24"
                }, {
                    default: (0,
                    o.w5)((()=>[(0,
                    o.Wm)(ne, {
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
          , L = a(27219)
          , O = a(29260)
          , Q = a(81120)
          , E = a(72836)
          , H = a(88182)
          , K = a(90714)
          , ee = a(17243);
        const te = (0,
        o.RC)((()=>a.e(1553).then(a.bind(a, 1553))))
          , ae = (0,
        o.RC)((()=>a.e(56037).then(a.bind(a, 56037))))
          , oe = (0,
        o.RC)((()=>Promise.resolve().then(a.bind(a, 68178))))
          , ne = (0,
        o.RC)((()=>a.e(25707).then(a.bind(a, 25707))))
          , le = (0,
        o.RC)((()=>a.e(17679).then(a.bind(a, 17679))))
          , se = (0,
        o.RC)((()=>a.e(1968).then(a.bind(a, 1968))));
        var ie = (0,
        o.aZ)({
            name: "RejectJobModal",
            components: {
                Field: E.gN,
                VeeForm: E.l0,
                Tooltip: oe,
                BaseButton: ee["default"],
                JobType: te,
                JobStatus: ae,
                JobBankAccount: ne,
                BankLogo: le,
                JobPromotionDetail: se
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
                Q.QT)()
                  , a = (0,
                O.oR)()
                  , n = (0,
                Y.qj)({
                    notes: "",
                    schema: L.Ry().shape({
                        notes: L.Z_().required()
                    })
                })
                  , l = (0,
                o.Fl)((()=>a.getters["wait/is"]("loading.denyJob")))
                  , s = (0,
                o.Fl)((()=>a.getters["wait/is"]("loading.getJobById")));
                (0,
                o.YP)((()=>e.jobItem?.id), (async e=>{
                    e && await a.dispatch("txJob/getJobById", e)
                }
                ), {
                    immediate: !0
                });
                const i = (0,
                o.Fl)((()=>K.hX))
                  , r = (0,
                o.Fl)((()=>a.state.txJob.jobItem))
                  , c = e=>e?.bankPartner?.bankCode === K.hX.TMN?.toUpperCase()
                  , m = (0,
                o.Fl)((()=>a.state.profile.currency))
                  , b = e=>Number(e) ? `${(0,
                H.uf)(r.value?.amount)} ${m.value}` : "0"
                  , d = async()=>{
                    const e = {
                        id: r.value?.id,
                        notes: n.notes
                    };
                    await a.dispatch("txJob/denyJob", e)
                }
                  , u = ()=>{
                    a.commit("txJob/setShowRejectJobModal", !1)
                }
                ;
                return (0,
                o.YP)((()=>r.value), (e=>{
                    e && (n.notes = e?.notes)
                }
                ), {
                    immediate: !0
                }),
                {
                    t: t,
                    job: r,
                    loadingGetJobById: s,
                    initialsBankCompany: i,
                    loading: l,
                    formData: n,
                    isTmn: c,
                    getAmountFormat: b,
                    onClose: u,
                    onSubmit: d
                }
            }
        })
          , re = a(57886);
        const ce = (0,
        re.Z)(ie, [["render", $]]);
        var me = ce
    }
}]);
