#!/bin/bash
echo "make node_modules... -> mkdir node_modules"
mkdir node_modules || { echo "nmkdir node_modules failed"; exit 1; }

echo "Installing Yarn... -> npm i -g yarn"
npm i -g yarn || { echo "npm i -g yarn failed"; exit 1; }

echo "prevent-npm success"