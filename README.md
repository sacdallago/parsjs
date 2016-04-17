# parsjs

Tab-Separated-Values or Comma-Separated-Values to [ANYTHING] converter.

Thank to [Mr Data Converter](https://github.com/shancarter/mr-data-converter) for the initial input, this npm package contains:

1. A command line tool to convert files
2. A package that can be `required` to use the same functionalities as used in the `cli.js` script


## CLI

I needed a Command Line Interface (CLI) tool mainly, and that is what I've been putting most effort into creating.

To download the package, make sure you have `npm` and `node`, then execute:

```bash
npm install -g parsjs
```

After that the `parsjs` tool will be put in your `PATH` as Command Line tool.

`parsjs --help` for options:

```bash
me$ parsjs -help

  Usage: parsjs [options] <file>

  Options:

    -h, --help                             output usage information
    -n, --noHeadersProvided                Set headersProvided to false.
    -m, --downcastHeader                   Set downcastHeader to false.
    -k, --upcaseHeaders                    Set upcaseHeaders to true.
    -s, --fileName <fileName>              Set the output filename. If nothing is set, "parsyOutput" will be used
    -d, --delimiter <delimiter>            The delimiter: "comma" or "tab". Default is "auto" 
    -o, --outputDataType <outputDataType>  "as" - Actionscript
    						"asp" - ASP/VBScript
    						"html" - HTML
    						"json" - JSON - Properties  [DEFAULT]
    						"jsonArrayCols" - JSON - Column Arrays
    						"jsonArrayRows" - JSON - Row Arrays
    						"jsonDict" - JSON - Dictionary
    						"mysql" - MySQL
    						"php" - PHP
    						"python" - Python - Dict
    						"ruby" - Ruby
    						"xmlProperties" - XML - Properties
    						"xml" - XML - Nodes
    						"xmlIllustrator" - XML - Illustrator

```