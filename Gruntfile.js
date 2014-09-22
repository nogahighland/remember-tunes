'use strict';

var
    LIVE_RELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({port: LIVE_RELOAD_PORT}),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    }

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.initConfig({
        watch: {
            options: {
                livereload: LIVE_RELOAD_PORT
            },
            html: {
                files: ['index.html', 'views/*.html'],
            },
            js: {
                files: ['js/**/*.js'],
            },
            css: {
                files: ['styles/*.css'],
            },
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, './')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%=connect.options.port%>'
            }
        }
    });
    grunt.registerTask('default', ['connect:livereload', 'open', 'watch']);
};
