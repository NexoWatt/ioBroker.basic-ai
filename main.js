'use strict';

/*
 * Created with @iobroker/create-adapter v3.1.2
 */

const utils = require('@iobroker/adapter-core');
const {
	normalizeInterval,
	normalizeMessage,
	buildExecutionMessage,
} = require('./lib/test-logic');

class BasicAi extends utils.Adapter {
	/**
	 * @param {Partial<utils.AdapterOptions>} [options] - Adapter options
	 */
	constructor(options) {
		super({
			...options,
			name: 'basic-ai',
		});

		/** @type {NodeJS.Timeout | undefined} */
		this.heartbeatTimer = undefined;
		this.heartbeatCounter = 0;

		this.on('ready', this.onReady.bind(this));
		this.on('stateChange', this.onStateChange.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and the adapter received its configuration.
	 */
	async onReady() {
		await this.setState('info.connection', false, true);
		await this.ensureObjects();
		await this.subscribeStates('test.trigger');

		const defaultMessage = normalizeMessage(this.config.defaultMessage);
		const heartbeatEnabled = this.config.enableHeartbeat !== false;
		const heartbeatInterval = normalizeInterval(this.config.heartbeatInterval);
		const startedAt = new Date().toISOString();

		await Promise.all([
			this.setState('status.ready', true, true),
			this.setState('status.lastStart', startedAt, true),
			this.setState('status.heartbeatCount', this.heartbeatCounter, true),
			this.setState('status.message', defaultMessage, true),
			this.setState('test.lastResult', 'Adapter started successfully', true),
			this.setState('test.lastExecution', startedAt, true),
			this.setState('info.connection', true, true),
		]);

		if (heartbeatEnabled) {
			this.heartbeatTimer = setInterval(() => {
				void this.updateHeartbeat(defaultMessage);
			}, heartbeatInterval * 1000);
			this.log.info(`Heartbeat enabled (${heartbeatInterval} seconds)`);
		} else {
			this.log.info('Heartbeat is disabled in the adapter configuration');
		}
	}

	/**
	 * Create all runtime objects used by this test adapter.
	 */
	async ensureObjects() {
		await this.extendObjectAsync('status', {
			type: 'channel',
			common: {
				name: 'Status',
			},
			native: {},
		});

		await this.extendObjectAsync('status.ready', {
			type: 'state',
			common: {
				name: 'Adapter ready',
				type: 'boolean',
				role: 'indicator',
				read: true,
				write: false,
				def: false,
			},
			native: {},
		});

		await this.extendObjectAsync('status.lastStart', {
			type: 'state',
			common: {
				name: 'Last start',
				type: 'string',
				role: 'text',
				read: true,
				write: false,
				def: '',
			},
			native: {},
		});

		await this.extendObjectAsync('status.heartbeatCount', {
			type: 'state',
			common: {
				name: 'Heartbeat count',
				type: 'number',
				role: 'value',
				read: true,
				write: false,
				def: 0,
			},
			native: {},
		});

		await this.extendObjectAsync('status.message', {
			type: 'state',
			common: {
				name: 'Status message',
				type: 'string',
				role: 'text',
				read: true,
				write: false,
				def: '',
			},
			native: {},
		});

		await this.extendObjectAsync('test', {
			type: 'channel',
			common: {
				name: 'Test actions',
			},
			native: {},
		});

		await this.extendObjectAsync('test.trigger', {
			type: 'state',
			common: {
				name: 'Run test trigger',
				type: 'boolean',
				role: 'button',
				read: false,
				write: true,
				def: false,
			},
			native: {},
		});

		await this.extendObjectAsync('test.lastResult', {
			type: 'state',
			common: {
				name: 'Last test result',
				type: 'string',
				role: 'text',
				read: true,
				write: false,
				def: '',
			},
			native: {},
		});

		await this.extendObjectAsync('test.lastExecution', {
			type: 'state',
			common: {
				name: 'Last test execution',
				type: 'string',
				role: 'text',
				read: true,
				write: false,
				def: '',
			},
			native: {},
		});
	}

	/**
	 * Update the heartbeat states in the background.
	 *
	 * @param {string} defaultMessage - Base message configured by the user
	 */
	async updateHeartbeat(defaultMessage) {
		this.heartbeatCounter += 1;
		const timestamp = new Date().toISOString();
		const message = buildExecutionMessage(defaultMessage, this.heartbeatCounter, timestamp);

		await Promise.all([
			this.setState('status.heartbeatCount', this.heartbeatCounter, true),
			this.setState('status.message', message, true),
			this.setState('test.lastExecution', timestamp, true),
		]);
	}

	/**
	 * Execute the writable test action.
	 */
	async runTestAction() {
		this.heartbeatCounter += 1;
		const defaultMessage = normalizeMessage(this.config.defaultMessage);
		const timestamp = new Date().toISOString();
		const result = buildExecutionMessage(defaultMessage, this.heartbeatCounter, timestamp);

		await Promise.all([
			this.setState('status.heartbeatCount', this.heartbeatCounter, true),
			this.setState('status.message', result, true),
			this.setState('test.lastResult', result, true),
			this.setState('test.lastExecution', timestamp, true),
			this.setState('test.trigger', false, true),
		]);
	}

	/**
	 * Is called when adapter shuts down.
	 *
	 * @param {() => void} callback - Callback function
	 */
	onUnload(callback) {
		try {
			if (this.heartbeatTimer) {
				clearInterval(this.heartbeatTimer);
				this.heartbeatTimer = undefined;
			}

			callback();
		} catch (error) {
			this.log.error(`Error during unloading: ${error.message}`);
			callback();
		}
	}

	/**
	 * Is called if a subscribed state changes.
	 *
	 * @param {string} id - State ID
	 * @param {ioBroker.State | null | undefined} state - State object
	 */
	async onStateChange(id, state) {
		if (!state) {
			return;
		}

		if (id === `${this.namespace}.test.trigger` && state.ack === false) {
			try {
				await this.runTestAction();
			} catch (error) {
				this.log.error(`Failed to execute test trigger: ${error.message}`);
			}
		}
	}
}

if (require.main !== module) {
	/**
	 * @param {Partial<utils.AdapterOptions>} [options] - Adapter options
	 */
	module.exports = options => new BasicAi(options);
} else {
	new BasicAi();
}
