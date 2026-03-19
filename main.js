'use strict';

const utils = require('@iobroker/adapter-core');
const { buildStatusMessage } = require('./lib/test-logic');

/**
 * @typedef {import('@iobroker/types').AdapterOptions} AdapterOptions
 */

class BasicAi extends utils.Adapter {
    /**
     * @param {Partial<AdapterOptions>=} options Adapter options
     */
    constructor(options = {}) {
        super({
            ...options,
            name: 'basic-ai',
        });

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Initializes adapter states and subscriptions.
     * @returns {Promise<void>}
     */
    async onReady() {
        await this.ensureObjects();
        await this.subscribeStatesAsync('test.trigger');

        await this.setStateAsync('status.ready', true, true);
        await this.setStateAsync(
            'status.message',
            buildStatusMessage(this.config.promptPrefix || 'Basic AI', 'Adapter started'),
            true,
        );

        if (this.config.enableDebugLog) {
            this.log.info(`Debug logging enabled. Default prompt: ${this.config.defaultPrompt || ''}`);
        }
    }

    /**
     * Creates the states used by this test adapter.
     * @returns {Promise<void>}
     */
    async ensureObjects() {
        await this.setObjectNotExistsAsync('status.ready', {
            type: 'state',
            common: {
                name: 'Adapter ready',
                type: 'boolean',
                role: 'indicator.reachable',
                read: true,
                write: false,
                def: false,
            },
            native: {},
        });

        await this.setObjectNotExistsAsync('status.message', {
            type: 'state',
            common: {
                name: 'Current test message',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
                def: '',
            },
            native: {},
        });

        await this.setObjectNotExistsAsync('test.trigger', {
            type: 'state',
            common: {
                name: 'Trigger test action',
                type: 'boolean',
                role: 'button',
                read: true,
                write: true,
                def: false,
            },
            native: {},
        });
    }

    /**
     * Handles manual test triggers.
     * @param {string} id State id
     * @param {ioBroker.State | null | undefined} state State payload
     * @returns {Promise<void>}
     */
    async onStateChange(id, state) {
        if (!state || state.ack) {
            return;
        }

        if (id !== `${this.namespace}.test.trigger`) {
            return;
        }

        const message = buildStatusMessage(
            this.config.promptPrefix || 'Basic AI',
            this.config.defaultPrompt || 'Trigger received',
        );

        await this.setStateAsync('status.message', message, true);
        await this.setStateAsync('test.trigger', false, true);

        if (this.config.enableDebugLog) {
            this.log.info(`Updated test message: ${message}`);
        }
    }

    /**
     * Cleans up adapter state before shutdown.
     * @param {() => void} callback Callback supplied by ioBroker
     */
    onUnload(callback) {
        void this.setStateAsync('status.ready', false, true).catch(() => {
            // ignore shutdown errors
        });
        callback();
    }
}

if (require.main !== module) {
    /**
     * @param {Partial<AdapterOptions>=} options Adapter options
     * @returns {BasicAi}
     */
    module.exports = options => new BasicAi(options);
} else {
    new BasicAi();
}
