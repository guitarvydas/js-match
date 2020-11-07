#!/bin/bash
# prolog.js was transpiled from Nils Holm's Prolog Control in 6 slides
# see https://github.com/guitarvydas/OhmSmallSteps for transpiler
# see https://www.t3x.org/bits/prolog6.html for Prolog Control in 6 Slides
#
# support.js was manually written to support the above transpiler
#
# matcher.js is the Ohm grammar for the matching language (SCL)
# semantics.js is the JS code emitter hung off of the grammar - the semantics converts the input into JS
#
# test.matcher is the input program - a program the uses the matching language
#
# The transpiler converts test.matcher into JS, which calls the main routine in prolog.js to perform
#  factbase matching.
#
# full.js is a temporary file - it is not deleted (or .gitignored) to allow low-level debugging during development
#



cat support.js prolog.js matcher.js semantics.js > full.js
node full.js --input=test.matcher
