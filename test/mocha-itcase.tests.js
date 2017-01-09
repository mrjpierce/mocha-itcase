const assert = require('assert');
const sinon = require('sinon');

const itCase = require('./../lib/mocha-itcase') ; 

console.log('creates an it with the correct testDescriptor');
(() => {
    // Arrange
    let testDescriptor = 'test testDescriptor';
    let caseArray = [{}];
    let testFunction = () => {};
    let itSpy = sinon.spy();
    it = itSpy;

    // Act
    itCase(testDescriptor, caseArray, testFunction);

    // Assert
    assert(itSpy.calledWith(sinon.match.string, sinon.match.func));
    assert(itSpy.args[0][0].indexOf(testDescriptor) !== -1);
})();

console.log('throws error when caseArray is null');
(() => {
    // Arrange
    let testDescriptor = 'test';
    let caseArray = null;
    let testFunction = () => {};
    let itSpy = sinon.spy();
    it = itSpy;

    // Act
    try {
        itCase(testDescriptor, caseArray, testFunction);
    } catch(e) {
        assert(e.message === 'caseArray is null, undefined, or empty');
        return;
    }

    // Assert
    throw new Error('Error was not thrown');
})();

console.log('throws error when caseArray is empty');
(() => {
    // Arrange
    let testDescriptor = 'test';
    let caseArray = [];
    let testFunction = () => {};
    let itSpy = sinon.spy();
    it = itSpy;

    // Act
    try {
        itCase(testDescriptor, caseArray, testFunction);
    } catch(e) {
        assert(e.message === 'caseArray is null, undefined, or empty');
        return;
    }

    // Assert
    throw new Error('Error was not thrown');
})();

console.log('throws error when elements of caseArray are inconsistent');
(() => {
    // Arrange
    let testDescriptor = 'test';
    let caseArray = [
        { a: 1, b: 2 },
        { a: 2 }
    ];
    let testFunction = () => {};
    let itSpy = sinon.spy();
    it = itSpy;

    // Act
    try {
        itCase(testDescriptor, caseArray, testFunction);
    } catch(e) {
        assert(e.message.indexOf('case does not have property') !== -1);
        return;
    }

    // Assert
    throw new Error('Error was not thrown');
})();

console.log('calls it for each case in caseArray');
(() => {
    // Arrange
    let testDescriptor = 'test';
    let caseArray = [
        { a: 1, b: 4 },
        { b: 5, a: 2 },
        { a: 3, b: 6, c: 7 }
    ];
    let testFunctionSpy = sinon.spy();
    let itSpy = sinon.spy();
    it = itSpy;

    // Act
    itCase(testDescriptor, caseArray, testFunctionSpy);
    itSpy.args[0][1](); // Force the testFunctionSpy to be called
    itSpy.args[1][1]();
    itSpy.args[2][1]();

    // Assert
    assert(itSpy.callCount === caseArray.length);
    assert(testFunctionSpy.calledWith(caseArray[0].a, caseArray[0].b));
    assert(testFunctionSpy.calledWith(caseArray[1].a, caseArray[1].b));
    assert(testFunctionSpy.calledWith(caseArray[2].a, caseArray[2].b));
})();
