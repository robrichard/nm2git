'use strict';

var run = require('./run');

var getPackageConfig = function (path) {
    return require(process.cwd() + path + '/package.json');
};

var findDep = function (packageConfig, packageName) {
    var deps = packageConfig.dependencies;
    var devDeps = packageConfig.devDependencies;

    return deps && deps[packageName] || devDeps && devDeps[packageName];
};

var helpers = module.exports = {
    getCurrentPackageConfig: function () {
        return getPackageConfig('');
    },
    getConfigForPackage: function (packageName) {
        var dir = '/node_modules/' + packageName;
        return getPackageConfig(dir);
    },
    getRepo: function (packageConfig) {
        var repository = packageConfig && packageConfig.repository;

        if (!repository || !repository.url || repository.type !== 'git') {
            throw new Error('No git repository in package.json');
        }

        return repository.url;
    },
    getDefaultBranch: function (packageName) {
        var currentPackageConfig = helpers.getCurrentPackageConfig();
        var versionString = findDep(currentPackageConfig, packageName);
        if (versionString && versionString.indexOf('#') !== -1) {
            return versionString.split('#')[1];
        }
    },
    getPackageDir: function (packageName) {
        return process.cwd() + '/node_modules/' + packageName;
    },
    runInPackageDir: function (packageName, options, cmd) {
        return run(cmd, helpers.getPackageDir(packageName), options);
    }
};