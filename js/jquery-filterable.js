! function (e) {
    var o, t = e.event;
    t.special.smartresize = {
        setup: function () {
            e(this).bind("resize", t.special.smartresize.handler)
        },
        teardown: function () {
            e(this).unbind("resize", t.special.smartresize.handler)
        },
        handler: function (e, t) {
            var n = this,
                a = arguments;
            e.type = "smartresize", o && clearTimeout(o), o = setTimeout(function () {
                jQuery.event.handle.apply(n, a)
            }, "execAsap" === t ? 0 : 100)
        }
    }, e.fn.smartresize = function (e) {
        return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"])
    }, e.fn.masonry = function (o, t) {
        var n = {
            getBricks: function (e, o, t) {
                var n = void 0 === t.itemSelector;
                o.$bricks = void 0 === t.appendedContent ? n ? e.children() : e.find(t.itemSelector) : n ? t.appendedContent : t.appendedContent.filter(t.itemSelector)
            },
            placeBrick: function (o, t, n, a, i) {
                for (var s = (t = Math.min.apply(Math, n)) + o.outerHeight(!0), r = n.length, c = r, l = a.colCount + 1 - r; r--;) n[r] == t && (c = r);
                for (o.applyStyle({
                        left: a.colW * c + a.posLeft,
                        top: t
                    }, e.extend(!0, {}, i.animationOptions)), r = 0; r < l; r++) a.colY[c + r] = s
            },
            setup: function (e, o, t) {
                n.getBricks(e, t, o), t.masoned && (t.previousData = e.data("masonry")), t.colW = void 0 === o.columnWidth ? t.masoned ? t.previousData.colW : t.$bricks.outerWidth(!0) : o.columnWidth, t.colCount = Math.floor(e.width() / t.colW), t.colCount = Math.max(t.colCount, 1)
            },
            arrange: function (o, a, i) {
                var s;
                if (i.masoned && void 0 === a.appendedContent || i.$bricks.css("position", "absolute"), i.masoned) i.posTop = i.previousData.posTop, i.posLeft = i.previousData.posLeft;
                else {
                    o.css("position", "relative");
                    var r = e(document.createElement("div"));
                    o.prepend(r), i.posTop = Math.round(r.position().top), i.posLeft = Math.round(r.position().left), r.remove()
                }
                if (i.masoned && void 0 !== a.appendedContent)
                    for (i.colY = i.previousData.colY, s = i.previousData.colCount; s < i.colCount; s++) i.colY[s] = i.posTop;
                else
                    for (i.colY = [], s = i.colCount; s--;) i.colY.push(i.posTop);
                e.fn.applyStyle = i.masoned && a.animate ? e.fn.animate : e.fn.css, a.singleMode ? i.$bricks.each(function () {
                    var o = e(this);
                    n.placeBrick(o, i.colCount, i.colY, i, a)
                }) : i.$bricks.each(function () {
                    var o = e(this),
                        t = Math.ceil(o.outerWidth(!0) / i.colW);
                    if (1 === (t = Math.min(t, i.colCount))) n.placeBrick(o, i.colCount, i.colY, i, a);
                    else {
                        var r = i.colCount + 1 - t,
                            c = [];
                        for (s = 0; s < r; s++) {
                            var l = i.colY.slice(s, s + t);
                            c[s] = Math.max.apply(Math, l)
                        }
                        n.placeBrick(o, r, c, i, a)
                    }
                }), i.wallH = Math.max.apply(Math, i.colY), o.applyStyle({
                    height: i.wallH - i.posTop
                }, e.extend(!0, [], a.animationOptions)), i.masoned || setTimeout(function () {
                    o.addClass("masoned")
                }, 1), t.call(i.$bricks), o.data("masonry", i)
            },
            resize: function (e, o, t) {
                t.masoned = !!e.data("masonry");
                var a = e.data("masonry").colCount;
                n.setup(e, o, t), t.colCount != a && n.arrange(e, o, t)
            }
        };
        return this.each(function () {
            var a = e(this),
                i = {};
            i.masoned = !!a.data("masonry");
            var s = i.masoned ? a.data("masonry").options : {},
                r = e.extend({}, e.fn.masonry.defaults, s, o),
                c = s.resizeable;
            if (i.options = r.saveOptions ? r : s, t = t || function () {}, n.getBricks(a, i, r), !i.$bricks.length) return this;
            n.setup(a, r, i), n.arrange(a, r, i), !c && r.resizeable && e(window).bind("smartresize.masonry", function () {
                n.resize(a, r, i)
            }), c && !r.resizeable && e(window).unbind("smartresize.masonry")
        })
    }, e.fn.masonry.defaults = {
        singleMode: !1,
        columnWidth: void 0,
        itemSelector: void 0,
        appendedContent: void 0,
        saveOptions: !0,
        resizeable: !0,
        animate: !1,
        animationOptions: {}
    }
}(jQuery);
