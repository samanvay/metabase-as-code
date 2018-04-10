const es6Modules = [];

require('babel-core/register')({
    ignore: function (filename) {
        if (filename.indexOf("node_modules") === -1 || es6Modules.some((es6Module) => filename.indexOf(es6Module) !== -1)) {
            return false;
        }
        return true;
    }
});