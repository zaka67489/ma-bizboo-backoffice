"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[87829], {
    87829: function(e, r, t) {
        t.r(r),
        t.d(r, {
            default: function() {
                return b
            }
        });
        var o = t(88412)
          , n = t(51538);
        const s = {
            key: 0,
            class: ""
        }
          , c = {
            class: "w-12 flex items-center justify-center"
        }
          , i = ["src"]
          , u = {
            class: "hidden group-hover:flex justify-center cursor-pointer absolute top-8 bg-gray-700 text-white rounded px-1 before:content-['⬥'] before:pt-2 before:text-gray-700 before:absolute w-[70px] before:bottom-2 before:left-1/2"
        };
        function d(e, r, t, d, l, a) {
            return e.qrCodeString ? ((0,
            o.wg)(),
            (0,
            o.iD)("div", s, [(0,
            o._)("div", {
                onClick: r[0] || (r[0] = r=>e.onShowQrCode(e.qrCodeString)),
                class: "group rounded-full flex items-center justify-center"
            }, [(0,
            o._)("div", c, [e.qrCodeString ? ((0,
            o.wg)(),
            (0,
            o.iD)("img", {
                key: 0,
                src: e.qrCodeString,
                alt: "qr code",
                class: "w-9 h-9 object-center cursor-pointer"
            }, null, 8, i)) : (0,
            o.kq)("", !0)]), (0,
            o._)("div", u, (0,
            n.zw)(e.t("transfer.qrCodeDetail")), 1)])])) : (0,
            o.kq)("", !0)
        }
        var l = t(81120)
          , a = (0,
        o.aZ)({
            name: "JobUsername",
            props: {
                qrCodeString: {
                    type: String,
                    default: ""
                }
            },
            setup(e, {emit: r}) {
                const {t: t} = (0,
                l.QT)()
                  , o = e=>{
                    e && r("show-qr-code", e)
                }
                ;
                return {
                    t: t,
                    onShowQrCode: o
                }
            }
        })
          , f = t(57886);
        const p = (0,
        f.Z)(a, [["render", d]]);
        var b = p
    }
}]);
