const assert = require('assert');
const sinon = require('sinon');

const itCase = require('./../lib/mocha-itcase');


/* creates an it with the correct testDescriptor */
() => {
    // Arrange
    let testDescriptor = 'test';
    let itSpy = sinon.spy();
    it = itSpy;

    // Act
    itCase(testDescriptor);

    // Assert
    assert(itSpy.calledWith(testDescriptor));
}();
