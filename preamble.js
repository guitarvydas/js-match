var db = list ();

function clearDB () { db = list (); };
function pushDB (x) { db = cons (x, db); };
function lvar (s) { return list ("?",s); };
function fact0 (r) { pushDB (list (list (r))); }
function fact1 (r,s) { pushDB (list (list (r,s))); }
function fact2 (r,s,o) { pushDB (list (list (r,s,o))); }
function rule (head, bodyList) {
    // make multiple rules, one for each body clause: cons(head,clause)
    // head is a Cons()
    // body is an array of Cons()
    var rle;
    console.log ("rule ");
    console.log (head.toString());
    console.log (bodyList.toString());
    while (! (isNil (bodyList))) {
	var body = car (bodyList);
	bodyList = cdr (bodyList);
	rle = cons (head, body);
	pushDB (rle);
    }
    console.log ("end rule ");
    return "nil";
};
function lvar (letter) { return list ("?", letter); };
function succeed () { return list (); };
function cut () { return "!"; };
function fail () { return "fail"; };
////
function query (goal) {
    clear_result ();
    prove6 (list (), goal, db, empty, 1, list (), db);
    var r = get_result ();
    return r;
}

var functor0 = list;
var functor1 = list;
var functor2 = list;
var head = list;
var bodies = list;
var body = list;
var goal = list;

      function execQuery () {
