module.exports = function itCase(testDescriptor, caseArray, testFunction) {
    if (!caseArray || caseArray.length < 1)
        throw new Error('caseArray is null, undefined, or empty');

    // All other cases will be compared to the props from the first case
    let masterPropList = Object.keys(caseArray[0]);

    caseArray.forEach((testCase) => {

        // Make sure each case has all props from the master prop list
        let testCaseProps = [];
        let testDescriptorAddition = '(';
        masterPropList.forEach((propName) => {
            let prop = testCase[propName];

            if (typeof(prop) === 'undefined')
                throw new Error(`case does not have property "${propName}"`);

            // Push onto prop list and add to test descriptor
            testCaseProps.push(prop);
            testDescriptorAddition += String(prop) + ', ';
        });
        testDescriptorAddition = testDescriptorAddition.slice(0, testDescriptorAddition.length - 2) + ')';

        // Create it and pass in case props
        it(`${testDescriptor} ${testDescriptorAddition}`, () => {
            return testFunction(...testCaseProps); 
        }); 
    });
};
