module.exports = function itCase(testDescriptor, caseArray, testFunction) {
    if (!caseArray || caseArray.length < 1)
        throw new Error('caseArray is null, undefined, or empty');

    // All other cases will be compared to the props from the first case
    let masterPropList = Object.keys(caseArray[0]);

    caseArray.forEach((testCase) => {

        // Make sure each case has all props from the master prop list
        let testCaseProps = [];
        testDescriptor += ' (';
        masterPropList.forEach((propName) => {
            let prop = testCase[propName];

            if (typeof(prop) === 'undefined')
                throw new Error(`case does not have property "${propName}"`);

            testCaseProps.push(prop);
            testDescriptor += String(prop) + ', ';
        });
        testDescriptor = testDescriptor.split(0, testDescriptor.length - 1) + ')';

        it(testDescriptor, () => {
            return testFunction(...testCaseProps); 
        }); 
    });
};