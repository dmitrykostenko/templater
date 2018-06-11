var through = require('through2'),
    templater = require('../web/templater.js'),
    jsdom = require('jsdom'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

const TEMPLATER = 'gulp-templater';
const { JSDOM } = jsdom;

function TemplaterPlugin(settings) {

    let stream = through.obj(function(file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(TEMPLATER, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            try {
                let str = file.contents.toString('utf8');
                const VDOM = new JSDOM(str);
                let result = templater.Templater(settings, VDOM);
                file.contents = new Buffer.from(result);
                return cb(null, file);
            } catch (err) {
                this.emit('error', new PluginError(TEMPLATER, err));
                return cb();
            }
        }

    });
    return stream;
}

module.exports = (settings) => TemplaterPlugin(settings);