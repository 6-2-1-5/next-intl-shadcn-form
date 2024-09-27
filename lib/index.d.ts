import { TranslationValues, Formats, RichTranslationValues } from 'next-intl';
type ReactNode = React.ReactNode | readonly React.ReactNode[];
type NextIntlTranslationFunctionBase = {
    <TargetKey extends string>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
};
type NextIntlTranslationFunctionExtensions = {
    rich?<TargetKey extends string>(key: TargetKey, values?: RichTranslationValues, formats?: Partial<Formats>): string | React.ReactElement | ReactNode;
    markup?<TargetKey extends string>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
};
export type NextIntlTranslationFunction = NextIntlTranslationFunctionBase & NextIntlTranslationFunctionExtensions;
export declare function serializeTranslationCall(key: string, values?: TranslationValues): string;
export declare const stc: typeof serializeTranslationCall;
export declare function deserializeTranslationCall(serialized: string, t: NextIntlTranslationFunction): string;
export declare const dtc: typeof deserializeTranslationCall;
export declare function isSerializedTranslationCall(str: string): boolean;
export {};
