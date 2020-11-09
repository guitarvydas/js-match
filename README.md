js-match

Pattern matcher DSL for JavaScript.

Uses a simple syntax for:

1 creating facts
2 creating match rules
3 executing a match
4 clearing the factbase

e.g.
clear;
some(foo);
some(bar);
some(baz);
eq(X,X) = succeed;
neq(X,Y) = eq(X,Y) & cut & fail | succeed;
query(some(X) & some(Y) & neq(X,Y));

* The file 'test.match' contains the above example.

* The transpiler uses the files "matcher.js" and "semantics.js".
* The transpiler transpiles "test.match" into "transpiled.js".
* The transpiled code is run to perform a simple query.

** The transpiler is an Ohm-js grammar + semantics.
** Ohm-js is a simplified pattern matching language for JS.
** An Ohm-js program consists of 2 parts - the "grammar" and the "semantics".
** The grammar is the pattern match (an uber regex, which is called a 'parser').
** The grammar - the pattern match - results in a JS tree data structure.
** The semantics is some JS code that hangs off of the tree (like, say, Christmas ornaments).
** The semantics creates JS strings using normal JS plus variables that hold the stuff that was matched.
** I use the semantics to create JS strings that become just another JS program.
*** The resulting program is the implementation of a new pattern matcher.
*** This new JS pattern matcher is the implementation of test.matcher in JS.
*** The new JS pattern matcher is run (using node) to set up a simple database and to run
***  a simple query against the database.

** Transpiling and running the result is done by the shell script "run.bash".
*** The script drags in a bunch of other JS files that form the support code for
***   the new JS code.
*** In particular, I use Lisp-like Cons cells and lists.  The implementation of these
***  lists is in support.js.  I could have used JS arrays, but I chose not to do so.
*** The files "preamble.js" and "postamble.js" contain various bits of code that made
***  life a bit easier.  For example, while debugging the transpiler, it was helpful
***  to see what the transpiler thought were Head, Body and Functor matches within
***  the test program "test.match".  All of these things become list()s in the end,
***  but it was helpful to watch what the transpiler matched.

*** To recap: run.bash contains 2 parts - (a) the transpiler and (b) a test run of
***  the transpiled code.
*** (a) consists of two files: matcher.js and semantics.js, which combine to make a
***  full-blown Ohm-JS program.
*** (b) consists mainly of "transpiled.js" and a function that runs it "runit.js".
***  The other files "support.js", "prolog.js", "preamble.js" and "postamble.js" are
***   bits of code that "transpiled.js" needs to be able to run.

***  The file "prolog.js" is actually a PROLOG (a fancy pattern matcher) interpreter
***   written in JS.  Instead of writing the PROLOG interpreter from scratch, I
***   transpiled Nils Holm's PROLOG from Scheme to JS.
**** prolog.js was transpiled from Nils Holm's Prolog Control in 6 slides
**** see https://github.com/guitarvydas/OhmSmallSteps for transpiler
**** see https://www.t3x.org/bits/prolog6.html for Prolog Control in 6 Slides
*****
***** PROLOG can be thought of as a fancy, exhaustive, pattern matcher.  It can do
*****  more than that, but it is used only as an exhaustive pattern matcher here.
****** It is *possible* to write the same pattern matcher as a bunch of nested loops
******  but it is easier to use PROLOG (if you know PROLOG).  It is probably possible
******  to use other pattern matchers, like miniKanren or, even JS+regex,
******  but I didn't go there.

* Reading the pattern matching language:
** a Logic Variable starts with a capital letter
** other variables, functions, etc. start with a lower-case letter.
** Rules are like subroutines.  They start with a Head, then a "=" then
** some bodies, separated by "|".  
** Facts are degenerate Rules - they have only a Head and no bodies.
** "clear;" clears the database.
** Queries have no Head and have exactly one Body - the pattern to be matched
**  (using Rules and Facts).

** Reading:
clear;
some(foo);
some(bar);
some(baz);
eq(X,X) = succeed;
neq(X,Y) = eq(X,Y) & cut & fail | succeed;
query(some(X) & some(Y) & neq(X,Y));
** clear the database
** create a fact, relation=some, subject=foo
** create a fact, relation=some, subject=bar
** create a fact, relation=some, subject=baz
** create a Rule called "eq" that takes two logic variables.  If the logic variables
**  are the same, then "eq" succeeds.  Two logic variables are the same if they have
**  the same logic variable name.  In this case, the first logic variable is X and the
**  second logic variable is X.  If the pattern matcher finds two things that are
**  the same, it can assign the name X to them.
***  For example:
***  eq(5,5) --> success and X=5
***  eq(5,6) --> fails, because X cannot be 5 and 6 at the same time.
** the Rule neq says that if we find two things that are the same, then cut and fail.
*** Cut is an optimization, like a ratchet,
***   that says "don't try other possibilities, if both things are the same",
***   always fail if both things are the same and Cut to the chase.  If both things
***   are the same, then ratchet into the first choice and never try the second choice.
** or, otherwise, neq succeeds (because both things are not the same, they are "neq").
***  For example:
***  neq(5,5) --> fail, because X=5 and X=5 at the same time.
***  neq(5,6) --> success, because X can't be 5 and 6 at the same time, the alternate route is taken (which always succeeds - the alternate route is taken ONLY if both things are not the same).
*** query - find all matches where some(X) and some(Y) and neq(X,Y) at the same time.
**** This is where backtracking performs exhaustive search - the pattern finds ALL
**** matches.  Most pattern matchers, like regex, stop after the first match is found.  Backtracking finds ALL of the matches.
