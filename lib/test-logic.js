'use strict';

/**
 * Sanitizes a text fragment for status output.
 * @param {string} value Input value
 * @returns {string} Sanitized value
 */
function sanitizeText(value) {
    return String(value || '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Builds a display message for the adapter status.
 * @param {string} prefix Prefix for the message
 * @param {string} message Message content
 * @returns {string} Combined display message
 */
function buildStatusMessage(prefix, message) {
    const left = sanitizeText(prefix);
    const right = sanitizeText(message);

    if (!left && !right) {
        return '';
    }
    if (!left) {
        return right;
    }
    if (!right) {
        return left;
    }
    return `${left}: ${right}`;
}

module.exports = {
    sanitizeText,
    buildStatusMessage,
};
