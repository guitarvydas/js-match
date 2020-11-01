js-match

Matcher for JavaScript.

Uses a simple syntax for:

1 creating facts
2 creating match rules
3 executing a match
4 clearing the factbase

e.g.
clear.
some(foo).
some(bar).
some(baz).
eq(X,X) = true.
neq(X,Y) = eq(Z) & eq(Y) & cut & false.
match(some(Z) & some(Y) & neq(X,Y)).


Based on the transpilation of Nils Holm's PROLOG In 6 Slides) to JS (see https://github.com/guitarvydas/OhmSmallSteps).

