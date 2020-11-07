#!/bin/bash
cat support.js prolog.js test.js runit.js >full.js
node full.js
