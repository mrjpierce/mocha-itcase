declare namespace ItCase {
    export interface itCase {
        (testDescriptor: string, caseArray: Array<any>, testFunction: (...caseArgs) => void): void;
    }
}

declare var itCase: ItCase.itCase;

export default itCase;
