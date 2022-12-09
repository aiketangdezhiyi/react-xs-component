/** 返回一个由data填充且长度为length的数组 */
export declare const getArray: (length: number, data?: any) => any[];
export declare const getObjOrArrayType: (obj: any) => "object" | "array" | undefined;
export declare const deepClone: (obj: any) => any;
/** 复制数组的开头一部分填充到数组的最后 用于制作无缝轮播 */
export declare const getConcatArray: (arr: any[], number: number) => any[];
