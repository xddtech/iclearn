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
    var filePath = 'dist/iclearn/assets/about.html';
    var data = fsys.readFileSync(filePath);
    var json = JSON.parse(data.toString());

    var stamp = (new Date()).toString();
    json['build'] = stamp;

    fsys.writeFileSync(filePath, JSON.stringify(json));
   
    log('.......... post-build completed ..........');
}

main();