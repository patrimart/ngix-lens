"use strict";
exports.__esModule = true;
var assert = require("assert");
var package_1 = require("../package");
describe("Lens", function () {
    var data = {
        foo: "foo",
        bar: {
            barFoo: "barFoo",
            barBar: [{
                    id: 1,
                    foo: "foo_1"
                }, {
                    id: 2,
                    foo: "foo_2",
                    bar: {
                        fooBar: "fooBar_2"
                    }
                }]
        }
    };
    describe("view function", function () {
        it("should view 'foo'", function () {
            var l = package_1.lens("foo");
            var v = package_1.view(l)(data);
            assert(v === "foo");
        });
        it("should view 'bar, barFoo'", function () {
            var l = package_1.lens("bar", "barFoo");
            var v = package_1.view(l)(data);
            assert(v === "barFoo");
        });
        it("should view 'bar, barFoo, 1, id'", function () {
            var l = package_1.lens("bar", "barBar", 1, "id");
            var v = package_1.view(l)(data);
            assert(v === 2);
        });
        it("should view 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {
            var l = package_1.lens("bar", "barBar", function (o) { return o.id === 2; }, "bar", "fooBar");
            var v = package_1.view(l)(data);
            assert(v === "fooBar_2");
        });
        it("should compose", function () {
            var l1 = package_1.lens("bar", "barBar");
            var l2 = package_1.lens(1, "id");
            var l = package_1.lens(l1, l2);
            var v = package_1.view(l)(data);
            assert(v === 2);
        });
        it("should fail 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {
            var l = package_1.lens("bar", "barBar", function (o) { return o.id === 5; }, "bar", "fooBar");
            var v = package_1.view(l)(data);
            assert(v === undefined);
        });
    });
    describe("set function", function () {
        it("should set 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {
            var l = package_1.lens("bar", "barBar", function (o) { return o.id === 2; }, "bar", "fooBar");
            var data2 = package_1.set(l)("fooBar_2_changed")(data);
            var v = package_1.view(l)(data2);
            assert(v === "fooBar_2_changed");
        });
        it("should set entire path 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {
            var l = package_1.lens("bar", "barBar", function (o) { return o.id === 2; }, "bar", "fooBar");
            var l2 = package_1.lens("bar", "barBar", 0, "bar", "fooBar");
            var data2 = package_1.set(l)("fooBar_2")({});
            var v = package_1.view(l2)(data2);
            assert(v === "fooBar_2");
        });
    });
    describe("over function", function () {
        it("should set 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {
            var l = package_1.lens("bar", "barBar", function (o) { return o.id === 2; }, "bar", "fooBar");
            var data2 = package_1.over(l)(function (a) { return a + "_changed"; })(data);
            var v = package_1.view(package_1.lens("bar", "barBar", function (o) { return o.id === 2; }, "bar", "fooBar"))(data2);
            assert(v === "fooBar_2_changed");
        });
    });
    describe("del function", function () {
        it("should delete 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {
            var l = package_1.lens("bar", "barBar", function (o) { return o.id === 2; }, "bar", "fooBar");
            var data2 = package_1.del(l)(data);
            var v = package_1.view(l)(data2);
            assert(v === undefined);
        });
    });
});
