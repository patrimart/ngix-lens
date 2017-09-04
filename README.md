
# @ngix/lens

A stand-alone TypeScript/JavaScript library that implements a basic "lens" library.

- `lens` - Define the path of the value to "focus".
- `set` - Sets the value of the focus.
- `over` - Sets the value of the focus via function (`(v: V) => V`).
- `del` - Deletes the key at focus.

The advantages of using this library:

- Access and modify immutable data structures safely.
- Curried functions.
- Composable Lenses and functions.

Note: While a library of the `@ngix` organization, this library has no dependencies and can be used independently.

## Install

`npm i -S @ngix/lens`


## Quick Examples

```ts
import { lens, view, set } from "@ngis/lens";

const data = {
    foo: "foo",
    bar: {
        barFoo: "barFoo",
        barBar: [{
            id: 1,
            foo: "foo_1",
        },
    },
};

const l1 = lens("foo");
const v1 = view(l1)(data); // v1 => "foo"

const l2 = lens("bar", "barFoo");
const v2 = view(l2)(data); // v2 => "barFoo"

const l3 = lens("bar", "barBar", 0);
const v3 = view(l3)(data) // v3 => { id: 1, foo: "foo_1" }

const l4 = lens("bar", "barBar", v => v.id === 1, "foo");
const v4 = view(l4)(data) // v4 => "foo_1"

const data2 = set(l4)("new_foo_1")(data);
/*
data2 => {
    foo: "foo",
    bar: {
        barFoo: "barFoo",
        barBar: [{
            id: 1,
            foo: "new_foo_1",
        },
    },
}
*/

const data3 = del(lens("bar")); // data3 => { foo: "foo" }
```

## Docs

#### `lens :: (string | number | (v -> boolean))[] -> Lens`

`lens` takes an array of strings, numbers and predicate functions (defining a path into a data structure) and returns a lens.

#### `view :: Lens -> obj -> val`

`view` takes a Lens and a data structure and returns the value at the Lens "focus".

#### `set :: Lens -> val -> obj -> obj`

`set` takes a Lens, a value, and a data structure and returns a new, updated data structure.

#### `over :: Lens -> (v -> v) -> obj -> obj`

`over` is the same as `set`, except it assigns the value by function.

#### `del :: Lens -> obj -> obj`

`del` takes a Lens and a data structure and returns a new, updated data structure.

---

# License

(The MIT License)

Copyright (c) 2017 Patrick Martin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the 'Software'), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.