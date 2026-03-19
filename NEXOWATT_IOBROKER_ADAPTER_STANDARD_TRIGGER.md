# nexoWatt ioBroker Adapter Standard Trigger

## Kurztrigger für neue Chats

Kopiere in einen neuen Chat einfach diesen Block:

```text
Verwende den „nexoWatt ioBroker Adapter Standard“.
Für jeden neuen ioBroker-Adapter gelten automatisch diese Regeln, solange ich nichts anderes sage:
- Release-Script ist Pflicht
- LICENSE-Inhaber ist immer nexoWatt
- Logo einbauen, wenn ich eines liefere
- git-taugliche Repo-ZIP ohne .git liefern
- klar sagen, was gebaut wurde und was noch nicht getestet wurde
- alle Standarddateien und Workflows für aktuelle ioBroker-Adapter mitliefern
```

## Vollständige Checkliste

Wenn der Trigger aktiv ist, sollst du bei neuen ioBroker-Adaptern standardmäßig auf Folgendes achten:

1. **Adapter-Grundstruktur**
   - technischer Name in `kebab-case`
   - sichtbarer Titel separat
   - sauberes `ioBroker.<adaptername>`-Projekt
   - create-adapter-Grundgerüst plus Nacharbeiten

2. **Pflichtdateien**
   - `package.json`
   - `io-package.json`
   - `main.js` oder passende Einstiegspunkte
   - `README.md`
   - `LICENSE`
   - `.gitignore`

3. **Admin / UI**
   - `admin/<adaptername>.png`
   - `admin/jsonConfig.json` oder passende Admin-Dateien
   - Logo integrieren, wenn vorhanden

4. **Qualität / Tests**
   - `test/`
   - `eslint.config.mjs`
   - `tsconfig.json`
   - `tsconfig.check.json`

5. **Release-Standard**
   - `@alcalzone/release-script`
   - `@alcalzone/release-script-plugin-iobroker`
   - `@alcalzone/release-script-plugin-license`
   - `@alcalzone/release-script-plugin-manual-review`
   - `.releaseconfig.json`
   - `package.json` mit `release`-Script
   - Release-Script **niemals vergessen**

6. **GitHub / CI**
   - `.github/workflows/test-and-release.yml`
   - Check/Lint-Job
   - Adapter-Test-Job
   - vorbereiteter Release-/Deploy-Block, falls passend

7. **Metadaten**
   - `LICENSE` immer auf **nexoWatt**
   - Autorenangaben konsistent halten
   - Platzhalter bei GitHub-Handle/E-Mail klar markieren, wenn nicht bekannt

8. **README-Inhalt**
   - kurze Übersicht
   - States / Funktionen
   - Konfiguration
   - Build-, Lint-, Test- und Release-Befehle
   - Changelog-Abschnitt
   - ehrlicher Hinweis, was wirklich getestet wurde

9. **Auslieferung**
   - Repo als ZIP für Git bereitstellen
   - keinen `.git`-Ordner einpacken
   - Befehle für `git init`, `git add`, `git commit` mitgeben

## Arbeitsregel

Wenn etwas fehlt, sollst du es aktiv ergänzen statt stillschweigend wegzulassen.
Wenn etwas nicht geprüft wurde, sollst du das klar benennen.
