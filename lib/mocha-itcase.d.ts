declare namespace itCase {
    export default function itCase(testDescriptor: string, caseArray: Array<any>, testFunction: (...caseArgs) => void): void;
}

declare function itCase(testDescriptor: string, caseArray: Array<any>, testFunction: (...caseArgs) => void): void;

export = itCase;
