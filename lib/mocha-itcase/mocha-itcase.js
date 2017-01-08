const sinon = require('sinon');

module.exports = function itCase(testDescriptor, caseArray, testFunction) {
    if (!caseArray || caseArray.length < 1)
        throw new Error('caseArray is null, undefined, or empty');

    // All other cases will be compared to the props from the first case
    let masterPropList = Object.keys(caseArray[0]);

    caseArray.forEach((testCase) => {

        // Make sure each case has all props from the master prop list
        let testCaseProps = [];
        masterPropList.forEach((propName) => {
            if (typeof(testCase[propName]) === 'undefined')
                throw new Error(`case does not have property "${propName}"`);

            testCaseProps.push(testCase[propName]);
        });

        it(testDescriptor, () => {
            return testFunction(...testCaseProps); 
        }); 
    });
};