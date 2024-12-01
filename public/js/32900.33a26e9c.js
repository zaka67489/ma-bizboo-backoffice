"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[32900], {
    32900: function(e, t, l) {
        l.d(t, {
            Ri: function() {
                return X
            },
            Y4: function() {
                return ee
            },
            wt: function() {
                return le
            },
            O_: function() {
                return te
            }
        });
        l(46906);
        var n = l(88412)
          , o = l(37325);
        function a(e, t, ...l) {
            if (e in t) {
                let n = t[e];
                return "function" == typeof n ? n(...l) : n
            }
            let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e=>`"${e}"`)).join(", ")}.`);
            throw Error.captureStackTrace && Error.captureStackTrace(n, a),
            n
        }
        var r = (e=>(e[e.None = 0] = "None",
        e[e.RenderStrategy = 1] = "RenderStrategy",
        e[e.Static = 2] = "Static",
        e))(r || {})
          , i = (e=>(e[e.Unmount = 0] = "Unmount",
        e[e.Hidden = 1] = "Hidden",
        e))(i || {});
        function u({visible: e=!0, features: t=0, ourProps: l, theirProps: n, ...o}) {
            var r;
            let i = v(n, l)
              , u = Object.assign(o, {
                props: i
            });
            if (e || 2 & t && i.static)
                return s(u);
            if (1 & t) {
                let e = null == (r = i.unmount) || r ? 0 : 1;
                return a(e, {
                    [0]() {
                        return null
                    },
                    [1]() {
                        return s({
                            ...o,
                            props: {
                                ...i,
                                hidden: !0,
                                style: {
                                    display: "none"
                                }
                            }
                        })
                    }
                })
            }
            return s(u)
        }
        function s({props: e, attrs: t, slots: l, slot: o, name: a}) {
            var r;
            let {as: i, ...u} = c(e, ["unmount", "static"])
              , s = null == (r = l.default) ? void 0 : r.call(l, o)
              , v = {};
            if (o) {
                let e = !1
                  , t = [];
                for (let[l,n] of Object.entries(o))
                    "boolean" == typeof n && (e = !0),
                    !0 === n && t.push(l);
                e && (v["data-headlessui-state"] = t.join(" "))
            }
            if ("template" === i) {
                if (s = d(null != s ? s : []),
                Object.keys(u).length > 0 || Object.keys(t).length > 0) {
                    let[e,...l] = null != s ? s : [];
                    if (!f(e) || l.length > 0)
                        throw new Error(['Passing props on "template"!', "", `The current component <${a} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(u).concat(Object.keys(t)).sort(((e,t)=>e.localeCompare(t))).map((e=>`  - ${e}`)).join("\n"), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((e=>`  - ${e}`)).join("\n")].join("\n"));
                    return (0,
                    n.Ho)(e, Object.assign({}, u, v))
                }
                return Array.isArray(s) && 1 === s.length ? s[0] : s
            }
            return (0,
            n.h)(i, Object.assign({}, u, v), {
                default: ()=>s
            })
        }
        function d(e) {
            return e.flatMap((e=>e.type === n.HY ? d(e.children) : [e]))
        }
        function v(...e) {
            if (0 === e.length)
                return {};
            if (1 === e.length)
                return e[0];
            let t = {}
              , l = {};
            for (let n of e)
                for (let e in n)
                    e.startsWith("on") && "function" == typeof n[e] ? (null != l[e] || (l[e] = []),
                    l[e].push(n[e])) : t[e] = n[e];
            if (t.disabled || t["aria-disabled"])
                return Object.assign(t, Object.fromEntries(Object.keys(l).map((e=>[e, void 0]))));
            for (let n in l)
                Object.assign(t, {
                    [n](e, ...t) {
                        let o = l[n];
                        for (let l of o) {
                            if (e instanceof Event && e.defaultPrevented)
                                return;
                            l(e, ...t)
                        }
                    }
                });
            return t
        }
        function p(e) {
            let t = Object.assign({}, e);
            for (let l in t)
                void 0 === t[l] && delete t[l];
            return t
        }
        function c(e, t=[]) {
            let l = Object.assign({}, e);
            for (let n of t)
                n in l && delete l[n];
            return l
        }
        function f(e) {
            return null != e && ("string" == typeof e.type || "object" == typeof e.type || "function" == typeof e.type)
        }
        let b = 0;
        function m() {
            return ++b
        }
        function h() {
            return m()
        }
        var g = (e=>(e.Space = " ",
        e.Enter = "Enter",
        e.Escape = "Escape",
        e.Backspace = "Backspace",
        e.Delete = "Delete",
        e.ArrowLeft = "ArrowLeft",
        e.ArrowUp = "ArrowUp",
        e.ArrowRight = "ArrowRight",
        e.ArrowDown = "ArrowDown",
        e.Home = "Home",
        e.End = "End",
        e.PageUp = "PageUp",
        e.PageDown = "PageDown",
        e.Tab = "Tab",
        e))(g || {});
        function x(e) {
            throw new Error("Unexpected object: " + e)
        }
        var y = (e=>(e[e.First = 0] = "First",
        e[e.Previous = 1] = "Previous",
        e[e.Next = 2] = "Next",
        e[e.Last = 3] = "Last",
        e[e.Specific = 4] = "Specific",
        e[e.Nothing = 5] = "Nothing",
        e))(y || {});
        function O(e, t) {
            let l = t.resolveItems();
            if (l.length <= 0)
                return null;
            let n = t.resolveActiveIndex()
              , o = null != n ? n : -1
              , a = (()=>{
                switch (e.focus) {
                case 0:
                    return l.findIndex((e=>!t.resolveDisabled(e)));
                case 1:
                    {
                        let e = l.slice().reverse().findIndex(((e,l,n)=>!(-1 !== o && n.length - l - 1 >= o) && !t.resolveDisabled(e)));
                        return -1 === e ? e : l.length - 1 - e
                    }
                case 2:
                    return l.findIndex(((e,l)=>!(l <= o) && !t.resolveDisabled(e)));
                case 3:
                    {
                        let e = l.slice().reverse().findIndex((e=>!t.resolveDisabled(e)));
                        return -1 === e ? e : l.length - 1 - e
                    }
                case 4:
                    return l.findIndex((l=>t.resolveId(l) === e.id));
                case 5:
                    return null;
                default:
                    x(e)
                }
            }
            )();
            return -1 === a ? n : a
        }
        function S(e) {
            var t;
            return null == e || null == e.value ? null : null != (t = e.value.$el) ? t : e.value
        }
        let w = Symbol("Context");
        var L = (e=>(e[e.Open = 0] = "Open",
        e[e.Closed = 1] = "Closed",
        e))(L || {});
        function P() {
            return (0,
            n.f3)(w, null)
        }
        function I(e) {
            (0,
            n.JJ)(w, e)
        }
        function R(e, t) {
            if (e)
                return e;
            let l = null != t ? t : "button";
            return "string" == typeof l && "button" === l.toLowerCase() ? "button" : void 0
        }
        function k(e, t) {
            let l = (0,
            o.iH)(R(e.value.type, e.value.as));
            return (0,
            n.bv)((()=>{
                l.value = R(e.value.type, e.value.as)
            }
            )),
            (0,
            n.m0)((()=>{
                var e;
                l.value || !S(t) || S(t)instanceof HTMLButtonElement && (null == (e = S(t)) || !e.hasAttribute("type")) && (l.value = "button")
            }
            )),
            l
        }
        const D = "undefined" == typeof window || "undefined" == typeof document;
        function j(e) {
            if (D)
                return null;
            if (e instanceof Node)
                return e.ownerDocument;
            if (null != e && e.hasOwnProperty("value")) {
                let t = S(e);
                if (t)
                    return t.ownerDocument
            }
            return document
        }
        let E = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e=>`${e}:not([tabindex='-1'])`)).join(",");
        var T = (e=>(e[e.First = 1] = "First",
        e[e.Previous = 2] = "Previous",
        e[e.Next = 4] = "Next",
        e[e.Last = 8] = "Last",
        e[e.WrapAround = 16] = "WrapAround",
        e[e.NoScroll = 32] = "NoScroll",
        e))(T || {})
          , N = (e=>(e[e.Error = 0] = "Error",
        e[e.Overflow = 1] = "Overflow",
        e[e.Success = 2] = "Success",
        e[e.Underflow = 3] = "Underflow",
        e))(N || {})
          , A = (e=>(e[e.Previous = -1] = "Previous",
        e[e.Next = 1] = "Next",
        e))(A || {});
        var F = (e=>(e[e.Strict = 0] = "Strict",
        e[e.Loose = 1] = "Loose",
        e))(F || {});
        function H(e, t=0) {
            var l;
            return e !== (null == (l = j(e)) ? void 0 : l.body) && a(t, {
                [0]() {
                    return e.matches(E)
                },
                [1]() {
                    let t = e;
                    for (; null !== t; ) {
                        if (t.matches(E))
                            return !0;
                        t = t.parentElement
                    }
                    return !1
                }
            })
        }
        ["textarea", "input"].join(",");
        function U(e, t=(e=>e)) {
            return e.slice().sort(((e,l)=>{
                let n = t(e)
                  , o = t(l);
                if (null === n || null === o)
                    return 0;
                let a = n.compareDocumentPosition(o);
                return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
            }
            ))
        }
        function C(e, t, l) {
            D || (0,
            n.m0)((n=>{
                document.addEventListener(e, t, l),
                n((()=>document.removeEventListener(e, t, l)))
            }
            ))
        }
        function $(e, t, l=(0,
        n.Fl)((()=>!0))) {
            function a(n, o) {
                if (!l.value || n.defaultPrevented)
                    return;
                let a = o(n);
                if (null === a || !a.getRootNode().contains(a))
                    return;
                let r = function e(t) {
                    return "function" == typeof t ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t]
                }(e);
                for (let e of r) {
                    if (null === e)
                        continue;
                    let t = e instanceof HTMLElement ? e : S(e);
                    if (null != t && t.contains(a))
                        return
                }
                return !H(a, F.Loose) && -1 !== a.tabIndex && n.preventDefault(),
                t(n, a)
            }
            let r = (0,
            o.iH)(null);
            C("mousedown", (e=>{
                var t, n;
                l.value && (r.value = (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e)) ? void 0 : n[0]) || e.target)
            }
            ), !0),
            C("click", (e=>{
                !r.value || (a(e, (()=>r.value)),
                r.value = null)
            }
            ), !0),
            C("blur", (e=>a(e, (()=>window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null))), !0)
        }
        var B = (e=>(e[e.None = 1] = "None",
        e[e.Focusable = 2] = "Focusable",
        e[e.Hidden = 4] = "Hidden",
        e))(B || {});
        let V = (0,
        n.aZ)({
            name: "Hidden",
            props: {
                as: {
                    type: [Object, String],
                    default: "div"
                },
                features: {
                    type: Number,
                    default: 1
                }
            },
            setup(e, {slots: t, attrs: l}) {
                return ()=>{
                    let {features: n, ...o} = e
                      , a = {
                        "aria-hidden": 2 === (2 & n) || void 0,
                        style: {
                            position: "fixed",
                            top: 1,
                            left: 1,
                            width: 1,
                            height: 0,
                            padding: 0,
                            margin: -1,
                            overflow: "hidden",
                            clip: "rect(0, 0, 0, 0)",
                            whiteSpace: "nowrap",
                            borderWidth: "0",
                            ...4 === (4 & n) && 2 !== (2 & n) && {
                                display: "none"
                            }
                        }
                    };
                    return u({
                        ourProps: a,
                        theirProps: o,
                        slot: {},
                        attrs: l,
                        slots: t,
                        name: "Hidden"
                    })
                }
            }
        });
        function Y(e={}, t=null, l=[]) {
            for (let[n,o] of Object.entries(e))
                _(l, M(t, n), o);
            return l
        }
        function M(e, t) {
            return e ? e + "[" + t + "]" : t
        }
        function _(e, t, l) {
            if (Array.isArray(l))
                for (let[n,o] of l.entries())
                    _(e, M(t, n.toString()), o);
            else
                l instanceof Date ? e.push([t, l.toISOString()]) : "boolean" == typeof l ? e.push([t, l ? "1" : "0"]) : "string" == typeof l ? e.push([t, l]) : "number" == typeof l ? e.push([t, `${l}`]) : null == l ? e.push([t, ""]) : Y(l, t, e)
        }
        function z(e, t, l) {
            let a = (0,
            o.iH)(null == l ? void 0 : l.value)
              , r = (0,
            n.Fl)((()=>void 0 !== e.value));
            return [(0,
            n.Fl)((()=>r.value ? e.value : a.value)), function(e) {
                return r.value || (a.value = e),
                null == t ? void 0 : t(e)
            }
            ]
        }
        function W(e, t) {
            return e === t
        }
        var Z = (e=>(e[e.Open = 0] = "Open",
        e[e.Closed = 1] = "Closed",
        e))(Z || {})
          , J = (e=>(e[e.Single = 0] = "Single",
        e[e.Multi = 1] = "Multi",
        e))(J || {})
          , K = (e=>(e[e.Pointer = 0] = "Pointer",
        e[e.Other = 1] = "Other",
        e))(K || {});
        function q(e) {
            requestAnimationFrame((()=>requestAnimationFrame(e)))
        }
        let G = Symbol("ListboxContext");
        function Q(e) {
            let t = (0,
            n.f3)(G, null);
            if (null === t) {
                let t = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
                throw Error.captureStackTrace && Error.captureStackTrace(t, Q),
                t
            }
            return t
        }
        let X = (0,
        n.aZ)({
            name: "Listbox",
            emits: {
                "update:modelValue": e=>!0
            },
            props: {
                as: {
                    type: [Object, String],
                    default: "template"
                },
                disabled: {
                    type: [Boolean],
                    default: !1
                },
                by: {
                    type: [String, Function],
                    default: ()=>W
                },
                horizontal: {
                    type: [Boolean],
                    default: !1
                },
                modelValue: {
                    type: [Object, String, Number, Boolean],
                    default: void 0
                },
                defaultValue: {
                    type: [Object, String, Number, Boolean],
                    default: void 0
                },
                name: {
                    type: String,
                    optional: !0
                },
                multiple: {
                    type: [Boolean],
                    default: !1
                }
            },
            inheritAttrs: !1,
            setup(e, {slots: t, attrs: l, emit: r}) {
                let i = (0,
                o.iH)(1)
                  , s = (0,
                o.iH)(null)
                  , d = (0,
                o.iH)(null)
                  , v = (0,
                o.iH)(null)
                  , f = (0,
                o.iH)([])
                  , b = (0,
                o.iH)("")
                  , m = (0,
                o.iH)(null)
                  , h = (0,
                o.iH)(1);
                function g(e=(e=>e)) {
                    let t = null !== m.value ? f.value[m.value] : null
                      , l = U(e(f.value.slice()), (e=>S(e.dataRef.domRef)))
                      , n = t ? l.indexOf(t) : null;
                    return -1 === n && (n = null),
                    {
                        options: l,
                        activeOptionIndex: n
                    }
                }
                let x = (0,
                n.Fl)((()=>e.multiple ? 1 : 0))
                  , [w,P] = z((0,
                n.Fl)((()=>e.modelValue)), (e=>r("update:modelValue", e)), (0,
                n.Fl)((()=>e.defaultValue)))
                  , R = {
                    listboxState: i,
                    value: w,
                    mode: x,
                    compare(t, l) {
                        if ("string" == typeof e.by) {
                            let n = e.by;
                            return (null == t ? void 0 : t[n]) === (null == l ? void 0 : l[n])
                        }
                        return e.by(t, l)
                    },
                    orientation: (0,
                    n.Fl)((()=>e.horizontal ? "horizontal" : "vertical")),
                    labelRef: s,
                    buttonRef: d,
                    optionsRef: v,
                    disabled: (0,
                    n.Fl)((()=>e.disabled)),
                    options: f,
                    searchQuery: b,
                    activeOptionIndex: m,
                    activationTrigger: h,
                    closeListbox() {
                        e.disabled || 1 !== i.value && (i.value = 1,
                        m.value = null)
                    },
                    openListbox() {
                        e.disabled || 0 !== i.value && (i.value = 0)
                    },
                    goToOption(t, l, n) {
                        if (e.disabled || 1 === i.value)
                            return;
                        let o = g()
                          , a = O(t === y.Specific ? {
                            focus: y.Specific,
                            id: l
                        } : {
                            focus: t
                        }, {
                            resolveItems: ()=>o.options,
                            resolveActiveIndex: ()=>o.activeOptionIndex,
                            resolveId: e=>e.id,
                            resolveDisabled: e=>e.dataRef.disabled
                        });
                        b.value = "",
                        m.value = a,
                        h.value = null != n ? n : 1,
                        f.value = o.options
                    },
                    search(t) {
                        if (e.disabled || 1 === i.value)
                            return;
                        let l = "" !== b.value ? 0 : 1;
                        b.value += t.toLowerCase();
                        let n = (null !== m.value ? f.value.slice(m.value + l).concat(f.value.slice(0, m.value + l)) : f.value).find((e=>e.dataRef.textValue.startsWith(b.value) && !e.dataRef.disabled))
                          , o = n ? f.value.indexOf(n) : -1;
                        -1 === o || o === m.value || (m.value = o,
                        h.value = 1)
                    },
                    clearSearch() {
                        e.disabled || 1 !== i.value && "" !== b.value && (b.value = "")
                    },
                    registerOption(e, t) {
                        let l = g((l=>[...l, {
                            id: e,
                            dataRef: t
                        }]));
                        f.value = l.options,
                        m.value = l.activeOptionIndex
                    },
                    unregisterOption(e) {
                        let t = g((t=>{
                            let l = t.findIndex((t=>t.id === e));
                            return -1 !== l && t.splice(l, 1),
                            t
                        }
                        ));
                        f.value = t.options,
                        m.value = t.activeOptionIndex,
                        h.value = 1
                    },
                    select(t) {
                        e.disabled || P(a(x.value, {
                            [0]: ()=>t,
                            [1]: ()=>{
                                let e = (0,
                                o.IU)(R.value.value).slice()
                                  , l = (0,
                                o.IU)(t)
                                  , n = e.findIndex((e=>R.compare(l, (0,
                                o.IU)(e))));
                                return -1 === n ? e.push(l) : e.splice(n, 1),
                                e
                            }
                        }))
                    }
                };
                return $([d, v], ((e,t)=>{
                    var l;
                    R.closeListbox(),
                    H(t, F.Loose) || (e.preventDefault(),
                    null == (l = S(d)) || l.focus())
                }
                ), (0,
                n.Fl)((()=>0 === i.value))),
                (0,
                n.JJ)(G, R),
                I((0,
                n.Fl)((()=>a(i.value, {
                    [0]: L.Open,
                    [1]: L.Closed
                })))),
                ()=>{
                    let {name: o, modelValue: a, disabled: r, ...s} = e
                      , d = {
                        open: 0 === i.value,
                        disabled: r,
                        value: w.value
                    };
                    return (0,
                    n.h)(n.HY, [...null != o && null != w.value ? Y({
                        [o]: w.value
                    }).map((([e,t])=>(0,
                    n.h)(V, p({
                        features: B.Hidden,
                        key: e,
                        as: "input",
                        type: "hidden",
                        hidden: !0,
                        readOnly: !0,
                        name: e,
                        value: t
                    })))) : [], u({
                        ourProps: {},
                        theirProps: {
                            ...l,
                            ...c(s, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"])
                        },
                        slot: d,
                        slots: t,
                        attrs: l,
                        name: "Listbox"
                    })])
                }
            }
        })
          , ee = ((0,
        n.aZ)({
            name: "ListboxLabel",
            props: {
                as: {
                    type: [Object, String],
                    default: "label"
                }
            },
            setup(e, {attrs: t, slots: l}) {
                let n = Q("ListboxLabel")
                  , o = `headlessui-listbox-label-${h()}`;
                function a() {
                    var e;
                    null == (e = S(n.buttonRef)) || e.focus({
                        preventScroll: !0
                    })
                }
                return ()=>{
                    let r = {
                        open: 0 === n.listboxState.value,
                        disabled: n.disabled.value
                    }
                      , i = {
                        id: o,
                        ref: n.labelRef,
                        onClick: a
                    };
                    return u({
                        ourProps: i,
                        theirProps: e,
                        slot: r,
                        attrs: t,
                        slots: l,
                        name: "ListboxLabel"
                    })
                }
            }
        }),
        (0,
        n.aZ)({
            name: "ListboxButton",
            props: {
                as: {
                    type: [Object, String],
                    default: "button"
                }
            },
            setup(e, {attrs: t, slots: l, expose: o}) {
                let a = Q("ListboxButton")
                  , r = `headlessui-listbox-button-${h()}`;
                function i(e) {
                    switch (e.key) {
                    case g.Space:
                    case g.Enter:
                    case g.ArrowDown:
                        e.preventDefault(),
                        a.openListbox(),
                        (0,
                        n.Y3)((()=>{
                            var e;
                            null == (e = S(a.optionsRef)) || e.focus({
                                preventScroll: !0
                            }),
                            a.value.value || a.goToOption(y.First)
                        }
                        ));
                        break;
                    case g.ArrowUp:
                        e.preventDefault(),
                        a.openListbox(),
                        (0,
                        n.Y3)((()=>{
                            var e;
                            null == (e = S(a.optionsRef)) || e.focus({
                                preventScroll: !0
                            }),
                            a.value.value || a.goToOption(y.Last)
                        }
                        ));
                        break
                    }
                }
                function s(e) {
                    switch (e.key) {
                    case g.Space:
                        e.preventDefault();
                        break
                    }
                }
                function d(e) {
                    a.disabled.value || (0 === a.listboxState.value ? (a.closeListbox(),
                    (0,
                    n.Y3)((()=>{
                        var e;
                        return null == (e = S(a.buttonRef)) ? void 0 : e.focus({
                            preventScroll: !0
                        })
                    }
                    ))) : (e.preventDefault(),
                    a.openListbox(),
                    q((()=>{
                        var e;
                        return null == (e = S(a.optionsRef)) ? void 0 : e.focus({
                            preventScroll: !0
                        })
                    }
                    ))))
                }
                o({
                    el: a.buttonRef,
                    $el: a.buttonRef
                });
                let v = k((0,
                n.Fl)((()=>({
                    as: e.as,
                    type: t.type
                }))), a.buttonRef);
                return ()=>{
                    var n, o;
                    let p = {
                        open: 0 === a.listboxState.value,
                        disabled: a.disabled.value,
                        value: a.value.value
                    }
                      , c = {
                        ref: a.buttonRef,
                        id: r,
                        type: v.value,
                        "aria-haspopup": !0,
                        "aria-controls": null == (n = S(a.optionsRef)) ? void 0 : n.id,
                        "aria-expanded": a.disabled.value ? void 0 : 0 === a.listboxState.value,
                        "aria-labelledby": a.labelRef.value ? [null == (o = S(a.labelRef)) ? void 0 : o.id, r].join(" ") : void 0,
                        disabled: !0 === a.disabled.value || void 0,
                        onKeydown: i,
                        onKeyup: s,
                        onClick: d
                    };
                    return u({
                        ourProps: c,
                        theirProps: e,
                        slot: p,
                        attrs: t,
                        slots: l,
                        name: "ListboxButton"
                    })
                }
            }
        }))
          , te = (0,
        n.aZ)({
            name: "ListboxOptions",
            props: {
                as: {
                    type: [Object, String],
                    default: "ul"
                },
                static: {
                    type: Boolean,
                    default: !1
                },
                unmount: {
                    type: Boolean,
                    default: !0
                }
            },
            setup(e, {attrs: t, slots: l, expose: i}) {
                let s = Q("ListboxOptions")
                  , d = `headlessui-listbox-options-${h()}`
                  , v = (0,
                o.iH)(null);
                function p(e) {
                    switch (v.value && clearTimeout(v.value),
                    e.key) {
                    case g.Space:
                        if ("" !== s.searchQuery.value)
                            return e.preventDefault(),
                            e.stopPropagation(),
                            s.search(e.key);
                    case g.Enter:
                        if (e.preventDefault(),
                        e.stopPropagation(),
                        null !== s.activeOptionIndex.value) {
                            let e = s.options.value[s.activeOptionIndex.value];
                            s.select(e.dataRef.value)
                        }
                        0 === s.mode.value && (s.closeListbox(),
                        (0,
                        n.Y3)((()=>{
                            var e;
                            return null == (e = S(s.buttonRef)) ? void 0 : e.focus({
                                preventScroll: !0
                            })
                        }
                        )));
                        break;
                    case a(s.orientation.value, {
                        vertical: g.ArrowDown,
                        horizontal: g.ArrowRight
                    }):
                        return e.preventDefault(),
                        e.stopPropagation(),
                        s.goToOption(y.Next);
                    case a(s.orientation.value, {
                        vertical: g.ArrowUp,
                        horizontal: g.ArrowLeft
                    }):
                        return e.preventDefault(),
                        e.stopPropagation(),
                        s.goToOption(y.Previous);
                    case g.Home:
                    case g.PageUp:
                        return e.preventDefault(),
                        e.stopPropagation(),
                        s.goToOption(y.First);
                    case g.End:
                    case g.PageDown:
                        return e.preventDefault(),
                        e.stopPropagation(),
                        s.goToOption(y.Last);
                    case g.Escape:
                        e.preventDefault(),
                        e.stopPropagation(),
                        s.closeListbox(),
                        (0,
                        n.Y3)((()=>{
                            var e;
                            return null == (e = S(s.buttonRef)) ? void 0 : e.focus({
                                preventScroll: !0
                            })
                        }
                        ));
                        break;
                    case g.Tab:
                        e.preventDefault(),
                        e.stopPropagation();
                        break;
                    default:
                        1 === e.key.length && (s.search(e.key),
                        v.value = setTimeout((()=>s.clearSearch()), 350));
                        break
                    }
                }
                i({
                    el: s.optionsRef,
                    $el: s.optionsRef
                });
                let c = P()
                  , f = (0,
                n.Fl)((()=>null !== c ? c.value === L.Open : 0 === s.listboxState.value));
                return ()=>{
                    var n, o, a, i;
                    let v = {
                        open: 0 === s.listboxState.value
                    }
                      , c = {
                        "aria-activedescendant": null === s.activeOptionIndex.value || null == (n = s.options.value[s.activeOptionIndex.value]) ? void 0 : n.id,
                        "aria-multiselectable": 1 === s.mode.value || void 0,
                        "aria-labelledby": null != (i = null == (o = S(s.labelRef)) ? void 0 : o.id) ? i : null == (a = S(s.buttonRef)) ? void 0 : a.id,
                        "aria-orientation": s.orientation.value,
                        id: d,
                        onKeydown: p,
                        role: "listbox",
                        tabIndex: 0,
                        ref: s.optionsRef
                    };
                    return u({
                        ourProps: c,
                        theirProps: e,
                        slot: v,
                        attrs: t,
                        slots: l,
                        features: r.RenderStrategy | r.Static,
                        visible: f.value,
                        name: "ListboxOptions"
                    })
                }
            }
        })
          , le = (0,
        n.aZ)({
            name: "ListboxOption",
            props: {
                as: {
                    type: [Object, String],
                    default: "li"
                },
                value: {
                    type: [Object, String, Number, Boolean]
                },
                disabled: {
                    type: Boolean,
                    default: !1
                }
            },
            setup(e, {slots: t, attrs: l, expose: r}) {
                let i = Q("ListboxOption")
                  , s = `headlessui-listbox-option-${h()}`
                  , d = (0,
                o.iH)(null);
                r({
                    el: d,
                    $el: d
                });
                let v = (0,
                n.Fl)((()=>null !== i.activeOptionIndex.value && i.options.value[i.activeOptionIndex.value].id === s))
                  , p = (0,
                n.Fl)((()=>a(i.mode.value, {
                    [0]: ()=>i.compare((0,
                    o.IU)(i.value.value), (0,
                    o.IU)(e.value)),
                    [1]: ()=>(0,
                    o.IU)(i.value.value).some((t=>i.compare((0,
                    o.IU)(t), (0,
                    o.IU)(e.value))))
                })))
                  , f = (0,
                n.Fl)((()=>a(i.mode.value, {
                    [1]: ()=>{
                        var e;
                        let t = (0,
                        o.IU)(i.value.value);
                        return (null == (e = i.options.value.find((e=>t.some((t=>i.compare((0,
                        o.IU)(t), (0,
                        o.IU)(e.dataRef.value))))))) ? void 0 : e.id) === s
                    }
                    ,
                    [0]: ()=>p.value
                })))
                  , b = (0,
                n.Fl)((()=>({
                    disabled: e.disabled,
                    value: e.value,
                    textValue: "",
                    domRef: d
                })));
                function m(t) {
                    if (e.disabled)
                        return t.preventDefault();
                    i.select(e.value),
                    0 === i.mode.value && (i.closeListbox(),
                    (0,
                    n.Y3)((()=>{
                        var e;
                        return null == (e = S(i.buttonRef)) ? void 0 : e.focus({
                            preventScroll: !0
                        })
                    }
                    )))
                }
                function g() {
                    if (e.disabled)
                        return i.goToOption(y.Nothing);
                    i.goToOption(y.Specific, s)
                }
                function x() {
                    e.disabled || v.value || i.goToOption(y.Specific, s, 0)
                }
                function O() {
                    e.disabled || !v.value || i.goToOption(y.Nothing)
                }
                return (0,
                n.bv)((()=>{
                    var e, t;
                    let l = null == (t = null == (e = S(d)) ? void 0 : e.textContent) ? void 0 : t.toLowerCase().trim();
                    void 0 !== l && (b.value.textValue = l)
                }
                )),
                (0,
                n.bv)((()=>i.registerOption(s, b))),
                (0,
                n.Ah)((()=>i.unregisterOption(s))),
                (0,
                n.bv)((()=>{
                    (0,
                    n.YP)([i.listboxState, p], (()=>{
                        0 === i.listboxState.value && (!p.value || a(i.mode.value, {
                            [1]: ()=>{
                                f.value && i.goToOption(y.Specific, s)
                            }
                            ,
                            [0]: ()=>{
                                i.goToOption(y.Specific, s)
                            }
                        }))
                    }
                    ), {
                        immediate: !0
                    })
                }
                )),
                (0,
                n.m0)((()=>{
                    0 === i.listboxState.value && (!v.value || 0 !== i.activationTrigger.value && (0,
                    n.Y3)((()=>{
                        var e, t;
                        return null == (t = null == (e = S(d)) ? void 0 : e.scrollIntoView) ? void 0 : t.call(e, {
                            block: "nearest"
                        })
                    }
                    )))
                }
                )),
                ()=>{
                    let {disabled: n} = e
                      , o = {
                        active: v.value,
                        selected: p.value,
                        disabled: n
                    }
                      , a = {
                        id: s,
                        ref: d,
                        role: "option",
                        tabIndex: !0 === n ? void 0 : -1,
                        "aria-disabled": !0 === n || void 0,
                        "aria-selected": p.value,
                        disabled: void 0,
                        onClick: m,
                        onFocus: g,
                        onPointermove: x,
                        onMousemove: x,
                        onPointerleave: O,
                        onMouseleave: O
                    };
                    return u({
                        ourProps: a,
                        theirProps: c(e, ["value", "disabled"]),
                        slot: o,
                        attrs: l,
                        slots: t,
                        name: "ListboxOption"
                    })
                }
            }
        })
    }
}]);
