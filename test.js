////
// transpiled to JS
////
var db = list ();

function clearDB () { db = list (); };
function pushDB (x) { db = cons (x, db); };
function lvar (s) { return list ("?",s); };
function fact0 (r) { pushDB (list (list (r))); }
function fact1 (r,s) { pushDB (list (list (r,s))); }
function fact2 (r,s,o) { pushDB (list (list (r,s,o))); }
function orRule (head, bodies) {
    // make multiple rules, one for each body clause: cons(head,clause)
    // head is a Cons()
    // body is an array of Cons()
    var rule;
    for (var i = (bodies.length - 1) ; i >= 0 ; i -= 1) {
	body = bodies[i];
	rule = cons (head, body);
	pushDB (rule);
    };
    return "nil";
};
function lvar (letter) { return list ("?", letter); };
function succeed () { return list (); };
function cut () { return "!"; };
function fail () { return "fail"; };
function match (goal) {
    clear_result ();
    prove6 (list (), goal, db, empty, 1, list (), db);
    var r = get_result ();
    return r;
}

      function execMatch () {
	  clearDB ();
	  fact1 ("some", "foo");
	  fact1 ("some", "bar");
	  fact1 ("some", "baz");
	  orRule (list ("eq", lvar ("X"), lvar ("X")), [succeed ()]);
	  orRule (list ("neq", lvar ("X"), lvar ("Y")),
		  [
		      list (
			  list ("eq", lvar ("X"), lvar ("Y")), 
			  cut (),
			  fail ()
		      ),
		      succeed ()
		  ]
		 );
	  var result= match (
	      list (
		  list ("some", lvar ("X")), 
		  list ("some", lvar ("Y")), 
		  list ("neq", lvar ("X"), lvar ("Y"))
	      ));
	  return result;
      }

