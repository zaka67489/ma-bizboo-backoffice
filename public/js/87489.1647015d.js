"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[87489], {
    87489: function(t, o, e) {
        e.r(o),
        e.d(o, {
            default: function() {
                return I
            }
        });
        var l = e(88412)
          , a = e(51538);
        const n = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[99] m-0 p-0"
        }
          , s = {
            class: "modal-dialog mx-auto my-3 flex justify-center items-center modal-md"
        }
          , c = {
            class: "modal-content bg-primary"
        }
          , i = {
            class: "modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0"
        }
          , r = {
            class: "text-center"
        }
          , d = {
            class: "font-medium font-display mr-auto text-2xl mb-5 text-white"
        }
          , m = {
            class: "bg-white rounded-lg p-5 m-5"
        }
          , p = {
            class: "flex flex-col items-center mb-3"
        }
          , u = (0,
        l._)("span", {
            class: "block text-xs text-gray-500"
        }, "Ref", -1)
          , f = {
            class: "block font-semibold text-lg"
        }
          , b = {
            class: "flex justify-center gap-3 mt-5"
        };
        function x(t, o, e, x, k, w) {
            const h = (0,
            l.up)("XIcon")
              , g = (0,
            l.up)("text-group-input")
              , _ = (0,
            l.up)("checkIcon")
              , y = (0,
            l.up)("base-button");
            return t.isShow ? ((0,
            l.wg)(),
            (0,
            l.iD)("div", n, [(0,
            l._)("div", s, [(0,
            l._)("div", c, [(0,
            l._)("div", i, [(0,
            l.Wm)(h, {
                class: "cursor-pointer text-white",
                onClick: t.onClose
            }, null, 8, ["onClick"])]), (0,
            l._)("div", r, [(0,
            l._)("h1", d, (0,
            a.zw)(t.t("job.confirmOtp")), 1), (0,
            l._)("div", m, [(0,
            l._)("div", null, [(0,
            l._)("div", p, [u, (0,
            l._)("span", f, (0,
            a.zw)(t.jobItem.otpRef), 1)]), (0,
            l.Wm)(g, {
                "margin-button": !1,
                class: "text-center",
                modelValue: t.formData.otp,
                "onUpdate:modelValue": o[0] || (o[0] = o=>t.formData.otp = o),
                type: "text",
                name: "otp",
                placeholder: t.t("job.otp")
            }, null, 8, ["modelValue", "placeholder"])]), (0,
            l._)("div", b, [(0,
            l.Wm)(y, {
                loading: t.loading,
                onClick: t.onConfirm,
                class: "btn btn-primary min-w-max"
            }, {
                default: (0,
                l.w5)((()=>[(0,
                l.Wm)(_, {
                    class: "mr-1"
                }), (0,
                l.Uk)(" " + (0,
                a.zw)(t.t("confirm")), 1)])),
                _: 1
            }, 8, ["loading", "onClick"]), (0,
            l.Wm)(y, {
                onClick: t.onClose,
                class: "btn btn-outline-dark min-w-max"
            }, {
                default: (0,
                l.w5)((()=>[(0,
                l.Uk)((0,
                a.zw)(t.t("cancel")), 1)])),
                _: 1
            }, 8, ["onClick"])])])])])])])) : (0,
            l.kq)("", !0)
        }
        var k = e(27219)
          , w = e(29260)
          , h = e(81120)
          , g = e(37325)
          , _ = e(17243)
          , y = e(11579)
          , C = (0,
        l.aZ)({
            name: "ConfirmOtpModal",
            components: {
                BaseButton: _["default"],
                TextGroupInput: y["default"]
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
            setup(t) {
                const {t: o} = (0,
                h.QT)()
                  , e = (0,
                w.oR)()
                  , a = (0,
                l.Fl)((()=>e.getters["wait/is"]("loading.confirmOtpBcel")))
                  , n = (0,
                g.qj)({
                    otp: "",
                    schema: k.Ry().shape({
                        otp: k.Z_().required()
                    })
                })
                  , s = ()=>{
                    e.commit("txJob/setShowConfirmOtpModal", !1)
                }
                  , c = ()=>{
                    const o = {
                        otp: "",
                        ref: "",
                        jobId: t.jobItem?.id
                    };
                    e.dispatch("txJob/confirmOtpBcel", o)
                }
                ;
                return {
                    t: o,
                    loading: a,
                    formData: n,
                    onClose: s,
                    onConfirm: c
                }
            }
        })
          , v = e(57886);
        const j = (0,
        v.Z)(C, [["render", x]]);
        var I = j
    }
}]);
