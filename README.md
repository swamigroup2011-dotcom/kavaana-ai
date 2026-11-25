# Kavaana AI

An original Android-first AI character chat and interactive storytelling app starter built with Expo + React Native.

## Included
- Dark anime-inspired home screen
- Character discovery cards
- Basic chat interface
- Demo conversation replies
- Android package ID: `com.kavaana.ai`

## Run locally
1. Install Node.js LTS.
2. Install dependencies: `npm install`
3. Start Expo: `npx expo start`
4. Install Expo Go on your Android phone and scan the QR code.

## Build an Android APK
Install EAS CLI and sign in:
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

## Important
This is a UI starter, not a fully working AI service. The current chat reply is a local demo response. To enable real AI conversations, create a backend API and call it from the app. Never place a private AI API key inside the mobile app or commit it to GitHub. Authentication, persistent chat history, moderation, voice, and character memory are not yet implemented.

## Suggested next milestones
1. Secure AI backend and provider integration
2. User authentication and database
3. Character creator and persistent memory
4. Hindi/English language settings
5. Text-to-speech and voice selection
6. APK testing and Play Store preparation
