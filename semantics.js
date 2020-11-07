const semantics = grammar.createSemantics ();

semantics.addOperation(
    'transpile',
    {
	MatcherStatement: function (statements) { return statements.transpile ().join('\n'); },
	Statement: function (statement, _period) { return statement.transpile (); },
	
	ClearStatement: function (_clear) { return "clear();";},
	Rule: function (head, _eq, body) { return `rule (${head.transpile ()}, ${body.transpile ()});`;},
	Fact: function (head) { return `fact1 (${head.transpile ()});` },
	Query: function (_match, _lpar, expression, _rpar) { return `query(${expression.transpile ()});`;},

	BinaryRelation: function (relation, _lpar, subject, _comma, object, _rpar) { return relation.transpile () + subject.transpile () + object.transpile ();},
	UnaryRelation: function (relation, _lpar, subject, _rpar) { return relation.transpile () + " " + subject.transpile ();},
	NonaryRelation: function (relation) { return relation.transpile ();},
	Relation: function (id) { return id.transpile (); },

	Subject: function (primary) { return primary.transpile (); },
	Object: function (primary) { return primary.transpile (); },

	Head: function (head) { return head.transpile (); },
	BinaryHead: function (id, _lpar, formal1, _comma, formal2, _rpar) { return id.transpile () + " " + formal1.transpile () + ", " + formal2.transpile ();},
	UnaryHead: function (id, _lpar, formal, _rpar) { return id.transpile () + ", " + formal.transpile ();},
	NonaryHead: function (id) { return id.transpile ();},
	Body: function (expression) { return expression.transpile ();},

	Formal: function (f) { return f.transpile (); },
	MatchExpression: function (factor, _or, orFactors) { return factor.transpile () + "|" + orFactors.transpile ().join ("|");},
	MatchFactor: function (atom, _and, andAtoms) { return atom.transpile () + "&" + andAtoms.transpile ().join ("&");},
	MatchAtom: function (atom) { return atom.transpile (); },
	Keyword: function (k) { return k.transpile (); },
	BinaryFunctor: function (id, _lpar, primary1, _comma, primary2, _rpar) { return  id.transpile() + " " + primary1.transpile () + " " + primary2.transpile ();},
	UnaryFunctor: function (id, _lpar, primary, _rpar) { return id.transpile() + " " + primary.transpile ();},
	NonaryFunctor: function (id) { return id.transpile (); },
	Primary: function (primary) { return primary.transpile (); },
	identifier: function (lc, cs) { return `"${lc.transpile () + cs.transpile ().join('')}"`; },
	logicVariable: function (uc, cs) { 
	    return `lVar(${uc.transpile () + cs.transpile ().join('')})`; 
	},
	lowerCaseLetter: function (c) { return c.transpile (); },
	upperCaseLetter: function (c) { return c.transpile (); },
	identLetter: function (c) { return c.transpile (); },

	_terminal: function () { return this.primitiveValue; }
    });

if (parseTree.succeeded ()) {
    console.log (semantics (parseTree).transpile ());
};
