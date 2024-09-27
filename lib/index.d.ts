import React, { ReactNodeArray } from "react";
import { TranslationValues, Formats, RichTranslationValues } from 'next-intl';
type NextIntlTranslationFunction = {
    <TargetKey extends string>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
    rich<TargetKey extends string>(key: TargetKey, values?: RichTranslationValues, formats?: Partial<Formats>): string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | ReactNodeArray;
    markup<TargetKey extends string>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
};
export declare function serializeTranslationCall(key: string, values?: TranslationValues): string;
export declare const stc: typeof serializeTranslationCall;
export declare function deserializeTranslationCall(serialized: string, t: NextIntlTranslationFunction): string;
export declare const dtc: typeof deserializeTranslationCall;
export declare function isSerializedTranslationCall(str: string): boolean;
export {};
