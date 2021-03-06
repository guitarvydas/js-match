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

