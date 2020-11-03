////
// transpiled to JS
////
var db = List ();

function clearDB () { db = List (); };
function pushDB (x) { db = cons (x, db); };
function lvar (s) { return list("?",s); };
function fact0 (r) { pushDB (list (list (r))); }
function fact1 (r,s) { pushDB (list (list (r,s))); }
function fact2 (r,s,o) { pushDB (list (list (r,s,o))); }
function convertForFactbase (arr) {
    var result = List ();
    let a = arr.reverse ();
    a.forEach (item => result = cons (item, result));
    return result;
};	
function orRule (head, body) {
    var h = convertForFactbase (head);
    body.forEach (b => pushDB (list (h, convertForFactbase (b))));
};
function lvar (letter) { return cons ("?", letter); };
function succeed () { return List (); };
function cut () { return "!"; };
function fail () { return "fail"; };
function l_and () { 
    var result = List ();
    for (var i = (arguments.length - 1) ; i > = 0 ; i--) {
	result = cons (arguments[i], result);
    }
    return result;
};
function match (goal) {
    clear_result ();
    prove6 (list (), goal, db, empty, 1, list (), db);
    console.log (get_result ());
}

clearDB ();
fact1 ("some", "foo");
fact1 ("some", "bar");
fact1 ("some", "baz");
orRule (["eq", lvar ("X"), lvar ("X")], []);
orRule (["neq", lvar ("X"), lvar ("Y")], 
	[ l_and(
	    ["eq", lvar ("X"), lvar ("Y")], 
	    cut (),
	    fail ()
	  )],
	[ l_and( succeed() )]
       );
clear_result ();
match (l_and (["some", lvar("X")], 
            ["some", lvar ("Y")], 
	      ["neq", lvar ("X"), lvar ("Y")]));
	    
