(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[17679], {
    17679: function(s, t, e) {
        "use strict";
        e.r(t),
        e.d(t, {
            default: function() {
                return b
            }
        });
        var c = e(88412)
          , i = e(51538);
        const g = ["src", "alt"];
        function o(s, t, o, n, r, p) {
            return s.bankCode ? ((0,
            c.wg)(),
            (0,
            c.iD)("div", {
                key: 0,
                style: (0,
                i.j5)(s.disabled ? "background-color: gray" : `background-color: ${s.bankColor[s.bankCodeUpperCase]}`),
                class: (0,
                i.C_)(["p-0.5 lex-shrink-0 flex justify-center items-center shadow", s.logoClass])
            }, [(0,
            c._)("img", {
                class: (0,
                i.C_)([s.logoClass, "object-contain"]),
                src: e(62605)(`./${s.bankCodeLowerCase}.svg`),
                alt: s.bankCodeLowerCase
            }, null, 10, g)], 6)) : (0,
            c.kq)("", !0)
        }
        var n = e(90714)
          , r = (0,
        c.aZ)({
            props: {
                bankCode: {
                    type: String,
                    default: ""
                },
                wrapLogoClass: {
                    type: String,
                    default: "h-7 w-7"
                },
                logoClass: {
                    type: String,
                    default: "h-6 w-6"
                },
                disabled: {
                    type: Boolean,
                    default: !1
                }
            },
            setup(s) {
                const t = (0,
                c.Fl)((()=>s.bankCode?.toUpperCase()))
                  , e = (0,
                c.Fl)((()=>s.bankCode?.toLowerCase()))
                  , i = (0,
                c.Fl)((()=>n.GD));
                return {
                    bankColor: i,
                    bankCodeUpperCase: t,
                    bankCodeLowerCase: e
                }
            }
        })
          , p = e(57886);
        const u = (0,
        p.Z)(r, [["render", o]]);
        var b = u
    },
    62605: function(s, t, e) {
        var c = {
            "./acle.svg": 28011,
            "./apb.svg": 79385,
            "./app.svg": 86122,
            "./baac.svg": 73427,
            "./bay.svg": 69202,
            "./bbl.svg": 36182,
            "./bcel.svg": 60137,
            "./bfl.svg": 71770,
            "./bic.svg": 23781,
            "./bnp.svg": 1205,
            "./boa.svg": 44111,
            "./boc.svg": 66709,
            "./cacib.svg": 15779,
            "./cimb.svg": 84617,
            "./citi.svg": 44454,
            "./db.svg": 46933,
            "./ghb.svg": 78543,
            "./gsb.svg": 91183,
            "./hsbc.svg": 34458,
            "./ibank.svg": 50120,
            "./icbc.svg": 3872,
            "./idb.svg": 23222,
            "./jdb.svg": 98159,
            "./jpm.svg": 59246,
            "./kbank.svg": 38703,
            "./kk.svg": 50894,
            "./ktb.svg": 88500,
            "./ldb.svg": 46633,
            "./lhb.svg": 7778,
            "./lvb.svg": 9142,
            "./mb.svg": 51853,
            "./mega.svg": 88769,
            "./mjb.svg": 27790,
            "./mufg.svg": 89505,
            "./one.svg": 90204,
            "./pbb.svg": 77253,
            "./psv.svg": 35529,
            "./rbs.svg": 53142,
            "./sacom.svg": 99581,
            "./sc.svg": 48869,
            "./scb.svg": 68630,
            "./smbc.svg": 53928,
            "./smk88pay.svg": 6982,
            "./stb.svg": 61347,
            "./tbank.svg": 11774,
            "./tcrb.svg": 59202,
            "./tisco.svg": 71717,
            "./tmb.svg": 19523,
            "./tmn.svg": 67099,
            "./toppay.svg": 55468,
            "./ttb.svg": 40051,
            "./uob.svg": 64970,
            "./vmb.svg": 53950,
            "./vtb.svg": 14847
        };
        function i(s) {
            var t = g(s);
            return e(t)
        }
        function g(s) {
            if (!e.o(c, s)) {
                var t = new Error("Cannot find module '" + s + "'");
                throw t.code = "MODULE_NOT_FOUND",
                t
            }
            return c[s]
        }
        i.keys = function() {
            return Object.keys(c)
        }
        ,
        i.resolve = g,
        s.exports = i,
        i.id = 62605
    },
    28011: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/acle.bafeb92a.svg"
    },
    79385: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/apb.ae8bc1b9.svg"
    },
    86122: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/app.214bb783.svg"
    },
    73427: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/baac.1c391ef6.svg"
    },
    69202: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/bay.2f2e8ff7.svg"
    },
    36182: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/bbl.ea048e05.svg"
    },
    60137: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/bcel.8c6cde97.svg"
    },
    71770: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/bfl.0589f70e.svg"
    },
    23781: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/bic.08c63a37.svg"
    },
    1205: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/bnp.08140d3e.svg"
    },
    44111: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/boa.f288c891.svg"
    },
    66709: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/boc.13c92314.svg"
    },
    15779: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/cacib.7bfe9b9a.svg"
    },
    84617: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/cimb.ee12bbf6.svg"
    },
    44454: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/citi.c72342a2.svg"
    },
    46933: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/db.c49155c0.svg"
    },
    78543: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/ghb.71fbb6b5.svg"
    },
    91183: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/gsb.693d5157.svg"
    },
    34458: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/hsbc.aee787b8.svg"
    },
    50120: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/ibank.42f631aa.svg"
    },
    3872: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/icbc.952d880b.svg"
    },
    23222: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/idb.8bb11aa7.svg"
    },
    98159: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/jdb.e20bcce8.svg"
    },
    59246: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/jpm.d2f0c830.svg"
    },
    38703: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/kbank.8be896ac.svg"
    },
    50894: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/kk.efb51e82.svg"
    },
    88500: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/ktb.bc1eec92.svg"
    },
    46633: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/ldb.32bde688.svg"
    },
    7778: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/lhb.be7f1151.svg"
    },
    9142: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/lvb.98961f3c.svg"
    },
    51853: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/mb.0c5548e5.svg"
    },
    88769: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/mega.3e3941e0.svg"
    },
    27790: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/mjb.a73c9a65.svg"
    },
    89505: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/mufg.eef00dc1.svg"
    },
    90204: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/one.29608830.svg"
    },
    77253: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/pbb.927a876e.svg"
    },
    35529: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/psv.dc1c918b.svg"
    },
    53142: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/rbs.9d0cd53a.svg"
    },
    99581: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/sacom.c19ff561.svg"
    },
    48869: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/sc.7be50f7d.svg"
    },
    68630: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/scb.2a62482b.svg"
    },
    53928: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/smbc.cd3f400b.svg"
    },
    6982: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/smk88pay.197c334b.svg"
    },
    61347: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/stb.4bc18ac0.svg"
    },
    11774: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/tbank.f3734790.svg"
    },
    59202: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/tcrb.3a3e6b67.svg"
    },
    71717: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/tisco.35564554.svg"
    },
    19523: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/tmb.67e5138a.svg"
    },
    67099: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/tmn.ebf02348.svg"
    },
    55468: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/toppay.9974e9ec.svg"
    },
    40051: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/ttb.7dae09e0.svg"
    },
    64970: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/uob.c259bc28.svg"
    },
    53950: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/vmb.4517874c.svg"
    },
    14847: function(s, t, e) {
        "use strict";
        s.exports = e.p + "img/vtb.c1cb0010.svg"
    }
}]);
