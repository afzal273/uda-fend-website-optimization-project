module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var config = grunt.file.readYAML('gruntConfig.yaml');
    var mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        // resize images
        responsive_images: {
            // resize pizzeria image
            pizzeria: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 100,
                        quality: 80
                    }]
                },
                files: [{
                    expand: true,
                    src: 'pizzeria.jpg',
                    cwd: config.imgSrcDir,
                    dest: config.imgDir
                }]
            }
        },
        //copy html files with -src in file name before replacing with min versions of css/js
        copy: {
            html: {
                expand: true,
                flatten: true,
                src: 'index.html',
                dest: '',
                rename: function(dest, src) {
                    return dest + src.replace('.html', '-src.html');
                }
            }
        },
        //minify css
        cssmin: {
            options: {
                processImport: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: config.cssSrcDir,
                    src: ['*.css', '!*.min.css'],
                    dest: config.cssDir,
                    ext: '.min.css'
                }]
            }
        },
        //minify js
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: config.jsSrcDir,
                    src: ['*.js', '!*.min.js'],
                    dest: config.jsDir,
                    rename: function(dest, src) {
                        return dest + src.replace('.js', '') + '.min.js';
                    }
                }]
            }
        }
    });
    grunt.registerTask('default', ['responsive_images']);

};
