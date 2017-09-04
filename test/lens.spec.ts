import * as assert from "assert";
import { lens, view, set, over, del } from "../package";

describe("Lens", function () {

    const data = {
        foo: "foo",
        bar: {
            barFoo: "barFoo",
            barBar: [{
                id: 1,
                foo: "foo_1",
            }, {
                id: 2,
                foo: "foo_2",
                bar: {
                    fooBar: "fooBar_2",
                },
            }],
        },
    };

    describe("view function", function () {

        it ("should view 'foo'", function () {

            const l = lens("foo");
            const v = view(l)(data);
            assert(v === "foo");
        });

        it ("should view 'bar, barFoo'", function () {

            const l = lens("bar", "barFoo");
            const v = view(l)(data);
            assert(v === "barFoo");
        });

        it ("should view 'bar, barFoo, 1, id'", function () {

            const l = lens("bar", "barBar", 1, "id");
            const v = view(l)(data);
            assert(v === 2);
        });

        it ("should view 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {

            const l = lens("bar", "barBar", o => o.id === 2, "bar", "fooBar");
            const v = view(l)(data);
            assert(v === "fooBar_2");
        });

        it ("should compose", function () {

            const l1 = lens("bar", "barBar");
            const l2 = lens(1, "id");
            const l = lens(l1, l2);
            const v = view(l)(data);
            assert(v === 2);
        });

        it ("should fail 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {

            const l = lens("bar", "barBar", o => o.id === 5, "bar", "fooBar");
            const v = view(l)(data);
            assert(v === undefined);
        });
    });

    describe("set function", function () {

        it ("should set 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {

            const l = lens("bar", "barBar", o => o.id === 2, "bar", "fooBar");
            const data2 = set(l)("fooBar_2_changed")(data);
            const v = view(l)(data2);
            assert(v === "fooBar_2_changed");
        });

        it ("should set entire path 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {

            const l = lens("bar", "barBar", o => o.id === 2, "bar", "fooBar");
            const l2 = lens("bar", "barBar", 0, "bar", "fooBar");
            const data2 = set(l)("fooBar_2")({});
            const v = view(l2)(data2);
            assert(v === "fooBar_2");
        });
    });

    describe("over function", function () {

        it ("should set 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {

            const l = lens("bar", "barBar", o => o.id === 2, "bar", "fooBar");
            const data2 = over(l)(a => a + "_changed")(data);
            const v = view(lens("bar", "barBar", o => o.id === 2, "bar", "fooBar"))(data2);
            assert(v === "fooBar_2_changed");
        });
    });

    describe("del function", function () {

        it ("should delete 'bar, barFoo, o => o.id === 1, bar, fooBar'", function () {

            const l = lens("bar", "barBar", o => o.id === 2, "bar", "fooBar");
            const data2 = del(l)(data);
            const v = view(l)(data2);
            assert(v === undefined);
        });
    });

});
