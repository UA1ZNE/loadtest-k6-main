#!/bin/bash
cd "$(dirname $0)"
docker run -i -t -v "$(pwd):/src" loadimpact/k6 run /src/smartvote-search.js
