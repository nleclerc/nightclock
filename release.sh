#!/bin/sh

BASEDIR=$(dirname "$0")
cd $BASEDIR

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed 's/^ *//')

APP_NAME=$(cat package.json \
  | grep displayName \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed 's/[[:space:]]*//g')

# echo "dist/$APP_NAME-$PACKAGE_VERSION.apk"
rm -rf dist && mkdir -p dist && ./cordova build --release --device && mv platforms/android/build/outputs/apk/android-release.apk "dist/$APP_NAME-$PACKAGE_VERSION.apk"
