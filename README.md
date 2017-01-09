# mocha-itcase
A mocha extension for multiple test cases for the same test

## Install
```
npm install mocha
npm install mocha-itcase
```

## Usage
```
const itCase = require('mocha-itcase');

function Add(a, b) {
    return a + b;
}

itCase('should add numbers correctly', [
    { input1: 2, input2: 2, expected: 4 },
    { input1: 3, input2: 3, expected: 6 },
    { input1: 4, input2: 4, expected: 8 }
], (input1, input2, expected) => {
    let result = Add(input1, input2);
    assert(result === expeccted);
});

```
```
Output:
    √ should add numbers correctly (2, 2, 4)
    √ should add numbers correctly (3, 3, 6)
    √ should add numbers correctly (4, 4, 8)

  3 passing (51ms)
```
