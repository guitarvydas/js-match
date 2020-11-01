const semantics = grammar.createSemantics ();

semantics.addOperation(
    'transpile',
    {
	MatcherStatement: function (statements) {},
	Statement: function (statement, _period) {},
	
	ClearStatement: function (_clear) {},
	Rule: function (head, _eq, body) {},
	Fact: function (head) {},
	Query: function (_match, _lpar, expression, _rpar) {},

	BinaryRelation: function (relation, _lpar, subject, _comma, object, _rpar) {},
	UnaryRelation: function (relation, _lpar, subject, _rpar) {},
	NonaryRelation: function (relation) {},
	Relation: function (id) {},

	Subject: function (primary) {},
	Object: function (primary) {},

	Head: function (head) {},
	BinaryHead: function (id, _lpar, formal1, _comma, formal2, _rpar) {},
	UnaryHead: function (id, _lpar, formal, _rpar) {},
	NonaryHead: function (id) {},
	Body: function (expression) {},

	Formal: function (f) {},
	MatchExpression: function (factor, _or, orFactors) {},
	MatchFactor: function (atom, _and, andAtoms) {},
	MatchAtom: function (atom) {},
	Keyword: function (k) {},
	BinaryFunctor: function (id, _lpar, primary1, _comma, primary2, _rpar) {},
	UnaryFunctor: function (id, _lpar, primary, _rpar) {},
	NonaryFunctor: function (id) {},
	Primary: function (primary) {},
	identifier: function (lc, cs) {},
	logicVariable: function (uc, cs) {},
	lowerCaseLetter: function (c) {},
	upperCaseLetter: function (c) {},
	identLetter: function (c) {},

	_terminal: function () { return this.primitiveValue; }
    });
