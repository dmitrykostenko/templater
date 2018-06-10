var through = require('through2'),
    gutil = require('gulp-util'),
    jsdom = require('jsdom'),
    _templater = require('./templater.js'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-templater';
const { JSDOM } = jsdom

function GulpTemplater(settings) {

    let stream = through.obj(function(file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {

            try {

                let str = file.contents.toString('utf8');

                const VDOM = new JSDOM(str);

                let result = _templater.Templater(settings, VDOM);

                file.contents = new Buffer.from(result);

                return cb(null, file);

            } catch (err) {
                this.emit('error', new PluginError(PLUGIN_NAME, err));
                return cb();
            }
        }

    });
    return stream;
}

module.exports = (settings) => GulpTemplater(settings);