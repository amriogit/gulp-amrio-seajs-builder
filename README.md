# gulp-amrio-seajs-builder

amrio-seajs-builder for gulp

如何使用：

``` bash
npm i --save gulp-amrio-seajs-builder
```

``` js
var gulpAsb = require('gulp-amrio-seajs-builder')

gulp.task('test', function() {
    return gulp.src('js/biz/**/*.js', {
            base: 'js',
            nodir: true
        })
        .pipe(gulpAsb({
            all: true,
            cwd: 'js',
            base: 'js/sea-modules',
            paths: {
                biz: './biz',
                amrio: './amrio'
            },
            uglify: {
                compress: {
                    global_defs: {
                        DEV: false
                    }
                }
            },
            exclude: function (id) {
                if (id.indexOf('/') === -1) {
                    return true
                }
            }
        }))
        .pipe(gulp.dest('dist'))
})
```

使用参数同 [amrio-seajs-builder](https://github.com/amriogit/amrio-seajs-builder)