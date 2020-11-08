clearDB();
fact1 ("some", functor0 ("foo"));
fact1 ("some", functor0 ("bar"));
fact1 ("some", functor0 ("baz"));
rule (head ("eq", lvar("X"), lvar("X")), body (true));
rule (head ("neq", lvar("X"), lvar("Y")), body (functor2 ("eq", lvar("X"), lvar("Y")), cut, false));
rule (head ("neq", lvar("X"), lvar("Y")), body (true));
return query (goal (functor1 ("some", lvar("X")), functor1 ("some", lvar("Y")), functor2 ("neq", lvar("X"), lvar("Y"))));
