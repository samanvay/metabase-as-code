#!/usr/bin/env node

const program = require('commander');

const migrate = require ('../src/migrate');

program
    .version('0.0.1')
    .option('-u, --sourceUrl <sourceUrl>','Source URL')
    .option('-l, --sourceLogin <sourceLogin>','Source Login')
    .option('-p, --sourcePassword <sourcePassword>','Source Password')
    .option('-d, --sourceDatabase <sourceDatabase>', 'Source Database name')
    .option('-U, --targetUrl <targetUrl>','Target URL')
    .option('-L, --targetLogin <targetLogin>','Target Login')
    .option('-P, --targetPassword <targetPassword>','Target Password')
    .option('-D, --targetDatabase <targetDatabase>', 'Target Database name')
    .parse(process.argv); // end with parse to parse through the input

migrate(program);