# Breezy Studio

The desktop app for [Breezy](https://breezy.stream). Breezy Studio runs the full Breezy console in a native window and adds what a browser can't do: it **trains your object classification models locally** on your own GPU, then uploads the result to your Breezy account.

The trained models run live in OBS through the [Breezy OBS Plugin](https://github.com/breezystream/obs-breezy).

## Download

Get the latest build from [breezy.stream](https://breezy.stream) or from the [Releases](https://github.com/breezystream/breezy-studio/releases) page.

| Platform | Training backend |
|---|---|
| macOS 12+ (Apple Silicon) | PyTorch MPS |
| Windows 10+ (x64) | PyTorch CUDA (NVIDIA GPU, CPU fallback) |

## How it works

1. The app opens `my.breezy.stream` in an Electron window.
2. When you start a training in the console, the app downloads the model's labeled images through the Breezy API.
3. A bundled Python environment fine-tunes MobileNetV2 (transfer learning), validates it and exports it to ONNX. The export is checked against PyTorch on validation images before it's kept.
4. The `.onnx` model and its metrics are uploaded back to your account, ready to load in OBS.

The web page talks to the app through a small IPC bridge (`window.electron`, see [src/preload.ts](src/preload.ts)). The training channels live in [src/object-classification/main.ts](src/object-classification/main.ts).

## Project layout

```
src/
  main.ts                    Entry point, environment and URLs
  app.ts                     Window, menu, display settings
  preload.ts                 IPC bridge exposed to the web page
  libs/                      Apollo client, task runner, storage, Python process
  object-classification/
    main.ts                  Training session (IPC handlers)
    task/                    Prepare → Train → Upload → Finish tasks
    scripts/                 Python training, validation and export
scripts/
  python-env/                Builds the bundled Python environments
  make-icon-*.sh             Generates app icons
build/                       Icons and macOS entitlements
```

## Development

### Requirements

- Node.js 22+
- [Miniforge](https://github.com/conda-forge/miniforge) (conda), to build the Python environment
- On Windows, Git Bash to run the environment scripts

### Setup

```bash
npm install

# Build the bundled Python environment (once, takes a while)
bash ./scripts/python-env/create-env-mac.sh   # macOS → python/mac
bash ./scripts/python-env/create-env-win.sh   # Windows → python/win
```

### Run

```bash
BREEZY_DEV=0 npm start
```

`npm start` compiles in watch mode and restarts Electron on changes. An unpackaged build targets the local development server (`https://breezy.test`) by default. Set `BREEZY_DEV=0` to use production (`my.breezy.stream`) with your own Breezy account.

| Variable | Effect |
|---|---|
| `BREEZY_DEV=0` | Use production, even when unpackaged |
| `BREEZY_DEV=1` | Use `breezy.test`, even when packaged |

### GraphQL types

The operations are in `src/**/*.graphql`. To regenerate the typed documents after changing them:

```bash
npm run codegen
```

The schema URL is set in [codegen.ts](codegen.ts).

### Package

```bash
npm run dist:mac      # unsigned .dmg / .zip in release/
npm run dist:win      # unsigned installer in release/
```

### Release

Installed apps update themselves from the GitHub [Releases](https://github.com/breezystream/breezy-studio/releases) page. They check at launch and every hour, download the update in the background and install it when the app quits. Only the changed blocks are downloaded, so an update that doesn't touch the Python environment is a few MB.

The release scripts need:

| Variable | Used by | Purpose |
|---|---|---|
| `GH_TOKEN` | both | Fine-grained GitHub token on `breezystream/breezy-studio` with **Contents: Read and write** |
| `APPLE_API_KEY`, `APPLE_API_KEY_ID`, `APPLE_API_ISSUER` | macOS | App Store Connect API key, for signing and notarization |

On macOS, `npm run release:mac` sources them from `~/.config/breezy/notarize.env`. On Windows, set `GH_TOKEN` in the environment.

To publish a version:

1. Bump the version and push the tag:
   ```bash
   npm version patch          # or minor / major — commits and tags vX.Y.Z
   git push --follow-tags
   ```
2. On macOS, run `npm run release:mac`. It builds, notarizes and uploads the `.dmg`, `.zip`, blockmaps and `latest-mac.yml` to a **draft** release `vX.Y.Z`.
3. On Windows, `git pull` then run `npm run release:win`. It adds the installer and `latest.yml` to the same draft.
4. On GitHub, open the draft, check that both `latest-mac.yml` and `latest.yml` are attached, add release notes and click **Publish release**.

Installed apps only see a release once it's published, so the draft is the last chance to check it.

To test an update end to end, install a published version, release the next one, then open the installed app. It should download the update and notify you. Quit and reopen to run the new version.

## Contributing

Issues and pull requests are welcome. For anything bigger than a fix, please open an issue first to discuss it.

## License

[MIT](LICENSE). "Breezy" and the Breezy logo are trademarks of their owner and aren't covered by this license.
