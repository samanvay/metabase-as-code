#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1')
    .option('-u, --sourceUrl <sourceUrl>','Source URL')
    .option('-l, --sourceLogin login <sourceLogin>','Source Login')
    .option('-p, --sourcePassword password <sourcePassword>','Source Password')
    .option('-U, --targetUrl <targetUrl>','Target URL')
    .option('-L, --targetLogin <targetLogin>','Target Login')
    .option('-P, --targetPassword <targetPassword>','Target Password')
    .parse(process.argv); // end with parse to parse through the input


console.log(program.sourceUrl);
console.log(program.sourceLogin);
console.log(program.sourcePassword);
console.log(program.targetUrl);
console.log(program.targetLogin);
console.log(program.targetPassword);