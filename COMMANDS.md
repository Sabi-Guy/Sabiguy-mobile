# SabiGuy Mobile Commands

## Local Development

Start Expo:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

## EAS Setup

Install EAS CLI:

```bash
npm install -g eas-cli
```

Login to Expo:

```bash
npx eas login
```

Link or confirm the project:

```bash
npx eas project:info
```

## Preview APK Build

Build Android preview APK:

```bash
npm run build:preview:android
```

Direct EAS command:

```bash
npx eas build --platform android --profile preview
```

## Production Android Build

Build production Android app:

```bash
npm run build:production:android
```

Direct EAS command:

```bash
npx eas build --platform android --profile production
```

## EAS Update

Publish update to preview channel:

```bash
npm run update:preview -- --message "Preview update"
```

Direct command:

```bash
npx eas update --channel preview --environment preview --message "Preview update"
```

Publish update to production channel:

```bash
npm run update:production -- --message "Production update"
```

Direct command:

```bash
npx eas update --channel production --environment production --message "Production update"
```

## Useful Checks

See build status:

```bash
npx eas build:list
```

See update history:

```bash
npx eas update:list
```

See branch and channel info:

```bash
npx eas channel:list
```

## Notes

- `preview` builds are configured to generate an APK.
- `preview` OTA updates go to the `preview` channel.
- `production` OTA updates go to the `production` channel.
- If this is your first cloud build, EAS may ask for Android package details.
