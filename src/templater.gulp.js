var through = require('through2'),
    Templater = require('./templater.js'),
    jsdom = require('jsdom'),
    gulputil = require('gulp-util'),
    PluginError = gulputil.PluginError,
    templatePlugin = 'gulp-templater',
    { JSDOM } = jsdom;

module.exports = (opt) => {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(Templater, 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {
            try {
                let str = file.contents.toString();
                const VDOM = new JSDOM(str);
                const document = VDOM.window.document;
                new Templater(opt, document);
                file.contents = new Buffer.from(document.documentElement.outerHTML);
                return cb(null, file);
            } catch (err) {
                this.emit('error', new PluginError(templatePlugin, err));
            }
        }
    });
};