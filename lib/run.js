'use strict';

var exec = require('child-process-promise').exec;
var colors = require('colors/safe');

module.exports = function (cmd, cwd, options) {
    var verbose = options && options.verbose;
    
    if (verbose) {
        console.log(colors.bold('\nRunning `' + cmd + '`'));
    }

    return exec(cmd, {cwd: cwd})
        .fail(function (err) {
            console.error(colors.bold.red('Error: ' + err.message));
            return err;
        })
        .progress(function (childProc) {
            if (verbose) {
                childProc.stdout.on('data', function (data) {
                    process.stdout.write(data.toString());
                });
                childProc.stderr.on('data', function (data) {
                    process.stdout.write(data.toString());
                });
            }
        });
};
