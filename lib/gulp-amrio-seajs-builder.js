var util = require('util')

var gulpUtil = require('gulp-util')
var through = require('through2')

var ModuleManager = require('amrio-seajs-builder').ModuleManager

var PLUGIN_NAME = 'gulp-amrio-seajs-bulder'

function gulpAsb(file, manager) {

    var meta = {
        id: file.relative,
        uri: file.path,
        code: file.contents.toString(manager.options.encoding || 'utf-8')
    }

    return manager.get(meta).then(function(module) {
        return new Buffer(module.result || '')
    })
}

module.exports = function(options) {

    var manager = new ModuleManager(options)

    manager.on('error', function (err) {
        gulpUtil.log(PLUGIN_NAME, err)
    })

    manager.on('warn', function (msg) {
        // gulpUtil.log(PLUGIN_NAME, msg)
    })

    return through.obj(function(file, enc, done) {

        if (file.isBuffer()) {
            gulpAsb(file, manager).then(function(result) {
                file.contents = result
                done(null, file)

            }).catch(function(err) {
                gulpUtil.log(PLUGIN_NAME, err.stack)
                done(null, file)
            })

        } else if (file.isNull()) {
            done()

        } else if (file.isStream()) {
            this.emit('error', new gulpUtil.PluginError(PLUGIN_NAME, 'Streaming not supported'))
            done()
            
        } else {
            done()
        }

    }, function(done) {
        gulpUtil.log(PLUGIN_NAME, util.format('Builded %s Modules', gulpUtil.colors.cyan(manager.count)))
        done()
    })
}
