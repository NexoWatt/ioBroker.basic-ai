# Git setup

After unpacking the ZIP, you can initialize and push the repository like this:

```bash
git init
git add .
git commit -m "Initial commit: ioBroker basic-ai adapter"
git branch -M main
git remote add origin https://github.com/<your-user>/ioBroker.basic-ai.git
git push -u origin main
```

Before publishing, replace placeholder values in these files:

- `package.json`
- `io-package.json`
- `README.md`
- `tools/create-adapter.replay.json`
