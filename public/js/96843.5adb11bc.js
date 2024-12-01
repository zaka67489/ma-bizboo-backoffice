(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[96843, 59215, 55689, 33974, 89271], {
    12867: function(e, t, o) {
        "use strict";
        o.d(t, {
            O: function() {
                return l
            },
            f: function() {
                return n
            }
        });
        var a = o(90714);
        function n(e) {
            switch (e) {
            case a.hX.KK.toUpperCase():
                return "###-######-#####";
            case a.hX.BAAC.toUpperCase():
                return "###-######-###";
            case a.hX.GSB.toUpperCase():
                return "###-######-######";
            case a.hX.TISCO.toUpperCase():
                return "###-######-#####";
            case a.hX.BCEL.toUpperCase():
                return "###-######-######-######-#";
            default:
                return "###-######-#"
            }
        }
        function s(e, t, o, a, n) {
            return o || a || n ? a || n ? a ? n ? `${t}-${o}-${a}-${n}` : `${t}-${o}-${a}` : `${t}-${o}-${n}` : `${t}-${o}` : e
        }
        function l(e) {
            const t = /(\d{3})(\d{1})?(\d{5})?(\d{1,6})?/gs;
            return e ? e.replace(t, s) : ""
        }
    },
    82016: function(e, t, o) {
        var a = o(20282)
          , n = o(11685);
        function s(e, t) {
            return e && e.length ? n(e, a(t, 2)) : []
        }
        e.exports = s
    },
    55689: function(e, t, o) {
        "use strict";
        o.r(t),
        o.d(t, {
            default: function() {
                return b
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
        function d(e, t, o, d, u, m) {
            return (0,
            a.wg)(),
            (0,
            a.iD)("div", n, [(0,
            a._)("div", s, [(0,
            a._)("div", l, [(0,
            a._)("div", r, [(0,
            a._)("h2", i, [(0,
            a.WI)(e.$slots, "header-title")]), (0,
            a._)("div", c, [(0,
            a.WI)(e.$slots, "header-action")])]), (0,
            a.WI)(e.$slots, "page-content")])])])
        }
        var u = (0,
        a.aZ)({
            name: "TemplateContent"
        })
          , m = o(57886);
        const p = (0,
        m.Z)(u, [["render", d]]);
        var b = p
    },
    59215: function(e, t, o) {
        "use strict";
        o.r(t),
        o.d(t, {
            default: function() {
                return m
            }
        });
        var a = o(88412)
          , n = o(51538);
        const s = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[60] m-0 p-0"
        }
          , l = {
            class: "modal-content"
        }
          , r = {
            class: "font-medium font-display mr-auto text-lg"
        };
        function i(e, t, o, i, c, d) {
            const u = (0,
            a.up)("XIcon");
            return e.isShow ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", s, [(0,
            a._)("div", {
                class: (0,
                n.C_)([e.modalClass, "modal-dialog mx-auto my-3 flex justify-center items-center"])
            }, [(0,
            a._)("div", l, [(0,
            a._)("div", {
                class: (0,
                n.C_)([e.headerClass, "modal-header flex justify-between sticky top-0 rounded-t-md z-50"])
            }, [(0,
            a._)("h2", r, (0,
            n.zw)(e.title), 1), (0,
            a.Wm)(u, {
                class: "cursor-pointer",
                onClick: e.onClose
            }, null, 8, ["onClick"])], 2), (0,
            a.WI)(e.$slots, "default")])], 2)])) : (0,
            a.kq)("", !0)
        }
        var c = (0,
        a.aZ)({
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                title: {
                    type: String,
                    default: ""
                },
                modalClass: {
                    type: String,
                    default: "w-11/12 sm:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 3xl:min-w-max 3xl:max-w-min"
                },
                headerClass: {
                    type: String,
                    default: "bg-secondary"
                }
            },
            setup(e, {emit: t}) {
                const o = ()=>{
                    t("close")
                }
                ;
                return {
                    onClose: o
                }
            }
        })
          , d = o(57886);
        const u = (0,
        d.Z)(c, [["render", i]]);
        var m = u
    },
    33974: function(e, t, o) {
        "use strict";
        o.r(t),
        o.d(t, {
            default: function() {
                return N
            }
        });
        var a = o(88412);
        const n = {
            key: 0,
            class: "flex justify-center pb-2 pt-4"
        };
        function s(e, t, o, s, l, r) {
            const i = (0,
            a.up)("v-pagination");
            return e.totalPage > 1 ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", n, [(0,
            a.Wm)(i, {
                modelValue: e.page,
                "onUpdate:modelValue": [t[0] || (t[0] = t=>e.page = t), e.onPaginationUpdate],
                pages: e.totalPage,
                "range-size": 1
            }, null, 8, ["modelValue", "pages", "onUpdate:modelValue"])])) : (0,
            a.kq)("", !0)
        }
        var l = o(37325)
          , r = (o(46906),
        o(51538));
        const i = {
            viewBox: "0 0 8 2",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
        }
          , c = (0,
        a.Wm)("path", {
            d: "M2.24 1c0 .556-.445 1-1 1-.556 0-1-.444-1-1s.444-1 1-1c.555 0 1 .444 1 1zm5.333 0c0 .556-.444 1-1 1-.555 0-1-.444-1-1s.445-1 1-1c.556 0 1 .444 1 1z",
            fill: "#BBB"
        }, null, -1);
        function d(e, t) {
            return (0,
            a.wg)(),
            (0,
            a.j4)("svg", i, [c])
        }
        var u = (0,
        a.aZ)({
            name: "VPage",
            components: {
                IconPaginationDots: d
            },
            props: {
                page: {
                    type: Number,
                    default: null
                },
                current: {
                    type: Number,
                    default: 0
                },
                activeColor: {
                    type: String,
                    default: "#DCEDFF"
                }
            },
            emits: ["update"],
            setup(e, {emit: t}) {
                const o = (0,
                a.Fl)((()=>e.page === e.current));
                function n() {
                    t("update", e.page)
                }
                return {
                    isActive: o,
                    clickHandler: n
                }
            }
        });
        const m = (0,
        a.HX)("data-v-060ca318");
        (0,
        a.dD)("data-v-060ca318");
        const p = {
            key: 0,
            class: "DotsHolder"
        };
        (0,
        a.Cn)();
        const b = m(((e,t,o,n,s,l)=>{
            const i = (0,
            a.up)("icon-pagination-dots");
            return (0,
            a.wg)(),
            (0,
            a.j4)("li", null, [null === e.page ? ((0,
            a.wg)(),
            (0,
            a.j4)("span", p, [(0,
            a.Wm)(i, {
                class: "Dots"
            })])) : ((0,
            a.wg)(),
            (0,
            a.j4)("button", {
                key: 1,
                class: ["Page", {
                    "Page-active": e.isActive
                }],
                type: "button",
                "aria-label": `Go to page ${e.page}`,
                style: `background-color: ${e.isActive ? e.activeColor : "transparent"};`,
                onClick: t[1] || (t[1] = (...t)=>e.clickHandler && e.clickHandler(...t))
            }, (0,
            r.zw)(e.page), 15, ["aria-label"]))])
        }
        ));
        u.render = b,
        u.__scopeId = "data-v-060ca318",
        u.__file = "src/components/atoms/VPage.vue";
        const g = {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
        }
          , w = (0,
        a.Wm)("path", {
            d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41M6 6h2v12H6V6z"
        }, null, -1);
        function h(e, t) {
            return (0,
            a.wg)(),
            (0,
            a.j4)("svg", g, [w])
        }
        const f = {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
        }
          , k = (0,
        a.Wm)("path", {
            d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41M16 6h2v12h-2V6z"
        }, null, -1);
        function x(e, t) {
            return (0,
            a.wg)(),
            (0,
            a.j4)("svg", f, [k])
        }
        const v = {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
        }
          , y = (0,
        a.Wm)("path", {
            d: "M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z"
        }, null, -1);
        function C(e, t) {
            return (0,
            a.wg)(),
            (0,
            a.j4)("svg", v, [y])
        }
        const _ = {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
        }
          , J = (0,
        a.Wm)("path", {
            d: "M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z"
        }, null, -1);
        function U(e, t) {
            return (0,
            a.wg)(),
            (0,
            a.j4)("svg", _, [J])
        }
        var S = (0,
        a.aZ)({
            name: "VPagination",
            components: {
                IconPageFirst: h,
                IconChevronLeft: C,
                IconChevronRight: U,
                IconPageLast: x,
                VPage: u
            },
            props: {
                pages: {
                    type: Number,
                    default: 0
                },
                rangeSize: {
                    type: Number,
                    default: 1
                },
                modelValue: {
                    type: Number,
                    default: 0
                },
                activeColor: {
                    type: String,
                    default: "#DCEDFF"
                },
                hideFirstButton: {
                    type: Boolean,
                    default: !1
                },
                hideLastButton: {
                    type: Boolean,
                    default: !1
                }
            },
            emits: ["update:modelValue"],
            setup(e, {emit: t}) {
                const o = (0,
                a.Fl)((()=>{
                    const t = []
                      , o = 5 + 2 * e.rangeSize;
                    let a = e.pages <= o ? 1 : e.modelValue - e.rangeSize
                      , n = e.pages <= o ? e.pages : e.modelValue + e.rangeSize;
                    if (n = n > e.pages ? e.pages : n,
                    a = a < 1 ? 1 : a,
                    e.pages > o) {
                        const s = a - 1 < 3
                          , l = e.pages - n < 3;
                        if (s) {
                            n = o - 2;
                            for (let e = 1; e < a; e++)
                                t.push(e)
                        } else
                            t.push(1),
                            t.push(null);
                        if (l) {
                            a = e.pages - (o - 3);
                            for (let o = a; o <= e.pages; o++)
                                t.push(o)
                        } else {
                            for (let e = a; e <= n; e++)
                                t.push(e);
                            t.push(null),
                            t.push(e.pages)
                        }
                    } else
                        for (let e = a; e <= n; e++)
                            t.push(e);
                    return t
                }
                ));
                function n(e) {
                    t("update:modelValue", e)
                }
                const s = (0,
                a.Fl)((()=>e.modelValue > 1))
                  , l = (0,
                a.Fl)((()=>e.modelValue < e.pages));
                function r() {
                    s.value && t("update:modelValue", 1)
                }
                function i() {
                    s.value && t("update:modelValue", e.modelValue - 1)
                }
                function c() {
                    l.value && t("update:modelValue", e.pages)
                }
                function d() {
                    l.value && t("update:modelValue", e.modelValue + 1)
                }
                return {
                    pagination: o,
                    updatePageHandler: n,
                    isPrevControlsActive: s,
                    isNextControlsActive: l,
                    goToFirst: r,
                    goToLast: c,
                    goToPrev: i,
                    goToNext: d
                }
            }
        });
        const P = (0,
        a.HX)("data-v-2a30deb0");
        (0,
        a.dD)("data-v-2a30deb0");
        const M = {
            class: "Pagination"
        }
          , A = {
            key: 0,
            class: "PaginationControl"
        }
          , j = {
            class: "PaginationControl"
        }
          , z = {
            class: "PaginationControl"
        }
          , F = {
            key: 1,
            class: "PaginationControl"
        };
        (0,
        a.Cn)();
        const I = P(((e,t,o,n,s,l)=>{
            const r = (0,
            a.up)("icon-page-first")
              , i = (0,
            a.up)("icon-chevron-left")
              , c = (0,
            a.up)("v-page")
              , d = (0,
            a.up)("icon-chevron-right")
              , u = (0,
            a.up)("icon-page-last");
            return (0,
            a.wg)(),
            (0,
            a.j4)("ul", M, [e.hideFirstButton ? (0,
            a.kq)("v-if", !0) : ((0,
            a.wg)(),
            (0,
            a.j4)("li", A, [(0,
            a.Wm)(r, {
                class: ["Control", {
                    "Control-active": e.isPrevControlsActive
                }],
                onClick: e.goToFirst
            }, null, 8, ["class", "onClick"])])), (0,
            a.Wm)("li", j, [(0,
            a.Wm)(i, {
                class: ["Control", {
                    "Control-active": e.isPrevControlsActive
                }],
                onClick: e.goToPrev
            }, null, 8, ["class", "onClick"])]), ((0,
            a.wg)(!0),
            (0,
            a.j4)(a.HY, null, (0,
            a.Ko)(e.pagination, (t=>((0,
            a.wg)(),
            (0,
            a.j4)(c, {
                key: `pagination-page-${t}`,
                page: t,
                current: e.modelValue,
                "active-color": e.activeColor,
                onUpdate: e.updatePageHandler
            }, null, 8, ["page", "current", "active-color", "onUpdate"])))), 128)), (0,
            a.Wm)("li", z, [(0,
            a.Wm)(d, {
                class: ["Control", {
                    "Control-active": e.isNextControlsActive
                }],
                onClick: e.goToNext
            }, null, 8, ["class", "onClick"])]), e.hideLastButton ? (0,
            a.kq)("v-if", !0) : ((0,
            a.wg)(),
            (0,
            a.j4)("li", F, [(0,
            a.Wm)(u, {
                class: ["Control", {
                    "Control-active": e.isNextControlsActive
                }],
                onClick: e.goToLast
            }, null, 8, ["class", "onClick"])]))])
        }
        ));
        S.render = I,
        S.__scopeId = "data-v-2a30deb0",
        S.__file = "src/components/VPagination.vue";
        var D = S;
        function B(e) {
            const t = e?.totalPages
              , o = e?.currentPage
              , a = e?.previousPage
              , n = e?.nextPage
              , s = e?.totalRows;
            return {
                currentPage: o,
                totalPages: t,
                totalRows: s,
                previousPage: a,
                nextPage: n
            }
        }
        var L = (0,
        a.aZ)({
            name: "Pagination",
            components: {
                VPagination: D
            },
            props: {
                pagination: {
                    type: Object,
                    default: ()=>({})
                }
            },
            setup(e, {emit: t}) {
                const o = (0,
                l.iH)(0)
                  , n = (0,
                l.iH)(1);
                (0,
                a.m0)((()=>{
                    const {totalPages: t, currentPage: a} = B(e.pagination);
                    o.value = t,
                    n.value = a
                }
                ));
                const s = e=>{
                    t("change", e)
                }
                ;
                return {
                    page: n,
                    totalPage: o,
                    onPaginationUpdate: s
                }
            }
        })
          , W = o(57886);
        const R = (0,
        W.Z)(L, [["render", s]]);
        var N = R
    },
    88341: function(e, t, o) {
        "use strict";
        o.r(t),
        o.d(t, {
            default: function() {
                return Mo
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
        function r(e, t, o, r, i, c) {
            const d = (0,
            a.up)("loading-circle")
              , u = (0,
            a.up)("LoaderIcon")
              , m = (0,
            a.up)("RefreshCwIcon")
              , p = (0,
            a.up)("tooltip")
              , b = (0,
            a.up)("job-table")
              , g = (0,
            a.up)("pagination")
              , w = (0,
            a.up)("template-content")
              , h = (0,
            a.up)("add-user-modal")
              , f = (0,
            a.up)("ManualJobSuccessModal")
              , k = (0,
            a.up)("EditBankPartnerModal")
              , x = (0,
            a.up)("ConfirmJobModal")
              , v = (0,
            a.up)("RejectJobModal")
              , y = (0,
            a.up)("ConfirmOtpModal");
            return (0,
            a.wg)(),
            (0,
            a.iD)(a.HY, null, [(0,
            a.Wm)(w, null, {
                "header-title": (0,
                a.w5)((()=>[e.loadingGetTxJobPendingList ? ((0,
                a.wg)(),
                (0,
                a.j4)(d, {
                    key: 0,
                    class: "mr-1",
                    loading: e.loadingGetTxJobPendingList
                }, null, 8, ["loading"])) : ((0,
                a.wg)(),
                (0,
                a.j4)(u, {
                    key: 1,
                    class: "w-6 h-6 mr-3 text-blue-800 inline"
                })), (0,
                a._)("h2", s, (0,
                n.zw)(e.t("txJob.pending.title")), 1)])),
                "header-action": (0,
                a.w5)((()=>[(0,
                a._)("button", {
                    class: "btn btn-primary w-8 h-8 rounded ml-2",
                    onClick: t[0] || (t[0] = (...t)=>e.onReloadJobList && e.onReloadJobList(...t))
                }, [(0,
                a.Wm)(p, {
                    class: "block text-gray-800",
                    message: e.$t("refresh")
                }, {
                    default: (0,
                    a.w5)((()=>[e.loadingGetTxJobPendingList ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)(d, {
                        key: 0,
                        loading: e.loadingGetTxJobPendingList
                    }, null, 8, ["loading"])) : ((0,
                    a.wg)(),
                    (0,
                    a.j4)(m, {
                        key: 1,
                        class: "text-white px-0.5"
                    }))])),
                    _: 1
                }, 8, ["message"])])])),
                "page-content": (0,
                a.w5)((()=>[(0,
                a._)("div", l, [(0,
                a.Wm)(b, {
                    "current-page": e.pageMeta?.currentPage,
                    loading: e.loadingGetTxJobPendingList,
                    list: e.txJobPendingList,
                    onCheckJob: e.onCheckJob,
                    onDenyJob: e.onDenyJob,
                    onApproveJob: e.onApproveJob,
                    "check-job-loading": e.checkJobLoading,
                    "deny-job-loading": e.denyJobLoading,
                    "approve-job-loading": e.approveJobLoading,
                    "manual-job-success-loading": e.manualJobSuccessLoading,
                    onOnAddUsername: e.onAddUsername,
                    onManualJobSuccess: e.onManualJobSuccess,
                    onEditBankPartner: e.onEditBankPartner,
                    onConfirmOtp: e.onConfirmOtp
                }, null, 8, ["current-page", "loading", "list", "onCheckJob", "onDenyJob", "onApproveJob", "check-job-loading", "deny-job-loading", "approve-job-loading", "manual-job-success-loading", "onOnAddUsername", "onManualJobSuccess", "onEditBankPartner", "onConfirmOtp"])]), (0,
                a.Wm)(g, {
                    pagination: e.pageMeta,
                    onChange: e.onChangePage
                }, null, 8, ["pagination", "onChange"])])),
                _: 1
            }), ((0,
            a.wg)(),
            (0,
            a.j4)(a.lR, {
                to: "body"
            }, [(0,
            a.Wm)(h, {
                isShow: e.isShowAddUsernameModal,
                "add-user-item": e.addUserItem,
                onSubmitAddUser: e.onSubmitAddUser
            }, null, 8, ["isShow", "add-user-item", "onSubmitAddUser"]), (0,
            a.Wm)(f, {
                "is-show": e.isShowManualJobSuccessModal,
                "job-item": e.jobItem
            }, null, 8, ["is-show", "job-item"]), (0,
            a.Wm)(k, {
                "is-show": e.isShowEditBankPartnerModal,
                "job-item": e.jobItem
            }, null, 8, ["is-show", "job-item"]), (0,
            a.Wm)(x, {
                "is-show": e.isShowConfirmJobModal,
                "job-item": e.jobItem
            }, null, 8, ["is-show", "job-item"]), (0,
            a.Wm)(v, {
                "is-show": e.isShowRejectJobModal,
                "job-item": e.jobItem
            }, null, 8, ["is-show", "job-item"]), (0,
            a.Wm)(y, {
                "is-show": e.isShowConfirmOtpModal,
                "job-item": e.jobItem
            }, null, 8, ["is-show", "job-item"])]))], 64)
        }
        var i = o(37325)
          , c = o(29260)
          , d = o(81120)
          , u = o(82016)
          , m = o.n(u)
          , p = o(55689)
          , b = o(33974)
          , g = o(11823);
        const w = {
            class: "grid grid-cols-1 md:grid-cols-6 items-center md:gap-4 px-4 pt-4"
        }
          , h = {
            key: 0,
            class: "p-4 border-t"
        }
          , f = {
            class: "font-display text-lg"
        }
          , k = {
            class: "text-xs"
        }
          , x = {
            class: "flex items-center border-l-4 border-blue-400 bg-blue-50 text-blue-500 px-2 py-1.5 my-2"
        }
          , v = {
            class: "flex justify-end px-5 pb-5"
        };
        function y(e, t, o, s, l, r) {
            const i = (0,
            a.up)("search-member")
              , c = (0,
            a.up)("CheckIcon")
              , d = (0,
            a.up)("base-button")
              , u = (0,
            a.up)("AlertCircleIcon")
              , m = (0,
            a.up)("similar-user-table")
              , p = (0,
            a.up)("XIcon")
              , b = (0,
            a.up)("ConfirmAddUserModal")
              , g = (0,
            a.up)("base-modal");
            return (0,
            a.wg)(),
            (0,
            a.j4)(g, {
                "is-show": e.isShow,
                title: e.$t("specifyUserAccount.modalTitle"),
                "modal-class": "modal-xl",
                onClose: e.onClose
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a._)("div", w, [(0,
                a.Wm)(i, {
                    class: "col-span-5",
                    "onSearch:member": e.onSearchMember
                }, null, 8, ["onSearch:member"]), (0,
                a.Wm)(d, {
                    loading: e.loading,
                    class: "btn btn-primary mt-2",
                    type: "click",
                    onClick: e.onSubmitAddUser,
                    label: e.$t("confirm")
                }, {
                    default: (0,
                    a.w5)((()=>[(0,
                    a.Wm)(c)])),
                    _: 1
                }, 8, ["loading", "onClick", "label"])]), e.hasSimilarUserList ? ((0,
                a.wg)(),
                (0,
                a.iD)("div", h, [(0,
                a._)("h3", f, [(0,
                a.Uk)((0,
                n.zw)(e.$t("specifyUserAccount.title")) + " ", 1), (0,
                a._)("span", k, " (" + (0,
                n.zw)(e.$t("specifyUserAccount.sortByLatestOnline")) + ")", 1)]), (0,
                a._)("div", x, [(0,
                a.Wm)(u, {
                    class: "mr-2 w-6 h-6"
                }), (0,
                a.Uk)(" " + (0,
                n.zw)(e.addUserItem?.txnRemark), 1)]), (0,
                a.Wm)(m, {
                    "error-code": e.addUserItem?.code,
                    list: e.addUserItem?.similarUserList,
                    onOnClickBankMember: e.onSelectBankMember
                }, null, 8, ["error-code", "list", "onOnClickBankMember"])])) : (0,
                a.kq)("", !0), (0,
                a._)("div", v, [(0,
                a.Wm)(d, {
                    onClick: e.onClose,
                    class: "btn btn-outline-dark",
                    label: e.$t("close")
                }, {
                    default: (0,
                    a.w5)((()=>[(0,
                    a.Wm)(p)])),
                    _: 1
                }, 8, ["onClick", "label"])]), (0,
                a.Wm)(b, {
                    "tx-job-id": e.addUserItem?.jobId,
                    "is-show": e.isShowConfirmAddUserModal,
                    item: e.selectedMemberItem,
                    "txn-remark": e.addUserItem?.txnRemark,
                    "error-code": e.addUserItem?.code,
                    "error-message": e.addUserItem?.message
                }, null, 8, ["tx-job-id", "is-show", "item", "txn-remark", "error-code", "error-message"])])),
                _: 1
            }, 8, ["is-show", "title", "onClose"])
        }
        var C = o(17243)
          , _ = o(59215)
          , J = o(27646);
        const U = {
            class: "grid grid-cols-12"
        }
          , S = {
            class: "intro-y box col-span-12 sm:col-span-12"
        }
          , P = {
            class: "overflow-x-auto"
        }
          , M = {
            class: "text-xs w-full border"
        }
          , A = {
            class: "py-1 bg-gray-700 dark:bg-dark-1 text-white px-half font-display"
        }
          , j = (0,
        a._)("th", {
            class: "dark:border-dark-5 whitespace-nowrap text-center"
        }, null, -1)
          , z = (0,
        a._)("th", {
            class: "dark:border-dark-5 whitespace-nowrap"
        }, "#", -1)
          , F = {
            class: "dark:border-dark-5 whitespace-nowrap text-left"
        }
          , I = {
            key: 0,
            class: "dark:border-dark-5 whitespace-nowrap text-left"
        }
          , D = {
            key: 1,
            class: "dark:border-dark-5 whitespace-nowrap text-left"
        }
          , B = {
            class: "dark:border-dark-5 whitespace-nowrap text-left"
        }
          , L = {
            class: "dark:border-dark-5 whitespace-nowrap text-center"
        }
          , W = {
            class: "dark:border-dark-5 whitespace-nowrap text-center"
        }
          , R = {
            class: "text-center py-2"
        }
          , N = {
            class: "text-center w-10"
        }
          , T = {
            class: "text-mobile text-gray-500"
        }
          , $ = {
            class: "text-left number-display px-2"
        }
          , H = {
            key: 0,
            class: "text-left number-display px-2"
        }
          , q = {
            class: "min-w-max"
        }
          , E = {
            key: 1,
            class: "text-left number-display px-2"
        }
          , O = {
            class: "text-right number-display"
        }
          , V = {
            class: "flex items-center text-left pl-1 w-48"
        }
          , Z = {
            key: 0,
            class: "pl-2"
        }
          , X = {
            key: 1,
            class: "pl-2"
        }
          , Y = (0,
        a._)("div", null, "-", -1)
          , G = [Y]
          , K = {
            class: "text-center number-display"
        }
          , Q = {
            class: "flex justify-center"
        }
          , ee = {
            class: "w-28"
        }
          , te = {
            class: "block text-center"
        }
          , oe = {
            class: "pl-1 items-center font-semibold"
        }
          , ae = {
            key: 0,
            class: "block text-xs font-light text-center"
        }
          , ne = {
            class: "text-center number-display"
        }
          , se = {
            class: "flex justify-center"
        }
          , le = {
            class: "w-28"
        }
          , re = {
            class: "block text-center"
        }
          , ie = {
            class: "pl-1 items-center font-semibold"
        }
          , ce = {
            key: 0,
            class: "block text-xs font-light text-center"
        };
        function de(e, t, o, s, l, r) {
            const i = (0,
            a.up)("base-button")
              , c = (0,
            a.up)("bank-logo");
            return (0,
            a.wg)(),
            (0,
            a.iD)("div", U, [(0,
            a._)("div", S, [(0,
            a._)("div", P, [(0,
            a._)("table", M, [(0,
            a._)("thead", null, [(0,
            a._)("tr", A, [j, z, (0,
            a._)("th", F, (0,
            n.zw)(e.$t("specifyUserAccount.table.username")), 1), e.isErrorPhoneAndFullname ? ((0,
            a.wg)(),
            (0,
            a.iD)("th", I, (0,
            n.zw)(e.$t("specifyUserAccount.table.fullname")), 1)) : (0,
            a.kq)("", !0), e.isErrorPhoneAndFullname ? ((0,
            a.wg)(),
            (0,
            a.iD)("th", D, (0,
            n.zw)(e.$t("specifyUserAccount.table.phone")), 1)) : (0,
            a.kq)("", !0), (0,
            a._)("th", B, (0,
            n.zw)(e.$t("specifyUserAccount.table.accountInfo")), 1), (0,
            a._)("th", L, (0,
            n.zw)(e.$t("specifyUserAccount.table.lastActive")), 1), (0,
            a._)("th", W, (0,
            n.zw)(e.$t("specifyUserAccount.table.signUpDate")), 1)])]), (0,
            a._)("tbody", null, [((0,
            a.wg)(!0),
            (0,
            a.iD)(a.HY, null, (0,
            a.Ko)(e.list, ((t,o)=>((0,
            a.wg)(),
            (0,
            a.iD)("tr", {
                class: "hover:bg-yellow-100 px-half border-b border-gray-300",
                key: o
            }, [(0,
            a._)("td", R, [(0,
            a.Wm)(i, {
                size: "sm",
                class: "btn btn-warning",
                onClick: o=>e.onSelectMember(t)
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Uk)((0,
                n.zw)(e.$t("select")), 1)])),
                _: 2
            }, 1032, ["onClick"])]), (0,
            a._)("td", N, [(0,
            a.Uk)((0,
            n.zw)(o + 1) + " ", 1), (0,
            a._)("span", T, "#" + (0,
            n.zw)(t.memberId), 1)]), (0,
            a._)("td", $, (0,
            n.zw)(t.username), 1), e.isErrorPhoneAndFullname ? ((0,
            a.wg)(),
            (0,
            a.iD)("td", H, [(0,
            a._)("div", q, (0,
            n.zw)(t.fullname), 1)])) : (0,
            a.kq)("", !0), e.isErrorPhoneAndFullname ? ((0,
            a.wg)(),
            (0,
            a.iD)("td", E, (0,
            n.zw)(t.phoneNumber), 1)) : (0,
            a.kq)("", !0), (0,
            a._)("td", O, [(0,
            a._)("div", V, [(0,
            a.Wm)(c, {
                "bank-code": t?.bankCode,
                "logo-class": "rounded w-7 h-7"
            }, null, 8, ["bank-code"]), t?.accountName ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", Z, [(0,
            a._)("div", null, (0,
            n.zw)(e.getFormatBankNumber(t?.accountNumber)), 1), (0,
            a._)("div", null, (0,
            n.zw)(t?.accountName), 1)])) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", X, G))])]), (0,
            a._)("td", K, [(0,
            a._)("div", Q, [(0,
            a._)("div", ee, [(0,
            a._)("span", te, [(0,
            a.Uk)((0,
            n.zw)(e.getDateFormatted(t.activeAt)) + " ", 1), (0,
            a._)("span", oe, (0,
            n.zw)(e.getTimeFormatted(t.activeAt)), 1)]), e.getHumanizeFormatted(t.activeAt) ? ((0,
            a.wg)(),
            (0,
            a.iD)("span", ae, " (" + (0,
            n.zw)(e.getHumanizeFormatted(t.activeAt)) + ") ", 1)) : (0,
            a.kq)("", !0)])])]), (0,
            a._)("td", ne, [(0,
            a._)("div", se, [(0,
            a._)("div", le, [(0,
            a._)("span", re, [(0,
            a.Uk)((0,
            n.zw)(e.getDateFormatted(t.createdAt)) + " ", 1), (0,
            a._)("span", ie, (0,
            n.zw)(e.getTimeFormatted(t.createdAt)), 1)]), e.getHumanizeFormatted(t.createdAt) ? ((0,
            a.wg)(),
            (0,
            a.iD)("span", ce, " (" + (0,
            n.zw)(e.getHumanizeFormatted(t.createdAt)) + ") ", 1)) : (0,
            a.kq)("", !0)])])])])))), 128))])])])])])
        }
        var ue = o(64838)
          , me = o(12867);
        const pe = (0,
        a.RC)((()=>o.e(17679).then(o.bind(o, 17679))))
          , be = (0,
        a.RC)((()=>Promise.resolve().then(o.bind(o, 17243))));
        var ge = (0,
        a.aZ)({
            components: {
                BankLogo: pe,
                BaseButton: be
            },
            props: {
                list: {
                    type: Array,
                    default: ()=>[]
                },
                errorCode: {
                    type: Number,
                    default: 0
                }
            },
            emits: ["on-click-bank-member"],
            name: "SimilarUserTable",
            setup(e, {emit: t}) {
                const o = (0,
                a.Fl)((()=>2017 === e.errorCode || 2011 === e.errorCode))
                  , n = e=>e ? (0,
                ue.o0)(1e3 * e, "DD/MM/YY") : "-"
                  , s = e=>e ? (0,
                ue.o0)(1e3 * e, "HH:mm") : ""
                  , l = e=>e ? (0,
                ue.iL)(1e3 * e) : ""
                  , r = e=>(0,
                me.O)(e)
                  , i = e=>{
                    t("on-click-bank-member", e)
                }
                ;
                return {
                    isErrorPhoneAndFullname: o,
                    getFormatBankNumber: r,
                    getHumanizeFormatted: l,
                    getDateFormatted: n,
                    getTimeFormatted: s,
                    onSelectMember: i
                }
            }
        })
          , we = o(57886);
        const he = (0,
        we.Z)(ge, [["render", de]]);
        var fe = he;
        const ke = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[52] m-0 p-0"
        }
          , xe = {
            class: "modal-dialog mx-auto my-3 flex justify-center items-center"
        }
          , ve = {
            class: "modal-content bg-primary"
        }
          , ye = {
            class: "modal-header flex justify-end sticky top-0 rounded-t-md border-0 pb-0"
        }
          , Ce = {
            class: "text-center"
        }
          , _e = {
            class: "font-medium font-display mr-auto text-2xl mb-5 text-white"
        }
          , Je = {
            class: "bg-white rounded-lg p-5 m-5"
        }
          , Ue = {
            class: "flex items-center py-1"
        }
          , Se = (0,
        a._)("div", {
            class: "w-24 text-right font-semibold mr-3"
        }, "Member Id:", -1)
          , Pe = {
            class: "flex items-center py-1"
        }
          , Me = {
            class: "w-24 text-right font-semibold mr-3"
        }
          , Ae = {
            key: 0,
            class: "flex items-center py-1"
        }
          , je = {
            class: "w-24 text-right font-semibold mr-3"
        }
          , ze = {
            key: 1,
            class: "flex items-center py-1"
        }
          , Fe = {
            class: "w-24 text-right font-semibold mr-3"
        }
          , Ie = {
            key: 2,
            class: "flex items-center py-1"
        }
          , De = {
            class: "w-24 text-right font-semibold mr-3"
        }
          , Be = {
            class: "flex items-center"
        }
          , Le = {
            key: 0,
            class: "flex items-center"
        }
          , We = {
            class: "ml-2"
        }
          , Re = {
            key: 1
        }
          , Ne = {
            key: 3,
            class: "flex items-center py-1"
        }
          , Te = {
            class: "w-24 text-right font-semibold mr-3"
        }
          , $e = {
            key: 4,
            class: "flex items-center py-1"
        }
          , He = {
            class: "w-24 text-right font-semibold mr-3"
        }
          , qe = {
            class: "flex items-center py-1"
        }
          , Ee = (0,
        a._)("div", {
            class: "w-24 text-right font-semibold mr-3"
        }, "Tx Pattern:", -1)
          , Oe = {
            class: "text-left"
        }
          , Ve = {
            class: "flex items-center py-1"
        }
          , Ze = {
            class: "w-24 text-right font-semibold mr-3 capitalize"
        }
          , Xe = {
            key: 0,
            class: "flex"
        }
          , Ye = {
            class: "relative"
        }
          , Ge = {
            key: 5,
            class: "flex items-center border-l-4 border-orange-400 bg-orange-50 text-orange-500 px-2 py-3 mt-3"
        }
          , Ke = {
            class: "flex justify-center gap-3 mt-5"
        };
        function Qe(e, t, o, s, l, r) {
            const i = (0,
            a.up)("XIcon")
              , c = (0,
            a.up)("bank-logo")
              , d = (0,
            a.up)("tooltip")
              , u = (0,
            a.up)("CheckIcon")
              , m = (0,
            a.up)("base-button");
            return e.isShow ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", ke, [(0,
            a._)("div", xe, [(0,
            a._)("div", ve, [(0,
            a._)("div", ye, [(0,
            a.Wm)(i, {
                class: "cursor-pointer text-white",
                onClick: e.onClose
            }, null, 8, ["onClick"])]), (0,
            a._)("div", Ce, [(0,
            a._)("h1", _e, (0,
            n.zw)(e.isErrorPhoneAndFullname ? e.t("specifyUserAccount.confirmPhone") : e.t("specifyUserAccount.confirmTitle")), 1), (0,
            a._)("div", Je, [(0,
            a._)("div", null, [(0,
            a._)("div", Ue, [Se, (0,
            a._)("div", null, "#" + (0,
            n.zw)(e.item?.memberId), 1)]), (0,
            a._)("div", Pe, [(0,
            a._)("div", Me, (0,
            n.zw)(e.t("specifyUserAccount.username")) + ": ", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.item?.username), 1)]), e.isErrorPhoneAndFullname ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", Ae, [(0,
            a._)("div", je, (0,
            n.zw)(e.t("specifyUserAccount.fullname")) + ": ", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.item?.fullname), 1)])) : (0,
            a.kq)("", !0), e.isErrorPhoneAndFullname ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", ze, [(0,
            a._)("div", Fe, (0,
            n.zw)(e.t("specifyUserAccount.phone")) + ": ", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.item?.phoneNumber), 1)])) : (0,
            a.kq)("", !0), e.isErrorPhoneAndFullname ? (0,
            a.kq)("", !0) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", Ie, [(0,
            a._)("div", De, (0,
            n.zw)(e.t("specifyUserAccount.bank")) + ": ", 1), (0,
            a._)("div", Be, [e.item.bankCode ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", Le, [(0,
            a.Wm)(c, {
                "bank-code": e.item?.bankCode,
                "logo-class": "rounded w-5 h-5"
            }, null, 8, ["bank-code"]), (0,
            a._)("div", We, (0,
            n.zw)(e.t(`bankName.${e.item.bankCode}`)), 1)])) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", Re, "-"))])])), e.isErrorPhoneAndFullname ? (0,
            a.kq)("", !0) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", Ne, [(0,
            a._)("div", Te, (0,
            n.zw)(e.t("specifyUserAccount.accountName")) + ": ", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.item?.accountName || "-"), 1)])), e.isErrorPhoneAndFullname ? (0,
            a.kq)("", !0) : ((0,
            a.wg)(),
            (0,
            a.iD)("div", $e, [(0,
            a._)("div", He, (0,
            n.zw)(e.t("specifyUserAccount.accountNumber")) + ": ", 1), (0,
            a._)("div", null, (0,
            n.zw)(e.getFormatBankNumber(e.item?.accountNumber) || "-"), 1)])), (0,
            a._)("div", qe, [Ee, (0,
            a._)("div", Oe, (0,
            n.zw)(e.txnRemark), 1)]), (0,
            a._)("div", Ve, [(0,
            a._)("div", Ze, (0,
            n.zw)(e.t("notes")) + ":", 1), e.errorCode ? ((0,
            a.wg)(),
            (0,
            a.iD)("span", Xe, [(0,
            a.Uk)((0,
            n.zw)(e.t(`errorCode.${e.errorCode}`)) + " ", 1), (0,
            a._)("div", Ye, [e.errorMessage ? ((0,
            a.wg)(),
            (0,
            a.j4)(d, {
                key: 0,
                class: "mr-1 block text-gray-800",
                message: e.errorMessage,
                positionClass: "right-10 top-0"
            }, null, 8, ["message"])) : (0,
            a.kq)("", !0)])])) : (0,
            a.kq)("", !0)]), e.item.accountNameFound ? ((0,
            a.wg)(),
            (0,
            a.iD)("div", Ge, (0,
            n.zw)(e.t("specifyUserAccount.theSystemWillRememberThisAccountOnTheNextDeposit")), 1)) : (0,
            a.kq)("", !0)]), (0,
            a._)("div", Ke, [(0,
            a.Wm)(m, {
                loading: e.loading,
                onClick: e.onSubmit,
                class: "btn btn-primary w-20"
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Wm)(u, {
                    class: "mr-2"
                }), (0,
                a.Uk)(" " + (0,
                n.zw)(e.t("txJob.manual.confirm")), 1)])),
                _: 1
            }, 8, ["loading", "onClick"]), (0,
            a.Wm)(m, {
                onClick: e.onClose,
                class: "btn btn-outline-dark w-16"
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Uk)((0,
                n.zw)(e.t("txJob.manual.close")), 1)])),
                _: 1
            }, 8, ["onClick"])])])])])])])) : (0,
            a.kq)("", !0)
        }
        const et = (0,
        a.RC)((()=>Promise.resolve().then(o.bind(o, 68178))))
          , tt = (0,
        a.RC)((()=>o.e(17679).then(o.bind(o, 17679))));
        var ot = (0,
        a.aZ)({
            name: "ConfirmAddUserModal",
            components: {
                BaseButton: C["default"],
                BankLogo: tt,
                Tooltip: et
            },
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                item: {
                    type: Object,
                    default: ()=>({})
                },
                txJobId: {
                    type: Number,
                    default: 0
                },
                txnRemark: {
                    type: String,
                    default: ""
                },
                errorMessage: {
                    type: String,
                    default: ""
                },
                errorCode: {
                    type: Number,
                    default: 0
                }
            },
            setup(e) {
                const {t: t} = (0,
                d.QT)()
                  , o = (0,
                c.oR)()
                  , n = (0,
                a.Fl)((()=>o.getters["wait/is"]("loading.matchUsernameJob")))
                  , s = (0,
                a.Fl)((()=>2017 === e.errorCode || 2011 === e.errorCode))
                  , l = e=>(0,
                me.O)(e)
                  , r = async()=>{
                    if (s.value) {
                        const t = {
                            jobId: Number(e?.txJobId),
                            memberId: Number(e.item?.memberId)
                        };
                        await o.dispatch("txJob/matchUsernameJob", t)
                    } else {
                        const t = {
                            jobId: e.txJobId,
                            bankMemberId: e.item.bankMemberId,
                            accountNameFound: e.item.accountNameFound
                        };
                        await o.dispatch("txJob/matchBankMemberJob", t)
                    }
                }
                  , i = ()=>{
                    o.commit("txJob/setShowConfirmAddUserModal", !1)
                }
                ;
                return {
                    t: t,
                    isErrorPhoneAndFullname: s,
                    loading: n,
                    getFormatBankNumber: l,
                    onClose: i,
                    onSubmit: r
                }
            }
        });
        const at = (0,
        we.Z)(ot, [["render", Qe]]);
        var nt = at
          , st = (0,
        a.aZ)({
            name: "AddUserModal",
            components: {
                ConfirmAddUserModal: nt,
                BaseModal: _["default"],
                SearchMember: J["default"],
                BaseButton: C["default"],
                SimilarUserTable: fe
            },
            props: {
                isShow: {
                    type: Boolean,
                    default: !1
                },
                addUserItem: {
                    type: Object,
                    default: null
                }
            },
            setup(e, {emit: t}) {
                const o = (0,
                c.oR)()
                  , n = (0,
                i.iH)(0)
                  , s = (0,
                i.iH)()
                  , l = (0,
                a.Fl)((()=>e.addUserItem?.similarUserList.length > 0))
                  , r = (0,
                a.Fl)((()=>o.state.txJob.isShowConfirmAddUserModal))
                  , d = ()=>{
                    o.commit("txJob/setShowAddUsernameModal", !1)
                }
                  , u = e=>{
                    e && (n.value = e?.id)
                }
                  , m = (0,
                a.Fl)((()=>o.getters["wait/is"]("loading.matchUsernameJob")))
                  , p = ()=>{
                    t("submit-add-user", n.value)
                }
                  , b = e=>{
                    s.value = e,
                    o.commit("txJob/setShowConfirmAddUserModal", !0)
                }
                ;
                return (0,
                a.YP)(r, (e=>{
                    e || (s.value = null)
                }
                )),
                (0,
                a.Ah)((()=>{
                    s.value = null
                }
                )),
                {
                    selectedMemberItem: s,
                    isShowConfirmAddUserModal: r,
                    loading: m,
                    hasSimilarUserList: l,
                    onClose: d,
                    onSearchMember: u,
                    onSubmitAddUser: p,
                    onSelectBankMember: b
                }
            }
        });
        const lt = (0,
        we.Z)(st, [["render", y]]);
        var rt = lt
          , it = o(89796)
          , ct = o(94917)
          , dt = o(87873)
          , ut = o(88182)
          , mt = o(90714);
        const pt = {
            class: "grid grid-cols-12"
        }
          , bt = {
            class: "intro-y box col-span-12 sm:col-span-12"
        }
          , gt = {
            class: "overflow-x-auto"
        }
          , wt = {
            class: "text-xs w-full border"
        }
          , ht = {
            class: "bg-gray-700 dark:bg-dark-1 text-white px-half font-display text-sm font-semibold"
        }
          , ft = (0,
        a._)("th", {
            class: "py-1 p-2 whitespace-nowrap"
        }, "#", -1)
          , kt = {
            class: "py-1 p-2 whitespace-nowrap"
        }
          , xt = {
            class: "py-1 p-2 whitespace-nowrap text-center"
        }
          , vt = {
            class: "py-1 p-2 whitespace-nowrap text-right"
        }
          , yt = {
            class: "py-1 p-2 whitespace-nowrap text-center"
        }
          , Ct = {
            class: "py-1 px-2 whitespace-nowrap text-left"
        }
          , _t = {
            class: "py-1 p-2 whitespace-nowrap text-center"
        }
          , Jt = {
            class: "py-1 p-2 whitespace-nowrap text-center"
        }
          , Ut = {
            class: "py-1 p-2 whitespace-nowrap text-left"
        }
          , St = {
            class: "py-1 p-2 whitespace-nowrap text-left"
        }
          , Pt = {
            class: "py-1 p-2 whitespace-nowrap text-left"
        }
          , Mt = {
            class: "py-1 p-2 whitespace-nowrap text-left"
        }
          , At = {
            class: "py-1 p-2 whitespace-nowrap text-left"
        }
          , jt = {
            class: "p-2 text-center w-10"
        }
          , zt = {
            class: "text-mobile text-gray-500"
        }
          , Ft = {
            class: "p-2 text-center"
        }
          , It = {
            class: "w-28"
        }
          , Dt = {
            class: "p-2 text-center w-20"
        }
          , Bt = {
            class: "p-2 text-right number-display font-semibold"
        }
          , Lt = {
            class: "p-2 text-center number-display"
        }
          , Wt = {
            class: "p-2 text-center w-[50px]"
        }
          , Rt = {
            class: "p-2 text-right"
        }
          , Nt = {
            class: "flex justify-center"
        }
          , Tt = {
            key: 0,
            class: "flex items-center"
        }
          , $t = {
            class: "px-2 py-0.5 rounded text-green-600"
        }
          , Ht = {
            class: "text-center flex items-center"
        }
          , qt = {
            class: "block text-xs text-center"
        }
          , Et = {
            key: 0,
            class: "text-center"
        }
          , Ot = {
            class: "p-2 text-right number-display"
        }
          , Vt = {
            class: "p-2"
        }
          , Zt = ["onClick"]
          , Xt = {
            class: "p-2 text-center"
        }
          , Yt = {
            key: 0
        }
          , Gt = {
            key: 1,
            class: "flex items-center"
        }
          , Kt = {
            class: "pl-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , Qt = {
            key: 1
        }
          , eo = {
            class: "text-left flex items-center"
        }
          , to = {
            class: "flex items-center"
        }
          , oo = {
            class: "p-2 bg-amber-100 rounded"
        }
          , ao = {
            class: "ml-2 text-left inline custom__line-clamp-2 break-words w-56"
        }
          , no = {
            class: "p-2 text-center"
        }
          , so = {
            class: "flex items-center"
        }
          , lo = {
            class: "w-6"
        }
          , ro = ["onClick"]
          , io = {
            class: "hidden group-hover:block absolute left-7 -top-1.5 min-w-max border-primary border border-l-4 bg-white p-2 rounded before:content-['⬥'] before:text-primary before:absolute before:-left-2.5 z-[60]"
        }
          , co = {
            class: "p-2 text-center"
        }
          , uo = {
            class: "p-2"
        }
          , mo = {
            class: "flex"
        }
          , po = {
            class: "bg-yellow-50 p-2 text-center"
        }
          , bo = {
            colspan: "18"
        }
          , go = {
            class: "p-2"
        }
          , wo = {
            colspan: "18",
            class: "text-center"
        }
          , ho = {
            name: "JobTable"
        };
        var fo = (0,
        a.aZ)({
            ...ho,
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
                },
                manualJobSuccessLoading: {
                    type: Boolean,
                    default: !1
                },
                currentPage: {
                    type: Number,
                    default: 1
                },
                limit: {
                    type: Number,
                    default: 10
                }
            },
            emits: ["check-job", "deny-job", "approve-job", "on-add-username", "manual-job-success", "edit-bank-partner", "confirm-otp"],
            setup(e, {emit: t}) {
                const s = e
                  , l = (0,
                a.RC)((()=>o.e(93673).then(o.bind(o, 93673))))
                  , r = (0,
                a.RC)((()=>o.e(56037).then(o.bind(o, 56037))))
                  , c = (0,
                a.RC)((()=>o.e(80030).then(o.bind(o, 80030))))
                  , u = (0,
                a.RC)((()=>o.e(54073).then(o.bind(o, 54073))))
                  , m = (0,
                a.RC)((()=>o.e(25707).then(o.bind(o, 25707))))
                  , p = (0,
                a.RC)((()=>o.e(44803).then(o.bind(o, 44803))))
                  , b = (0,
                a.RC)((()=>Promise.resolve().then(o.bind(o, 17243))))
                  , g = (0,
                a.RC)((()=>Promise.resolve().then(o.bind(o, 11823))))
                  , w = (0,
                a.RC)((()=>o.e(17679).then(o.bind(o, 17679))))
                  , h = (0,
                a.RC)((()=>o.e(25937).then(o.bind(o, 25937))))
                  , f = (0,
                a.RC)((()=>o.e(22861).then(o.bind(o, 22861))))
                  , {t: k} = (0,
                d.QT)()
                  , x = (0,
                i.iH)(0)
                  , v = (0,
                a.Fl)((()=>mt.hX))
                  , y = e=>e?.bankPartner?.bankCode === mt.hX.TMN?.toUpperCase()
                  , C = e=>e.status === dt.uH.WAITING && e?.bankPartner?.bankCode === mt.hX.SMK88PAY?.toUpperCase()
                  , _ = (0,
                a.Fl)((()=>s.list?.length > 0))
                  , J = (0,
                a.Fl)((()=>ut.uf))
                  , U = e=>Number(e) ? `${e} ${k("txJob.hour")}` : ""
                  , S = e=>Number(e) ? `${e} ${k("txJob.minutes")}` : ""
                  , P = e=>Number(e) ? `${e} ${k("txJob.second")}` : ""
                  , M = e=>{
                    const t = /s/gm
                      , o = /m/gm
                      , a = /h/gm;
                    if (e) {
                        if (a.test(e)) {
                            const t = e?.split("h")
                              , a = t[1]?.split("m");
                            return o.test(e) ? `${U(t[0])} ${S(a[0])}` : U(t[0])
                        }
                        if (o.test(e)) {
                            const o = e?.split("m")
                              , a = o[1]?.split("s");
                            return t.test(e) ? `${S(o[0])} ${P(a[0])}` : S(o[0])
                        }
                        if (t.test(e)) {
                            const t = e?.split("s");
                            return P(t[0])
                        }
                    }
                    return "-"
                }
                  , A = e=>{
                    x.value = e,
                    t("check-job", e)
                }
                  , j = e=>{
                    x.value = e?.id,
                    t("deny-job", e)
                }
                  , z = e=>{
                    e?.checkedBy && (x.value = e?.id,
                    t("approve-job", e))
                }
                  , F = e=>{
                    e?.checkedBy && t("manual-job-success", e)
                }
                  , I = e=>{
                    const o = {
                        code: e.errorData?.code,
                        message: e.errorData?.message,
                        jobId: e.id,
                        txnRemark: e?.txnRemark,
                        similarUserList: e?.errorData?.details || []
                    };
                    t("on-add-username", o)
                }
                  , D = e=>{
                    const t = e?.split("@")[0];
                    return t || ""
                }
                  , B = e=>e.status === dt.uH.ERROR && e.jobType === dt.O4.WITHDRAW
                  , L = e=>{
                    t("edit-bank-partner", e)
                }
                  , W = e=>{
                    t("confirm-otp", e)
                }
                ;
                return (t,o)=>{
                    const s = (0,
                    a.up)("UserPlusIcon")
                      , d = (0,
                    a.up)("UserIcon")
                      , U = (0,
                    a.up)("CreditCardIcon")
                      , S = (0,
                    a.up)("editIcon");
                    return (0,
                    a.wg)(),
                    (0,
                    a.iD)("div", pt, [(0,
                    a._)("div", bt, [(0,
                    a._)("div", gt, [(0,
                    a._)("table", wt, [(0,
                    a._)("thead", null, [(0,
                    a._)("tr", ht, [ft, (0,
                    a._)("th", kt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.channel")), 1), (0,
                    a._)("th", xt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.type")), 1), (0,
                    a._)("th", vt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.amount")), 1), (0,
                    a._)("th", yt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.transactionAt")), 1), (0,
                    a._)("th", Ct, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.duration")), 1), (0,
                    a._)("th", _t, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.verify")), 1), (0,
                    a._)("th", Jt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.manage")), 1), (0,
                    a._)("th", Ut, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.user")), 1), (0,
                    a._)("th", St, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.memberName")), 1), (0,
                    a._)("th", Pt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.webAccount")), 1), (0,
                    a._)("th", Mt, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.status")), 1), (0,
                    a._)("th", At, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.table.note")), 1)])]), (0,
                    a._)("tbody", null, [((0,
                    a.wg)(!0),
                    (0,
                    a.iD)(a.HY, null, (0,
                    a.Ko)(e.list, ((o,_)=>((0,
                    a.wg)(),
                    (0,
                    a.iD)("tr", {
                        class: (0,
                        n.C_)([`${1 === o.jobType ? "bg-green-50" : "bg-red-50"} ${o.isBlacklist ? "backlist-crosswalk__bg text-white" : ""}`, "p-2 hover:bg-yellow-100 px-half border-b border-gray-300"]),
                        key: _
                    }, [(0,
                    a._)("td", jt, [(0,
                    a.Uk)((0,
                    n.zw)((e.currentPage - 1) * e.limit + _ + 1) + " ", 1), (0,
                    a._)("span", zt, "#" + (0,
                    n.zw)(o.id), 1)]), (0,
                    a._)("td", Ft, [(0,
                    a._)("div", It, [(0,
                    a.Wm)((0,
                    i.SU)(c), {
                        "channel-id": o?.channel
                    }, null, 8, ["channel-id"])])]), (0,
                    a._)("td", Dt, [(0,
                    a.Wm)((0,
                    i.SU)(l), {
                        type: o?.jobType,
                        "promotion-id": o?.promotionId,
                        "promotion-record-id": o?.promotionRecordId,
                        status: o?.status,
                        "job-id": o?.id
                    }, null, 8, ["type", "promotion-id", "promotion-record-id", "status", "job-id"])]), (0,
                    a._)("td", Bt, (0,
                    n.zw)((0,
                    i.SU)(J)(o.amount)), 1), (0,
                    a._)("td", Lt, [(0,
                    a.Wm)((0,
                    i.SU)(u), {
                        "date-time-unix": o.transferredAt || o.createdAt
                    }, null, 8, ["date-time-unix"])]), (0,
                    a._)("td", Wt, (0,
                    n.zw)(M(o.duration)), 1), (0,
                    a._)("td", Rt, [(0,
                    a._)("div", Nt, [o?.checkedBy ? ((0,
                    a.wg)(),
                    (0,
                    a.iD)("div", Tt, [(0,
                    a._)("span", $t, [(0,
                    a._)("div", Ht, [(0,
                    a.Wm)((0,
                    i.SU)(ct.CheckCircleIcon), {
                        class: "w-3 h-3 inline mr-1"
                    }), (0,
                    a.Uk)(" " + (0,
                    n.zw)(D(o.approvedBy || o.checkedBy)), 1)])])])) : (0,
                    a.kq)("", !0), o?.checkedBy || !o.username || C(o) ? (0,
                    a.kq)("", !0) : ((0,
                    a.wg)(),
                    (0,
                    a.j4)((0,
                    i.SU)(b), {
                        key: 1,
                        disabled: e.checkJobLoading,
                        onClick: e=>A(o.id),
                        class: "flex flex-col justify-center items-center py-1 btn btn-outline-pending"
                    }, {
                        default: (0,
                        a.w5)((()=>[e.checkJobLoading && o?.id === x.value ? ((0,
                        a.wg)(),
                        (0,
                        a.j4)((0,
                        i.SU)(g), {
                            key: 0
                        })) : ((0,
                        a.wg)(),
                        (0,
                        a.j4)((0,
                        i.SU)(ct.CheckCircleIcon), {
                            key: 1,
                            name: "check-line",
                            class: "w-3"
                        })), (0,
                        a._)("span", qt, (0,
                        n.zw)(t.$t("check")), 1)])),
                        _: 2
                    }, 1032, ["disabled", "onClick"]))]), o?.checkedBy || o.username ? (0,
                    a.kq)("", !0) : ((0,
                    a.wg)(),
                    (0,
                    a.iD)("div", Et, "-"))]), (0,
                    a._)("td", Ot, [(0,
                    a.Wm)((0,
                    i.SU)(f), {
                        item: o,
                        denyJobLoading: e.denyJobLoading,
                        approveJobLoading: e.approveJobLoading,
                        manualJobSuccessLoading: e.manualJobSuccessLoading,
                        onDenyJob: j,
                        onApproveJob: z,
                        onManualJobSuccess: F,
                        onConfirmOtp: W
                    }, null, 8, ["item", "denyJobLoading", "approveJobLoading", "manualJobSuccessLoading"])]), (0,
                    a._)("td", Vt, [(0,
                    a.Wm)((0,
                    i.SU)(h), {
                        username: o?.username,
                        "member-id": o.memberId,
                        "member-notes": o?.memberNotes
                    }, null, 8, ["username", "member-id", "member-notes"]), !o?.username && o?.status ? ((0,
                    a.wg)(),
                    (0,
                    a.iD)("button", {
                        key: 0,
                        onClick: e=>I(o),
                        class: "btn font-semibold btn-pending btn-xs btn-elevated min-w-max font-display shadow-lg hover:shadow-none"
                    }, [(0,
                    a.Wm)(s, {
                        class: "mr-1.5 w-3"
                    }), (0,
                    a.Uk)(" " + (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.pending.specifyUser")), 1)], 8, Zt)) : (0,
                    a.kq)("", !0)]), (0,
                    a._)("td", Xt, [y(o) ? ((0,
                    a.wg)(),
                    (0,
                    a.iD)("div", Yt, [o?.fullname && o?.phone ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)((0,
                    i.SU)(m), {
                        key: 0,
                        "bank-code": (0,
                        i.SU)(v).TMN?.toUpperCase(),
                        "account-name": o?.fullname,
                        "account-number": o?.phone
                    }, null, 8, ["bank-code", "account-name", "account-number"])) : ((0,
                    a.wg)(),
                    (0,
                    a.iD)("div", Gt, [(0,
                    a.Wm)((0,
                    i.SU)(w), {
                        "bank-code": (0,
                        i.SU)(v).TMN?.toUpperCase(),
                        "logo-class": "rounded w-7 h-7"
                    }, null, 8, ["bank-code"]), (0,
                    a._)("span", Kt, (0,
                    n.zw)(o?.txnRemark || "-"), 1)]))])) : (0,
                    a.kq)("", !0), y(o) ? (0,
                    a.kq)("", !0) : ((0,
                    a.wg)(),
                    (0,
                    a.iD)("div", Qt, [o?.bankMember ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)((0,
                    i.SU)(m), {
                        key: 0,
                        "bank-code": o?.bankMember?.bankCode,
                        "account-name": o?.bankMember?.accountName,
                        "account-number": o?.bankMember?.accountNumber
                    }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
                    a.kq)("", !0), (0,
                    a.wy)((0,
                    a._)("span", eo, [o?.fullname ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)(d, {
                        key: 0,
                        class: "h-6 w-6 mx-1.5"
                    })) : (0,
                    a.kq)("", !0), (0,
                    a.Uk)(" " + (0,
                    n.zw)(o?.fullname), 1)], 512), [[it.F8, !o?.bankMember]]), (0,
                    a.wy)((0,
                    a._)("div", to, [(0,
                    a._)("div", oo, [(0,
                    a.Wm)(U)]), (0,
                    a._)("span", ao, (0,
                    n.zw)(o?.txnRemark || "-"), 1)], 512), [[it.F8, !o?.bankMember && !o.fullname]])]))]), (0,
                    a._)("td", no, [(0,
                    a._)("div", so, [(0,
                    a._)("div", lo, [B(o) ? ((0,
                    a.wg)(),
                    (0,
                    a.iD)("div", {
                        key: 0,
                        class: "group relative cursor-pointer hover:bg-primary p-1 rounded",
                        onClick: e=>L(o)
                    }, [(0,
                    a.Wm)(S, {
                        class: "group-hover:text-white"
                    }), (0,
                    a._)("div", io, (0,
                    n.zw)((0,
                    i.SU)(k)("txJob.changeBank.editBankAccount")), 1)], 8, ro)) : (0,
                    a.kq)("", !0)]), o?.bankPartner ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)((0,
                    i.SU)(m), {
                        key: 0,
                        "bank-code": o?.bankPartner?.bankCode,
                        "account-name": o?.bankPartner?.accountName,
                        "account-number": o?.bankPartner?.accountNumber
                    }, null, 8, ["bank-code", "account-name", "account-number"])) : (0,
                    a.kq)("", !0)])]), (0,
                    a._)("td", co, [o?.status ? ((0,
                    a.wg)(),
                    (0,
                    a.j4)((0,
                    i.SU)(r), {
                        key: 0,
                        status: o?.status
                    }, null, 8, ["status"])) : (0,
                    a.kq)("", !0)]), (0,
                    a._)("td", uo, [(0,
                    a._)("div", mo, [(0,
                    a.Wm)((0,
                    i.SU)(p), {
                        "error-code": o?.errorCode,
                        notes: o?.notes,
                        hint: o?.errorData?.message
                    }, null, 8, ["error-code", "notes", "hint"])])])], 2)))), 128)), (0,
                    a.wy)((0,
                    a._)("tr", po, [(0,
                    a._)("td", bo, (0,
                    n.zw)((0,
                    i.SU)(k)("notFound")), 1)], 512), [[it.F8, !e.loading && !(0,
                    i.SU)(_)]]), (0,
                    a.wy)((0,
                    a._)("tr", go, [(0,
                    a._)("td", wo, [(0,
                    a.Wm)((0,
                    i.SU)(g), null, {
                        default: (0,
                        a.w5)((()=>[(0,
                        a.Uk)((0,
                        n.zw)((0,
                        i.SU)(k)("loading")) + " . . .", 1)])),
                        _: 1
                    })])], 512), [[it.F8, e.loading && !(0,
                    i.SU)(_)]])])])])])])
                }
            }
        });
        const ko = fo;
        var xo = ko
          , vo = o(68178);
        const yo = (0,
        a.RC)((()=>o.e(25182).then(o.bind(o, 25182))))
          , Co = (0,
        a.RC)((()=>Promise.all([o.e(32900), o.e(71153)]).then(o.bind(o, 71153))))
          , _o = (0,
        a.RC)((()=>o.e(23123).then(o.bind(o, 23123))))
          , Jo = (0,
        a.RC)((()=>o.e(25010).then(o.bind(o, 25010))))
          , Uo = (0,
        a.RC)((()=>o.e(87489).then(o.bind(o, 87489))));
        var So = (0,
        a.aZ)({
            name: "TxJobPendingContainerTable",
            components: {
                ConfirmOtpModal: Uo,
                RejectJobModal: Jo,
                ConfirmJobModal: _o,
                EditBankPartnerModal: Co,
                ManualJobSuccessModal: yo,
                AddUserModal: rt,
                JobTable: xo,
                TemplateContent: p["default"],
                Pagination: b["default"],
                LoadingCircle: g["default"],
                Tooltip: vo["default"]
            },
            setup() {
                const {t: e} = (0,
                d.QT)()
                  , t = (0,
                c.oR)()
                  , o = (0,
                i.iH)()
                  , n = (0,
                i.iH)()
                  , s = (0,
                i.iH)(1)
                  , l = (0,
                i.iH)(null);
                (0,
                a.bv)((async()=>{
                    await t.dispatch("txJob/getTxJobPending")
                }
                ));
                const r = (0,
                a.Fl)((()=>t.getters["wait/is"]("loading.getTxJobPending")))
                  , u = (0,
                a.Fl)((()=>t.getters["wait/is"]("loading.approveJob")))
                  , p = (0,
                a.Fl)((()=>t.getters["wait/is"]("loading.denyJob")))
                  , b = (0,
                a.Fl)((()=>t.getters["wait/is"]("loading.checkJob")))
                  , g = (0,
                a.Fl)((()=>t.getters["wait/is"]("loading.manualJobSuccess")))
                  , w = (0,
                a.Fl)((()=>t.state.txJob.isShowManualJobSuccessModal))
                  , h = (0,
                a.Fl)((()=>t.state.txJob.isShowCreateModal))
                  , f = (0,
                a.Fl)((()=>t.state.txJob.isShowDeleteModal))
                  , k = (0,
                a.Fl)((()=>t.state.txJob.txJobPendingList?.length ? m()([...t.state.txJob.txJobPendingList], "id") : []))
                  , x = (0,
                a.Fl)((()=>t.state.txJob.isShowAddUsernameModal))
                  , v = (0,
                a.Fl)((()=>t.state.txJob.isShowConfirmAddUserModal))
                  , y = (0,
                a.Fl)((()=>t.state.txJob.isShowEditBankPartnerModal))
                  , C = (0,
                a.Fl)((()=>t.state.txJob.isShowConfirmJobModal))
                  , _ = (0,
                a.Fl)((()=>t.state.txJob.isShowRejectJobModal))
                  , J = (0,
                a.Fl)((()=>t.state.txJob.isShowConfirmOtpModal))
                  , U = (0,
                a.Fl)((()=>t.state.txJob.txJobPendingPagination))
                  , S = e=>{
                    s.value = e,
                    s.value && P()
                }
                  , P = async()=>{
                    await t.dispatch("txJob/getTxJobPending", `&page=${s.value}`)
                }
                  , M = async e=>{
                    await t.dispatch("txJob/checkJob", e)
                }
                  , A = async e=>{
                    n.value = e,
                    t.commit("txJob/setShowRejectJobModal", !0)
                }
                  , j = async e=>{
                    n.value = e,
                    t.commit("txJob/setShowConfirmJobModal", !0)
                }
                  , z = e=>{
                    l.value = e,
                    t.commit("txJob/setShowAddUsernameModal", !0)
                }
                  , F = async e=>{
                    const o = {
                        jobId: Number(l.value?.jobId),
                        memberId: e
                    };
                    await t.dispatch("txJob/matchUsernameJob", o)
                }
                  , I = async e=>{
                    n.value = e,
                    t.commit("txJob/setShowManualJobSuccessModal", !0)
                }
                  , D = ()=>{
                    P()
                }
                  , B = e=>{
                    n.value = e,
                    t.commit("txJob/setShowEditBankPartnerModal", !0)
                }
                  , L = e=>{
                    n.value = e,
                    t.commit("txJob/setShowConfirmOtpModal", !0)
                }
                ;
                return (0,
                a.YP)(x, (e=>{
                    e || (l.value = null)
                }
                )),
                (0,
                a.YP)(y, (e=>{
                    e || (n.value = null)
                }
                )),
                (0,
                a.YP)(C, (e=>{
                    e || (n.value = null,
                    t.commit("txJob/setJobItem", null))
                }
                )),
                (0,
                a.YP)(_, (e=>{
                    e || (n.value = null)
                }
                )),
                {
                    isShowConfirmOtpModal: J,
                    isShowRejectJobModal: _,
                    isShowConfirmJobModal: C,
                    isShowEditBankPartnerModal: y,
                    addUserItem: l,
                    isShowConfirmAddUserModal: v,
                    isShowManualJobSuccessModal: w,
                    jobItem: n,
                    approveJobLoading: u,
                    denyJobLoading: p,
                    checkJobLoading: b,
                    manualJobSuccessLoading: g,
                    pageMeta: U,
                    loadingGetTxJobPendingList: r,
                    deleteDepositItem: o,
                    isShowCreateModal: h,
                    txJobPendingList: k,
                    isShowDeleteModal: f,
                    isShowAddUsernameModal: x,
                    onConfirmOtp: L,
                    onChangePage: S,
                    fetchTxPendingJob: P,
                    onCheckJob: M,
                    onDenyJob: A,
                    onApproveJob: j,
                    onAddUsername: z,
                    onSubmitAddUser: F,
                    onReloadJobList: D,
                    onManualJobSuccess: I,
                    onEditBankPartner: B,
                    t: e
                }
            }
        });
        const Po = (0,
        we.Z)(So, [["render", r]]);
        var Mo = Po
    }
}]);
