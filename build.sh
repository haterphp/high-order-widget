#!/bin/bash

rm -rf ./lib_build

npm install
npm run build:rollup;

mkdir ./lib_build
cp -ar ./dist/. ./lib_build/lib
rm -rf ./dist

cp ./package.json ./lib_build
cp ./LICENSE ./lib_build