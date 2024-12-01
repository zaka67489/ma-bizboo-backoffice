"use strict";
(self["webpackChunksk_plus"] = self["webpackChunksk_plus"] || []).push([[64645], {
    64645: function(t, e, r) {
        r.r(e),
        r.d(e, {
            default: function() {
                return h
            }
        });
        var a = r(88412);
        function o(t, e, r, o, n, i) {
            const s = (0,
            a.up)("Chart");
            return t.chartData ? ((0,
            a.wg)(),
            (0,
            a.j4)(s, {
                key: 0,
                type: "line",
                width: t.width,
                height: t.height,
                data: t.chartData,
                options: t.options
            }, null, 8, ["width", "height", "data", "options"])) : (0,
            a.kq)("", !0)
        }
        var n = r(88182)
          , i = r(29260)
          , s = (0,
        a.aZ)({
            name: "TopupLineChart",
            props: {
                width: {
                    type: Number,
                    default: 0
                },
                height: {
                    type: Number,
                    default: 0
                },
                chartData: {
                    type: Object,
                    default: ()=>({})
                }
            },
            setup() {
                const t = (0,
                i.oR)()
                  , e = (0,
                a.Fl)((()=>t.state.profile.currency))
                  , r = (0,
                a.Fl)((()=>({
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: "12",
                                fontColor: "#777777"
                            },
                            gridLines: {
                                display: !0
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: "12",
                                fontColor: "#777777",
                                callback(t) {
                                    return `${e.value} ${(0,
                                    n.uf)(t)}`
                                }
                            },
                            stepSize: 1e3,
                            gridLines: {
                                color: "#D8D8D8",
                                zeroLineColor: "#D8D8D8",
                                borderDash: [2, 2],
                                zeroLineBorderDash: [2, 2],
                                drawBorder: !0
                            }
                        }]
                    }
                })));
                return {
                    options: r
                }
            }
        })
          , u = r(57886);
        const l = (0,
        u.Z)(s, [["render", o]]);
        var h = l
    }
}]);
