#!/usr/bin/env node

/*
 *  CLI for parsy
 *
 *  Created by Christian Dallago on 20160416 .
 */

/*jshint esversion: 6 */

const commander = require('commander');
const fs        = require('fs');
const path      = require('path');
const parser    = require(path.resolve(__dirname,'parser'));
const dataGridRenderer    = require(path.resolve(__dirname,'dataGridRenderer'));

commander
    .arguments('<file>')
    .option('-n, --noHeadersProvided', 'Set headersProvided to false.')
    .option('-m, --downcastHeader', 'Set downcastHeader to false.')
    .option('-k, --upcaseHeaders', 'Set upcaseHeaders to true.')
    .option('-s, --fileName <fileName>', 'Set the output filename. If nothing is set, "parsyOutput" will be used')
    .option('-d, --delimiter <delimiter>', 'The delimiter: "comma" or "tab". Default is "auto" ')
    .option('-o, --outputDataType <outputDataType>',
            '"as" - Actionscript\n' +
            '\t\t\t\t\t\t"asp" - ASP/VBScript\n' +
            '\t\t\t\t\t\t"html" - HTML\n' +
            '\t\t\t\t\t\t"json" - JSON - Properties  [DEFAULT]\n' +
            '\t\t\t\t\t\t"jsonArrayCols" - JSON - Column Arrays\n' +
            '\t\t\t\t\t\t"jsonArrayRows" - JSON - Row Arrays\n' +
            '\t\t\t\t\t\t"jsonDict" - JSON - Dictionary\n' +
            '\t\t\t\t\t\t"mysql" - MySQL\n' +
            '\t\t\t\t\t\t"php" - PHP\n' +
            '\t\t\t\t\t\t"python" - Python - Dict\n' +
            '\t\t\t\t\t\t"ruby" - Ruby\n' +
            '\t\t\t\t\t\t"xmlProperties" - XML - Properties\n' +
            '\t\t\t\t\t\t"xml" - XML - Nodes\n' +
            '\t\t\t\t\t\t"xmlIllustrator" - XML - Illustrator'
           )
    .action(function(file) {
    fs.readFile(file, 'utf8', function (error, data) {
        
        console.log("Parsing: " + file +
                    " as(auto/comma/tab) " + (commander.delimiter ? commander.delimiter : "auto") +
                    " saving to " + (commander.fileName ? commander.fileName : "parsyOutput") + "." + (commander.outputDataType ? commander.outputDataType : "json")
                   );
        
        var parseOutput = parser.parse(data, (commander.noHeadersProvided ? false : true) , (commander.delimiter ? commander.delimiter : "auto"), (commander.downcastHeader ? false : true), (commander.upcaseHeaders ? true : false));

        var dataGrid = parseOutput.dataGrid;
        var headerNames = parseOutput.headerNames;
        var headerTypes = parseOutput.headerTypes;
        var errors = parseOutput.errors;

        var outputText = dataGridRenderer[(commander.outputDataType ? commander.outputDataType : "json")](dataGrid, headerNames, headerTypes, "  ", "\n");

        var outputFile = fs.createWriteStream((commander.fileName ? commander.fileName : "parsyOutput") + "." + (commander.outputDataType ? commander.outputDataType : "json"));
        outputFile.once('open', function(fd) {
            outputFile.write(outputText);
            outputFile.end();
            console.log("Done.");
        });
        
        var errorFile = fs.createWriteStream("error.log");
        errorFile.once('open', function(fd) {
            errorFile.write(errors);
            errorFile.end();
        });
    });
})
    .parse(process.argv);