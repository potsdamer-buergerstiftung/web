#!/bin/sh

npx directus bootstrap
# Comment out the following line if you want to sync the snapshot
# npx directus schema apply --yes ./snapshots/bu.json
node cli.js bootstrap && pm2-runtime start ecosystem.config.cjs