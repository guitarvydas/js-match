#!/bin/bash
## run manually written version
echo "*** Running manual version ***"
cat support.js prolog.js preamble.js test.js postamble.js runit.js >full.js
node full.js

echo "*** Transpiling ***"
## transpiler: test.matcher --> test2.js
cat support.js prolog.js matcher.js semantics.js > full.js
node full.js --input=test.matcher >test2.js

echo "*** Running transpiled version ***"
## run transpiled version
cat support.js prolog.js preamble.js test2.js postamble.js runit.js >full.js
node full.js
