import React from "react";
import {
    TranslationValues,
    Formats,
    RichTranslationValues
} from 'next-intl';

// Define a more flexible ReactNode type
type ReactNode = React.ReactNode | readonly React.ReactNode[];

type NextIntlTranslationFunctionBase = {
    <TargetKey extends string>(
        key: TargetKey,
        values?: TranslationValues,
        formats?: Partial<Formats>
    ): string;
};

type NextIntlTranslationFunctionExtensions = {
    rich?<TargetKey extends string>(
        key: TargetKey,
        values?: RichTranslationValues,
        formats?: Partial<Formats>
    ): string | React.ReactElement | ReactNode;
    markup?<TargetKey extends string>(
        key: TargetKey,
        values?: TranslationValues,
        formats?: Partial<Formats>
    ): string;
    // Add any other optional methods here
};

// Define a type that matches the structure of the next-intl translation function
export type NextIntlTranslationFunction = NextIntlTranslationFunctionBase & NextIntlTranslationFunctionExtensions;

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
