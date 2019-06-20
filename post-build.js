#!/usr/bin/env node
'use strict';

const fsys = require('fs');

function log(str) {
    console.log(str);
}
function logerror(str) {
    console.error(str);
}

function main() {
    log('.......... post-build started ..........');
    var aboutFile = 'dist/iclearn/assets/about.html';
    var stamp = (new Date()).toString();
    fsys.appendFileSync(aboutFile, '<div>' + stamp + '</div>');
    log('.......... post-build completed ..........');
}

main();