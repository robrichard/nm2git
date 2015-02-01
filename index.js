'use strict';

var fs = require('fs');
var colors = require('colors/safe');
var helpers = require('./lib/packageConfigHelpers');

module.exports = function (packageName, branch, options) {
    var repo;
    var packageConfig;
    var defaultBranch = helpers.getDefaultBranch(packageName);
    var run = helpers.runInPackageDir.bind(helpers, packageName, options);
    var runPartial = function (cmd) {
        return function () {
            return run(cmd);
        }
    };

    if (!packageName) {
        throw new Error('A package name is required');
    }

    packageConfig = helpers.getConfigForPackage(packageName);
    repo = helpers.getRepo(packageConfig);
    if (!branch) {
        if (defaultBranch) {
            branch = defaultBranch;
        } else {
            branch = 'master';
        }
        console.log(colors.cyan('Using branch ') + colors.bold.cyan('`' + branch + '`'));
    }
    branch = branch || helpers.getDefaultBranch(packageName);

    if (fs.existsSync(helpers.getPackageDir(packageName) + '/.git')) {
        throw new Error('There is already a .git directory.');
    }

    run('git init')
        .then(runPartial('git remote add origin ' + repo))
        .then(runPartial('git fetch'))
        .then(runPartial('git checkout -t origin/' + branch + ' -f'))
        .then(runPartial('git clean -f'));
};
