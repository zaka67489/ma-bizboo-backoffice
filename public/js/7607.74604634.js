"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[7607], {
    7607: function(t, o, e) {
        e.r(o),
        e.d(o, {
            default: function() {
                return p
            }
        });
        var n = e(88412)
          , s = e(37325)
          , a = e(64106)
          , r = e(29260)
          , c = e(93273)
          , l = e(969)
          , i = e(9272)
          , u = e(90026);
        const d = ["disabled"]
          , g = (0,
        n._)("img", {
            src: "/image/icons/google-logo.svg",
            class: "mr-6"
        }, null, -1)
          , k = {
            name: "GoogleSignInButton"
        };
        var G = (0,
        n.aZ)({
            ...k,
            setup(t) {
                const o = (0,
                r.oR)()
                  , e = (0,
                n.Fl)((()=>o.getters["wait/is"]("loading.login")))
                  , k = async t=>{
                    const e = "https://bo.usun.cash";
                    if (t?.code && e)
                        try {
                            const n = await (0,
                            u.r)({
                                url: i.F.LOGIN_GOOGLE.url,
                                method: i.F.LOGIN_GOOGLE.method,
                                data: {
                                    code: t?.code,
                                    redirectUrl: e
                                }
                            }, {
                                loadingKey: "loading.login"
                            });
                            200 === n?.status && n.data?.token && (await o.dispatch("auth/setLoginSuccess", {
                                token: n.data?.token
                            }),
                            await l.Z.replace("/"))
                        } catch (n) {
                            const t = n;
                            a.error(t)
                        }
                }
                  , G = t=>{
                    console.error("Google Login Error: ", t)
                }
                  , {isReady: h, login: p} = (0,
                c.In)({
                    onSuccess: k,
                    onError: G
                })
                  , b = ()=>{
                    p()
                }
                ;
                return (t,o)=>((0,
                n.wg)(),
                (0,
                n.iD)("button", {
                    disabled: !(0,
                    s.SU)(h) || (0,
                    s.SU)(e),
                    class: "btn btn-elevated w-full",
                    type: "button",
                    onClick: b
                }, [g, (0,
                n.Uk)("SIGN IN WITH GOOGLE ")], 8, d))
            }
        });
        const h = G;
        var p = h
    }
}]);
