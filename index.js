/*
 *  Parsy
 *
 *  Created by Christian Dallago on 20160416 .
 */

/*jshint esversion: 6 */


const parser    = require(path.resolve(__dirname,'parser'));
const dataGridRenderer    = require(path.resolve(__dirname,'dataGridRenderer'));

module.exports = {
    parse : function(data, headersProvided, delimiter, downcastHeaders, upcaseHeaders){
        var headersProvided = headersProvided === undefined ? true : headersProvided;
        var delimiter = delimiter || "auto";
        var downcastHeader = downcastHeader === undefined ? true: downcastHeader;
        var upcaseHeaders = upcaseHeaders === undefined ? false: upcaseHeaders;
        return parser.parse(data, headersProvided , delimiter, downcastHeader, upcaseHeaders);
    },

    convert : function(dataGrid, headerNames, headerTypes, outputType, indent, newLine){
        var outputType = outputType || "json";
        var indent = indent || " ";
        var newLine = newLine || "\n";
        dataGridRenderer[outputType](dataGrid, headerNames, headerTypes, indent, newline);
    }
};