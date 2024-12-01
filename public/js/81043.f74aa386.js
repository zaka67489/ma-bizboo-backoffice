"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[81043], {
    81043: function(e, o, r) {
        r.r(o),
        r.d(o, {
            default: function() {
                return b
            }
        });
        var a = r(88412)
          , n = r(51538);
        const t = {
            class: "p-4 border-b border-white/[0.08] dark:border-dark-3"
        }
          , i = {
            class: "font-medium"
        }
          , l = {
            class: "text-xs text-slate-200 mt-0.5 dark:text-gray-600"
        }
          , s = {
            class: "p-2"
        }
          , d = {
            class: "p-2 border-t border-white/[0.08] dark:border-dark-3"
        };
        function c(e, o, r, c, u, g) {
            const p = (0,
            a.up)("SelectLanguage")
              , m = (0,
            a.up)("UserIcon")
              , w = (0,
            a.up)("DropdownToggle")
              , k = (0,
            a.up)("router-link")
              , f = (0,
            a.up)("DropdownItem")
              , h = (0,
            a.up)("LockIcon")
              , b = (0,
            a.up)("loading-circle")
              , v = (0,
            a.up)("HomeIcon")
              , C = (0,
            a.up)("ToggleRightIcon")
              , _ = (0,
            a.up)("DropdownContent")
              , L = (0,
            a.up)("DropdownMenu")
              , y = (0,
            a.up)("Dropdown");
            return (0,
            a.wg)(),
            (0,
            a.iD)(a.HY, null, [(0,
            a.Wm)(p, {
                class: "hidden md:block"
            }), (0,
            a.Wm)(y, {
                "close-on-click-item": ""
            }, {
                default: (0,
                a.w5)((()=>[(0,
                a.Wm)(w, {
                    class: "w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110 flex items-center justify-center bg-primary"
                }, {
                    default: (0,
                    a.w5)((()=>[(0,
                    a.Wm)(m, {
                        class: "text-white"
                    })])),
                    _: 1
                }), (0,
                a.Wm)(L, {
                    class: "!w-48"
                }, {
                    default: (0,
                    a.w5)((()=>[(0,
                    a.Wm)(_, {
                        class: "bg-primary dark:bg-dark-6 text-white"
                    }, {
                        default: (0,
                        a.w5)((()=>[(0,
                        a._)("div", t, [(0,
                        a._)("div", i, (0,
                        n.zw)(e.username), 1), (0,
                        a._)("div", l, (0,
                        n.zw)(e.t("profile.partner")) + ": " + (0,
                        n.zw)(e.partnerName), 1)]), (0,
                        a._)("div", s, [(0,
                        a.Wm)(f, {
                            tag: "div",
                            class: "hover:bg-primary dark:hover:bg-dark-3"
                        }, {
                            default: (0,
                            a.w5)((()=>[(0,
                            a.Wm)(k, {
                                class: "flex items-center transition duration-300 ease-in-out hover:bg-primary dark:hover:bg-dark-3 rounded-md",
                                to: "/profile"
                            }, {
                                default: (0,
                                a.w5)((()=>[(0,
                                a.Wm)(m, {
                                    class: "w-4 h-4 mr-2"
                                }), (0,
                                a.Uk)(" " + (0,
                                n.zw)(e.t("profile.label")), 1)])),
                                _: 1
                            })])),
                            _: 1
                        }), (0,
                        a.Wm)(f, {
                            tag: "div",
                            class: "flex items-center p-2 transition duration-300 ease-in-out hover:bg-primary dark:hover:bg-dark-3 rounded-md cursor-pointer capitalize",
                            onClick: e.onShowChangePasswordModal
                        }, {
                            default: (0,
                            a.w5)((()=>[(0,
                            a.Wm)(h, {
                                class: "w-4 h-4 mr-2"
                            }), (0,
                            a.Uk)(" " + (0,
                            n.zw)(e.t("profile.changePassword")), 1)])),
                            _: 1
                        }, 8, ["onClick"]), e.forceLogin ? ((0,
                        a.wg)(),
                        (0,
                        a.j4)(f, {
                            key: 0,
                            tag: "div",
                            class: "flex items-center p-2 transition duration-300 ease-in-out hover:bg-warning dark:hover:bg-dark-3 rounded-md cursor-pointer",
                            onClick: e.onClickLoginBo
                        }, {
                            default: (0,
                            a.w5)((()=>[e.loadingLoginBo ? ((0,
                            a.wg)(),
                            (0,
                            a.j4)(b, {
                                key: 0,
                                class: "w-4 h-4 mr-2",
                                loading: e.loadingLoginBo
                            }, null, 8, ["loading"])) : ((0,
                            a.wg)(),
                            (0,
                            a.j4)(v, {
                                key: 1,
                                class: "w-4 h-4 mr-2"
                            })), (0,
                            a.Uk)(" " + (0,
                            n.zw)(e.t("profile.loginBackOffice")), 1)])),
                            _: 1
                        }, 8, ["onClick"])) : (0,
                        a.kq)("", !0)]), (0,
                        a._)("div", d, [(0,
                        a._)("button", {
                            onClick: o[0] || (o[0] = (...o)=>e.onClickLogout && e.onClickLogout(...o)),
                            class: "flex items-center p-2 transition duration-300 ease-in-out hover:bg-primarydark:hover:bg-dark-3 rounded-md w-full focus:outline-none"
                        }, [(0,
                        a.Wm)(C, {
                            class: "w-4 h-4 mr-2"
                        }), (0,
                        a.Uk)(" " + (0,
                        n.zw)(e.t("profile.logout")), 1)])])])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })], 64)
        }
        var u = r(37325)
          , g = r(29260)
          , p = r(81120);
        const m = (0,
        a.RC)((()=>Promise.resolve().then(r.bind(r, 60065))))
          , w = (0,
        a.RC)((()=>Promise.resolve().then(r.bind(r, 11823))));
        var k = (0,
        a.aZ)({
            components: {
                SelectLanguage: m,
                LoadingCircle: w
            },
            setup() {
                const {t: e} = (0,
                p.QT)()
                  , o = (0,
                u.iH)(!1)
                  , r = (0,
                u.iH)(!1)
                  , n = (0,
                g.oR)()
                  , t = (0,
                a.Fl)((()=>n.getters["wait/is"]("loading.loginBo")))
                  , i = async()=>{
                    await n.dispatch("auth/logout"),
                    o.value = !0
                }
                  , l = (0,
                a.Fl)((()=>n.state.profile?.username || "-"))
                  , s = (0,
                a.Fl)((()=>n.state.profile?.partnerName || "-"))
                  , d = (0,
                a.Fl)((()=>n.state.profile?.forceLogin));
                (0,
                a.bv)((()=>{
                    n.dispatch("profile/getUserProfile")
                }
                ));
                const c = ()=>{
                    n.commit("profile/setShowChangePasswordModal", !0)
                }
                  , m = async()=>{
                    await n.dispatch("auth/loginBo"),
                    o.value = !0
                }
                ;
                return {
                    t: e,
                    isMobile: r,
                    forceLogin: d,
                    loadingLoginBo: t,
                    isHiddenMenu: o,
                    username: l,
                    partnerName: s,
                    onClickLoginBo: m,
                    onShowChangePasswordModal: c,
                    onClickLogout: i,
                    open: open
                }
            }
        })
          , f = r(57886);
        const h = (0,
        f.Z)(k, [["render", c]]);
        var b = h
    }
}]);
