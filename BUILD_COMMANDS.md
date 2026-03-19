# Basic AI – Scaffold & validation

## Adapter scaffold

```bash
npx @iobroker/create-adapter@latest --replay ./tools/create-adapter.replay.json --nonInteractive --skipAdapterExistenceCheck
```

## Local setup

```bash
cd ioBroker.basic-ai
npm install
npm run build
npm run lint
npm test
```

## Notes

- `npm run build` maps to `npm run check` in this JavaScript-based test adapter.
- Replace the placeholder GitHub handle and email before publishing.
- The ready-to-use logo is already stored as `admin/basic-ai.png`.
