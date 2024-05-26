#!/usr/bin/env bash

# Navigate to the repository directory
cd /home/drogo/MaledaOMS_v1

# Check for changes and commit them
if ! git diff-index --quiet HEAD --; then
  git add .
  git commit -m "Automated commit"
  git push origin main
fi
