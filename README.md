![Logo](admin/basic-ai.png)
# ioBroker.basic-ai

## Overview

**basic-ai** is a small ioBroker test adapter scaffold for Basic AI.
It is intended as a clean starting point for experiments, adapter development,
and quick validation inside a local ioBroker environment.

## Current test functions

The adapter creates a few demo objects when it starts:

- `basic-ai.0.status.ready`
- `basic-ai.0.status.lastStart`
- `basic-ai.0.status.heartbeatCount`
- `basic-ai.0.status.message`
- `basic-ai.0.test.trigger`
- `basic-ai.0.test.lastResult`
- `basic-ai.0.test.lastExecution`
- `basic-ai.0.info.connection`

If you write `true` to `basic-ai.0.test.trigger`, the adapter runs a simple test action,
increments the counter and writes a new result message.

## Adapter configuration

The Admin UI contains three simple test settings:

- **Enable heartbeat**
- **Heartbeat interval (seconds)**
- **Default test message**

## Development

Install dependencies:

```bash
npm install
```

Run validation:

```bash
npm run lint
npm run check
npm test
```

## Scaffold command

The base project can be scaffolded with the official ioBroker creator and the replay file
included in `tools/create-adapter.replay.json`:

```bash
npx @iobroker/create-adapter@latest --replay ./tools/create-adapter.replay.json --nonInteractive --skipAdapterExistenceCheck
```

## Notes

- The repository, GitHub handle and email are placeholders and should be replaced before publishing.
- The logo from this project is already included as `admin/basic-ai.png`.
- This repository is intentionally kept simple as a test adapter baseline.

## Changelog

### 0.0.1
- initial test adapter scaffold

## License

MIT License


## Git repository

This folder is ready to be zipped and uploaded as a Git repository baseline.
See `GIT_SETUP.md` for the initial Git commands after unpacking.
