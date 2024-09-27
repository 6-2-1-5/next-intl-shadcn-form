"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtc = exports.stc = void 0;
exports.serializeTranslationCall = serializeTranslationCall;
exports.deserializeTranslationCall = deserializeTranslationCall;
exports.isSerializedTranslationCall = isSerializedTranslationCall;
// Serialize the translation call to a string
function serializeTranslationCall(key, values) {
    const serialized = {
        type: 'translationCall',
        key,
        values: values || {}
    };
    return JSON.stringify(serialized);
}
exports.stc = serializeTranslationCall;
// Deserialize the string back to a translation call and execute it
function deserializeTranslationCall(serialized, t) {
    if (!isSerializedTranslationCall(serialized)) {
        throw new Error('Invalid serialized translation call');
    }
    const parsed = JSON.parse(serialized);
    return t(parsed.key, parsed.values);
}
exports.dtc = deserializeTranslationCall;
// Check if a string is a valid serialized translation call
function isSerializedTranslationCall(str) {
    try {
        const parsed = JSON.parse(str);
        return (typeof parsed === 'object' &&
            parsed !== null &&
            parsed.type === 'translationCall' &&
            typeof parsed.key === 'string' &&
            (typeof parsed.values === 'object' || parsed.values === undefined));
    }
    catch (error) {
        return false;
    }
}
