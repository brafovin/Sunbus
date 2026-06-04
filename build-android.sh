#!/bin/bash
# Sport TV - Android APK Build Script
# Voraussetzung: Android Studio + JDK 17+

echo "🏗️  Sport TV - Android Build"
echo "================================"

# 1. Web-App bauen
echo "📦 Web-App wird gebaut..."
npm run build

# 2. Capacitor synchronisieren
echo "🔄 Capacitor wird synchronisiert..."
npx cap sync android

# 3. APK bauen
echo "📱 APK wird gebaut..."
cd android
./gradlew assembleDebug

echo ""
echo "✅ Fertig! APK liegt unter:"
echo "   android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📲 Auf Handy installieren:"
echo "   adb install android/app/build/outputs/apk/debug/app-debug.apk"
