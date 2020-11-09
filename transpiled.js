clearDB();
fact1 ("line", functor0 ("a"));
fact1 ("line", functor0 ("b"));
fact1 ("line", functor0 ("c"));
rule (head ("eq", lvar("X"), lvar("X")), body ());
rule (head ("neq", lvar("X"), lvar("Y")), body (functor2 ("eq", lvar("X"), lvar("Y")), cut (), fail ()));
rule (head ("neq", lvar("X"), lvar("Y")), body ());
var result = query (goal (functor1 ("line", lvar("X")), functor1 ("line", lvar("Y")), functor2 ("neq", lvar("X"), lvar("Y"))));
