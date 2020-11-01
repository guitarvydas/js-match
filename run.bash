#!/bin/bash
cat prolog.js matcher.js semantics.js > full.js
node full.js --input=test.matcher
