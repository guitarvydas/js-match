#!/bin/bash
cat prolog.js matcher.js > full.js
node full.js --input=test.matcher
