"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[59215], {
    59215: function(t, e, s) {
        s.r(e),
        s.d(e, {
            default: function() {
                return m
            }
        });
        var l = s(88412)
          , a = s(51538);
        const o = {
            key: 0,
            "data-backdrop": "static",
            class: "modal overflow-y-auto show z-[60] m-0 p-0"
        }
          , n = {
            class: "modal-content"
        }
          , d = {
            class: "font-medium font-display mr-auto text-lg"
        };
        function i(t, e, s, i, r, u) {
            const c = (0,
            l.up)("XIcon");
            return t.isShow ? ((0,
            l.wg)(),
            (0,
            l.iD)("div", o, [(0,
            l._)("div", {
                class: (0,
                a.C_)([t.modalClass, "modal-dialog mx-auto my-3 flex justify-center items-center"])
            }, [(0,
            l._)("div", n, [(0,
            l._)("div", {
                class: (0,
                a.C_)([t.headerClass, "modal-header flex justify-between sticky top-0 rounded-t-md z-50"])
            }, [(0,
            l._)("h2", d, (0,
            a.zw)(t.title), 1), (0,
            l.Wm)(c, {
                class: "cursor-pointer",
                onClick: t.onClose
            }, null, 8, ["onClick"])], 2), (0,
            l.WI)(t.$slots, "default")])], 2)])) : (0,
            l.kq)("", !0)
        }
        var r = (0,
        l.aZ)({
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
            setup(t, {emit: e}) {
                const s = ()=>{
                    e("close")
                }
                ;
                return {
                    onClose: s
                }
            }
        })
          , u = s(57886);
        const c = (0,
        u.Z)(r, [["render", i]]);
        var m = c
    }
}]);
