#!/bin/sh
npm run build
rm -rf ../../../FullStack_osa_3/build
cp -r build ../../../FullStack_osa_3/
