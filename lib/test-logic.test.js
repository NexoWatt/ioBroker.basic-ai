'use strict';

const assert = require('node:assert/strict');
const { buildStatusMessage, sanitizeText } = require('./test-logic');

describe('test-logic', () => {
    it('sanitizes whitespace', () => {
        assert.equal(sanitizeText('  hello   world  '), 'hello world');
    });

    it('builds a prefixed status message', () => {
        assert.equal(buildStatusMessage('Basic AI', 'Adapter started'), 'Basic AI: Adapter started');
    });

    it('returns message only when prefix is empty', () => {
        assert.equal(buildStatusMessage('', 'Only text'), 'Only text');
    });
});
