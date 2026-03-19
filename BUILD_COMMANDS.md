# Build and release commands for ioBroker.basic-ai

## Create / recreate the scaffold

```bash
npx @iobroker/create-adapter@latest --replay ./tools/create-adapter.replay.json --nonInteractive --skipAdapterExistenceCheck
```

## Local development

```bash
npm install
npm run check
npm run lint
npm test
```

## Release handling

```bash
npm run release
npm run release patch
npm run release minor
npm run release major
```

## GitHub Actions deployment

The included `.github/workflows/test-and-release.yml` follows the current `ioBroker.example` style.
The deploy job is intentionally commented until npm trusted publishing is configured for the repository.
