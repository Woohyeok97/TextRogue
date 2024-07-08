#!/bin/bash
echo "yarn set version 4.3.1... -> yarn set version 4.3.1"
yarn set version 4.3.1 || { echo "yarn set version 4.3.1 failed"; exit 1; }

echo "yarn.sh completed successfully"