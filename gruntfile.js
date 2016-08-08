module.exports = function(grunt){
	grunt.initConfig({  //任务
		//pkg: grunt.file.readJSON('package.json')
		watch:{ //指定任务，该任务下有jade与js两个目标，实时监控项目
			jade: {
				files: ['views/**'],//传递所需监听的视图文件
				options: {   //指定覆盖内置属性的默认值,目标（target）级的平options将会覆盖任务级的options
					livereload: true //文件出现改动时重新启动服务
				}
			},
			js:{
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				options: {
					livereload: true
				}
			}
		},
		
		nodemon: {   //自动重启项目工程插件
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoresFiles:['README.md', 'node_modules/**',],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		
		concurrent: {
			tasks: ['nodemon', 'watch','less','uglify','jshint'],
			options: {
				logConcurrentOutput:true   //并发输出日志记录
			}
		},

		styles: {
        files: ['public/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['public/libs/**/*.js']
      },
      all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/build/index.css': 'public/less/index.less'
        }
      }
    },

    uglify: {
      development: {
        files: {
          'public/build/admin.min.js': 'public/js/admin.js',
          'public/build/detail.min.js': [
            'public/js/detail.js'
          	]
        	}
      	}
      }
    	
	});
	grunt.option('force', true);
	grunt.registerTask('default', ['concurrent']);
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-less')  //less的编译
  	grunt.loadNpmTasks('grunt-contrib-uglify') //js文件的压缩
  	grunt.loadNpmTasks('grunt-contrib-jshint') //jshint
}