'use strict';

/**
 * Normalize the configured heartbeat interval.
 *
 * @param {number | string | undefined | null} value
 * @returns {number}
 */
function normalizeInterval(value) {
	const parsed = Number(value);
	if (!Number.isFinite(parsed) || parsed < 1) {
		return 30;
	}
	return Math.round(parsed);
}

/**
 * Normalize the default message from the adapter config.
 *
 * @param {string | undefined | null} value
 * @returns {string}
 */
function normalizeMessage(value) {
	if (typeof value !== 'string') {
		return 'Basic AI is ready';
	}

	const normalized = value.trim();
	return normalized || 'Basic AI is ready';
}

/**
 * Build a human-readable execution message.
 *
 * @param {string} message
 * @param {number} counter
 * @param {string} timestamp
 * @returns {string}
 */
function buildExecutionMessage(message, counter, timestamp) {
	return `${message} | execution #${counter} @ ${timestamp}`;
}

module.exports = {
	normalizeInterval,
	normalizeMessage,
	buildExecutionMessage,
};
