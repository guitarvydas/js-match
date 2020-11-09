// usage:
// npm install ohm-js
// npm install minimist
// node unity.js --input=top.html

const fs = require ('fs')
const ohm = require ('ohm-js')

// The grammar is simple - see MatcherStatement, Statement, ClearStatement, Fact, Rule and Query
// (the rest is just details)
const matcherGrammar = `
Matcher {
    MatcherStatement = Statement+
    Statement = (ClearStatement | Query | Rule | Fact) ";"
    
    ClearStatement = "clear"
    Rule = Head "=" (Body "|")* Body
    Fact = Head
    Query = "query" "(" MatchExpression ")"

    Subject = Primary
    Object = Primary

    Head = BinaryHead | UnaryHead | NonaryHead
    BinaryHead = identifier "(" Formal "," Formal ")"
    UnaryHead = identifier "(" Formal ")"
    NonaryHead = identifier
    Body = MatchExpression

    Formal = BinaryFunctor | UnaryFunctor | NonaryFunctor | logicVariable | identifier
    MatchExpression = MatchFactor
    MatchFactor = (MatchAtom "&")*  MatchAtom
    MatchAtom = Keyword | BinaryFunctor | UnaryFunctor | NonaryFunctor
    Keyword = kwCut | kwSucceed | kwFail
    kwCut = "cut"
    kwSucceed = "succeed"
    kwFail = "fail"
    BinaryFunctor = identifier "(" Primary "," Primary ")"
    UnaryFunctor = identifier "(" Primary ")"
    NonaryFunctor = identifier
    Primary = identifier | logicVariable
    identifier = lowerCaseLetter identLetter*
    logicVariable = upperCaseLetter identLetter*
    lowerCaseLetter = "a" .. "z"
    upperCaseLetter = "A" .. "Z"
    identLetter = lowerCaseLetter | upperCaseLetter | "0" .. "9" | "_" | "-"

}
`;


const grammars = ohm.grammars (matcherGrammar);
const grammar = grammars["Matcher"];
var args = require('minimist') (process.argv.slice (2));
var inputFilename = args['input'];
const input = fs.readFileSync("./" + inputFilename);
const parseTree = grammar.match (input);

if (parseTree.failed ()) {
    
    console.log ("Matching Failed")
    var tr = grammar.trace (input);
    console.log (tr.toString ());

} else {
    // console.log ("Matching Succeeded")
};

const semantics = grammar.createSemantics ();

semantics.addOperation(
    'transpile',
    {
	MatcherStatement: function (statements) { return statements.transpile ().join('\n'); },
	Statement: function (statement, _semicolon) { return statement.transpile (); },
	
	ClearStatement: function (_clear) { return "clearDB();";},
	Rule: function (head, _eq, bodies, _or, body) { 
	    var tr_head = head.transpile ();
	    if (bodies.children.length > 0) {
		var result = "";
		bodies.transpile ().forEach (orbody => {
		    result = result + `rule (head (${tr_head}), body (${orbody}));\n`;
		});
		return `${result}rule (head (${tr_head}), body (${body.transpile ()}));`;
	    } else {
		return `rule (head (${tr_head}), body (${body.transpile ()}));`;
	    }},
	Fact: function (head) { return `fact1 (${head.transpile ()});` },
	Query: function (_match, _lpar, expression, _rpar) { return `var result = query (goal (${expression.transpile ()}));`;},

	Subject: function (primary) { return primary.transpile (); },
	Object: function (primary) { return primary.transpile (); },

	Head: function (head) { return head.transpile (); },
	BinaryHead: function (id, _lpar, formal1, _comma, formal2, _rpar) { return `${id.transpile ()}, ${formal1.transpile ()}, ${formal2.transpile ()}`;},
	UnaryHead: function (id, _lpar, formal, _rpar) { return `${id.transpile ()}, ${formal.transpile ()}`;},
	NonaryHead: function (id) { return `${id.transpile ()}`;},
	Body: function (expression) { return expression.transpile ();},

	Formal: function (f) { return f.transpile (); },
	MatchExpression: function (factor) {
	    return factor.transpile ();
	},
	MatchFactor: function (andAtoms, _and, atom) { 
	    var result;
	    if (andAtoms.children.length > 0) {
		result = andAtoms.transpile ().join (", ") + ", " + atom.transpile ();
	    } else {
		result = atom.transpile ();
	    };
	    return result;
	},
	MatchAtom: function (atom) { return atom.transpile (); },

	Keyword: function (k) { return k.transpile (); },
	kwCut: function (_) { return "cut ()"; },
	kwSucceed: function (_) { return ""; },
	kwFail: function (_) { return "fail ()"; },

	BinaryFunctor: function (id, _lpar, primary1, _comma, primary2, _rpar) { return  "functor2 (" + id.transpile() + ", " + primary1.transpile () + ", " + primary2.transpile () + ")";},
	UnaryFunctor: function (id, _lpar, primary, _rpar) { return "functor1 (" + id.transpile() + ", " + primary.transpile () + ")";},
	NonaryFunctor: function (id) { return "functor0 (" + id.transpile () + ")"; },
	Primary: function (primary) { return primary.transpile (); },
	identifier: function (lc, cs) { return `"${lc.transpile () + cs.transpile ().join('')}"`; },
	logicVariable: function (uc, cs) { 
	    return 'lvar("' + uc.transpile () + cs.transpile ().join('') + '")'; 
	},
	lowerCaseLetter (c) { return c.transpile (); },
	upperCaseLetter: function (c) { return c.transpile (); },
	identLetter: function (c) { return c.transpile (); },

	_terminal: function () { return this.primitiveValue; }
    });

if (parseTree.succeeded ()) {
    console.log (semantics (parseTree).transpile ());
};
