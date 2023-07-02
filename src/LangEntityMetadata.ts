export interface LangEntityMetadata {
    name : string;
    type? : LangEntityType;
    signature : string;
    documentation : string;
}

export enum LangEntityType {
    Procedure, 
    Constant, 
    Keyword
}