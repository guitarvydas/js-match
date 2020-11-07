js-match

Matcher for JavaScript.

Uses a simple syntax for:

1 creating facts
2 creating match rules
3 executing a match
4 clearing the factbase

[ the following code is incorrect and is in development ...]
e.g.
clear.
some(foo).
some(bar).
some(baz).
eq(X,X) = true.
neq(X,Y) = eq(Z) & eq(Y) & cut & false.
match(some(Z) & some(Y) & neq(X,Y)).


Based on the transpilation of Nils Holm's PROLOG In 6 Slides) to JS (see https://github.com/guitarvydas/OhmSmallSteps - if you don't want to read the full article, just grab support.js and prolog-6.js).

# development: using test.js to try out various hand-transpiled code sequences
# development: run node test.js to test

#
# use the script run.bash to run the transpiler and the corresponding factbase matcher
#
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
