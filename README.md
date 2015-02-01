# npm2git
A command line utility to turn a node_module dependency into a git repository. npm2git will read the repository url from the dependency's package.json.

## Installation
```
npm install -g npm2git
```

## Usage
```
npm2git <package> [branch]
```

**Arguments**
* package: (required) The name of the package to turn into a git repo.
* branch: (optional) The name of the git branch to checkout in the repo. If not specified, and the current project uses a git url for this dependency it will use the branch specified there. Otherwise it will default to `master`.

**Options**
* -h, --help     output usage information
* -V, --version  output the version number
* -v, --verbose  verbose output

### Example
```
cd myproject
npm install
npm2git mydep develop
cd node_modules/mydep
git status
```
