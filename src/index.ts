import React, { ReactNodeArray } from "react";
import {
    TranslationValues,
    Formats,
    RichTranslationValues
} from 'next-intl';

// Define a type that matches the structure of the next-intl translation function
type NextIntlTranslationFunction = {
    <TargetKey extends string>(
        key: TargetKey,
        values?: TranslationValues,
        formats?: Partial<Formats>
    ): string;
    rich<TargetKey extends string>(
        key: TargetKey,
        values?: RichTranslationValues,
        formats?: Partial<Formats>
    ): string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | ReactNodeArray;
    markup<TargetKey extends string>(
        key: TargetKey,
        values?: TranslationValues,
        formats?: Partial<Formats>
    ): string;
    // Add any other overloads that next-intl's translation function might have
};

// Serialize the translation call to a string
export function serializeTranslationCall(key: string, values?: TranslationValues): string {
    const serialized = {
        type: 'translationCall',
        key,
        values: values || {}
    };
    return JSON.stringify(serialized);
}
export const stc = serializeTranslationCall;


// Deserialize the string back to a translation call and execute it
export function deserializeTranslationCall(
    serialized: string,
    t: NextIntlTranslationFunction
): string {
    if (!isSerializedTranslationCall(serialized)) {
        throw new Error('Invalid serialized translation call');
    }
    const parsed = JSON.parse(serialized);
    return t(parsed.key, parsed.values);
}
export const dtc = deserializeTranslationCall;

// Check if a string is a valid serialized translation call
export function isSerializedTranslationCall(str: string): boolean {
    try {
        const parsed = JSON.parse(str);
        return (
            typeof parsed === 'object' &&
            parsed !== null &&
            parsed.type === 'translationCall' &&
            typeof parsed.key === 'string' &&
            (typeof parsed.values === 'object' || parsed.values === undefined)
        );
    } catch (error) {
        return false;
    }
}
