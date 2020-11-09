#!/bin/bash
#!/bin/bash
echo "*** Transpiling ***"
## transpiler: test.matcher --> test2.js
cat matcher.js semantics.js >transpiler.js
node transpiler.js --input=test.matcher >transpiled.js

echo "*** Running transpiled version ***"
## run transpiled version
cat support.js prolog.js preamble.js transpiled.js postamble.js runit.js >transpiled-full.js
node transpiled-full.js
