"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[25707], {
    32902: function(e, t, n) {
        n.d(t, {
            w: function() {
                return a
            }
        });
        var o = n(90714);
        function a() {
            const e = e=>e === o.hX.SMK88PAY?.toLocaleUpperCase();
            return {
                isSmk88Pay: e
            }
        }
    },
    25707: function(e, t, n) {
        n.r(t),
        n.d(t, {
            default: function() {
                return m
            }
        });
        var o = n(88412)
          , a = n(37325)
          , r = n(51538)
          , l = n(32902)
          , s = n(81120);
        const i = {
            class: "flex items-center text-left pl-1 w-48 relative"
        }
          , c = {
            key: 1,
            class: "pl-2"
        }
          , u = {
            class: "flex items-center"
        }
          , d = {
            class: "hidden group-hover:block absolute top-0 -right-1 bg-gray-700 text-white rounded px-1 before:content-['⬥'] before:text-gray-700 before:absolute before:-left-[0.3rem]"
        }
          , b = {
            key: 2,
            class: "pl-2"
        }
          , f = (0,
        o._)("div", null, "-", -1)
          , k = [f];
        var p = (0,
        o.aZ)({
            __name: "JobBankAccount",
            props: {
                bankCode: {
                    type: String,
                    default: ()=>""
                },
                accountName: {
                    type: String,
                    default: ()=>""
                },
                accountNumber: {
                    type: String,
                    default: ()=>""
                },
                isDetail: {
                    type: Boolean,
                    default: ()=>!1
                }
            },
            emits: ["show-detail"],
            setup(e, {emit: t}) {
                const f = e
                  , p = (0,
                o.RC)((()=>n.e(17679).then(n.bind(n, 17679))))
                  , {t: w} = (0,
                s.QT)()
                  , {isSmk88Pay: m} = (0,
                l.w)()
                  , g = (0,
                o.Fl)((()=>{
                    const e = f?.accountNumber?.split("+");
                    return e[0]
                }
                ))
                  , h = ()=>{
                    t("show-detail")
                }
                ;
                return (t,n)=>{
                    const l = (0,
                    o.up)("Icon");
                    return (0,
                    o.wg)(),
                    (0,
                    o.iD)("div", i, [e.bankCode ? ((0,
                    o.wg)(),
                    (0,
                    o.j4)((0,
                    a.SU)(p), {
                        key: 0,
                        "bank-code": e.bankCode,
                        "logo-class": "rounded w-7 h-7"
                    }, null, 8, ["bank-code"])) : (0,
                    o.kq)("", !0), e.accountNumber ? ((0,
                    o.wg)(),
                    (0,
                    o.iD)("div", c, [(0,
                    o._)("div", u, [(0,
                    o.Uk)((0,
                    r.zw)((0,
                    a.SU)(m)(e.bankCode) ? "" : (0,
                    a.SU)(g)) + " ", 1), e.isDetail ? ((0,
                    o.wg)(),
                    (0,
                    o.iD)("div", {
                        key: 0,
                        onClick: h,
                        class: "group rounded-full w-4 h-4 hover:bg-gray-100 flex items-center justify-center mr-1 cursor-pointer"
                    }, [(0,
                    o.Wm)(l, {
                        icon: "material-symbols:info-outline",
                        class: "w-3.5 h-3.5"
                    }), (0,
                    o._)("div", d, (0,
                    r.zw)((0,
                    a.SU)(w)("txJob.detail")), 1)])) : (0,
                    o.kq)("", !0)]), (0,
                    o._)("div", null, (0,
                    r.zw)(e.accountName), 1)])) : ((0,
                    o.wg)(),
                    (0,
                    o.iD)("div", b, k))])
                }
            }
        });
        const w = p;
        var m = w
    }
}]);
