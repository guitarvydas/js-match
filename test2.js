clearDB();
fact1 ("some", functor0 ("foo"));
fact1 ("some", functor0 ("bar"));
fact1 ("some", functor0 ("baz"));
rule (head ("eq", lvar("X"), lvar("X")), body ());
rule (head ("neq", lvar("X"), lvar("Y")), body (functor2 ("eq", lvar("X"), lvar("Y")), cut (), fail ()));
rule (head ("neq", lvar("X"), lvar("Y")), body ());
var result = query (goal (functor1 ("some", lvar("X")), functor1 ("some", lvar("Y")), functor2 ("neq", lvar("X"), lvar("Y"))));
