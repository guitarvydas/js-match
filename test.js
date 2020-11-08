////
// transpiled to JS
	  clearDB ();
	  fact1 ("some", "foo");
	  fact1 ("some", "bar");
	  fact1 ("some", "baz");
	  rule (list ("eq", lvar("X"), lvar ("X")), [succeed ()]);
	  rule (list ("neq", lvar ("X"), lvar ("Y")),
		  [
		      list (
			  list ("eq", lvar ("X"), lvar ("Y")), 
			  cut (),
			  fail ()
		      ),
		      succeed ()
		  ]
		 );
	  var result= query (
	      list (
		  list ("some", lvar ("X")), 
		  list ("some", lvar ("Y")), 
		  list ("neq", lvar ("X"), lvar ("Y"))
	      ));

