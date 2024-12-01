"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[40229], {
    40229: function(e, t, s) {
        s.r(t),
        s.d(t, {
            default: function() {
                return f
            }
        });
        var a = s(88412)
          , n = s(51538);
        const l = {
            class: "rounded-lg"
        }
          , r = {
            key: 0,
            class: "text-xs text-gray-800 ml-0.5 font-light"
        }
          , i = {
            class: "bg-gray-50 border border-gray-100 rounded-lg p-3 mt-3"
        }
          , o = ["innerHTML"]
          , c = ["innerHTML"];
        function d(e, t, s, d, u, p) {
            const g = (0,
            a.up)("Icon")
              , m = (0,
            a.up)("starIcon")
              , h = (0,
            a.up)("template-content");
            return (0,
            a.wg)(),
            (0,
            a.j4)(h, null, {
                "header-title": (0,
                a.w5)((()=>[(0,
                a.Wm)(g, {
                    icon: "fluent-mdl2:release-definition",
                    class: "text-blue-800 mr-3",
                    width: "24",
                    height: "24"
                }), (0,
                a.Uk)(" " + (0,
                n.zw)(e.t("dashboard.releaseNotes.label")), 1)])),
                "page-content": (0,
                a.w5)((()=>[(0,
                a._)("div", l, [((0,
                a.wg)(!0),
                (0,
                a.iD)(a.HY, null, (0,
                a.Ko)(e.filterList, ((t,s)=>((0,
                a.wg)(),
                (0,
                a.iD)("div", {
                    key: s,
                    class: "pb-3"
                }, [(0,
                a._)("div", {
                    class: (0,
                    n.C_)([s > 0 && "border-t-2  pt-3 mt-3", "font-semibold text-lg flex items-center"])
                }, [(0,
                a.Wm)(m, {
                    class: "mr-1 w-6 h-6"
                }), (0,
                a.Uk)(" " + (0,
                n.zw)(e.getFormatDate(t.releaseDate)) + " ", 1), s ? (0,
                a.kq)("", !0) : ((0,
                a.wg)(),
                (0,
                a.iD)("span", r, " (" + (0,
                n.zw)(e.t("releaseNote.latest")) + ") ", 1))], 2), (0,
                a._)("div", i, [e.isThai ? ((0,
                a.wg)(),
                (0,
                a.iD)("div", {
                    key: 0,
                    innerHTML: t.thai,
                    class: "prose prose-sm prose-headings:mb-2"
                }, null, 8, o)) : ((0,
                a.wg)(),
                (0,
                a.iD)("div", {
                    key: 1,
                    innerHTML: t.english,
                    class: "prose prose-sm prose-headings:mb-2"
                }, null, 8, c))])])))), 128))])])),
                _: 1
            })
        }
        var u = s(64838)
          , p = s(81120)
          , g = s(29260);
        const m = (0,
        a.RC)((()=>s.e(55689).then(s.bind(s, 55689))));
        var h = (0,
        a.aZ)({
            name: "ReleaseNoteListContainer",
            components: {
                TemplateContent: m
            },
            setup() {
                const {t: e, locale: t} = (0,
                p.QT)()
                  , s = (0,
                g.oR)()
                  , n = (0,
                a.Fl)((()=>"th" === t.value));
                (0,
                a.bv)((async()=>{
                    const e = {
                        page: 1
                    };
                    await s.dispatch("releaseNote/getReleaseNoteList", e)
                }
                ));
                const l = (0,
                a.Fl)((()=>s.state.releaseNote.releaseNoteList))
                  , r = (0,
                a.Fl)((()=>l.value?.filter(((e,t)=>t <= 2))))
                  , i = e=>e ? (0,
                u.o0)(1e3 * e, "DD/MM/YY HH:mm") : "";
                return {
                    t: e,
                    isThai: n,
                    filterList: r,
                    getFormatDate: i
                }
            }
        })
          , w = s(57886);
        const b = (0,
        w.Z)(h, [["render", d]]);
        var f = b
    }
}]);
