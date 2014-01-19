module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ''
            },
            libs:  {
                src: [
                    "libs/ace/ace.js",
                    "libs/ace/theme-monokai.js",
                    "libs/ace/mode-markdown.js",
                    "libs/Markdown.Converter.js",
                    "libs/Markdown.Editor.js",
                    "libs/Markdown.Sanitizer.js",
                    "libs/jquery/jquery-2.0.3.min.js",
                    "libs/jqueryui.js",
                    "libs/moment.min.js",
                    "libs/handlebars-1.1.2.js",
                    "libs/ember-1.2.0.js",
                    "libs/ember-data.js",
                    "style/js/bootstrap.min.js",
                    "libs/localstorage_adapter.js"
                ],
                dest: 'build/libs.js'
            },
            app: {
                // the files to concatenate
                src: [
                    'app.js',
                    'router.js',
                    'store.js',
                    'components/*.js',
                    'controllers/*.js',
                    'helpers/*.js',
                    'models/*.js',
                    'routes/*.js',
                    'views/*.js'
                ],
                dest: 'build/app.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'build/app.js',
                dest: 'build/app.min.js'
            },
            libs: {
                src: 'build/libs.js',
                dest: 'build/libs.min.js'
            }
        },
        jshint: {
            // define the files to lint
            files: ['<%= concat.app.src %>', 'server.js', 'Gruntfile.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'concat', 'uglify']
        }

    });
       
    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

};