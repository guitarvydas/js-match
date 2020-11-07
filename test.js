////
// transpiled to JS
////
var db = list ();

function clearDB () { db = list (); };
function pushDB (x) { db = cons (x, db); };
function lvar (s) { return list("?",s); };
function fact0 (r) { pushDB (list (list (r))); }
function fact1 (r,s) { pushDB (list (list (r,s))); }
function fact2 (r,s,o) { pushDB (list (list (r,s,o))); }
function orRule (head, body) {  /// head is a list(...), body is an array of list(...)
    body.forEach (b => pushDB (list (h, b)));
};
function lvar (letter) { return list ("?", letter); };
function succeed () { return list (); };
function cut () { return "!"; };
function fail () { return "fail"; };
function match (goal) {
    clear_result ();
    prove6 (list (), goal, db, empty, 1, list (), db);
    console.log (get_result ());
}

clearDB ();
fact1 ("some", "foo");
fact1 ("some", "bar");
fact1 ("some", "baz");
// orRule (["eq", lvar ("X"), lvar ("X")], [ succeed (); ]);
orRule (list ("eq", lvar ("X"), lvar ("X")), [ succeed (); ]);
// orRule (["neq", lvar ("X"), lvar ("Y")], 
// 	[ ["eq", lvar ("X"), lvar ("Y")], 
// 	    cut (),
// 	    fail ()
// 	  )],
// 	[ l_and( succeed() )]
//        );
orRule (list ("neq", lvar ("X"), lvar ("Y")),
	[ list ( list( "eq", lvar ("X"), lvar ("Y")), 
		 cut (),
		 fail ()),
	[ succeed() ]
       );
clear_result ();
match ( list (
                 list ("some", lvar("X")), 
                 list ("some", lvar ("Y"))
                 list ("neq", lvar ("X"), lvar ("Y"))
             )
      );
	    
