module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
	                style: 'compressed'
	            },
				files: [
		          {
		            expand: true,
		            cwd: 'source/',
		            src: ['**/*.scss'],
		            dest: 'css/',
		            ext: '.css',
		          },
		        ],
			}
		},
		uglify: {
		    dist: {
		      files:{
		     		'js/video-gallery.min.js': ['js/video-gallery.js']
		      },
		    }
		},
		imagemin: {                          
		    static: {                          
		      options: {                   
		        optimizationLevel: 3
		      },
		      files: {                         
		        'images/logo.png': 'images/logo.png'
		      }
		    },
		    dynamic: {                         
		      files: [{
		        expand: true,                  
		        cwd: 'images/',
		        src: ['**/*.{png,jpg,gif}'],   
		        dest: 'images/'                 
		      }]
		    }
		},
		bump: {
		  options: {
		  	files: ['package.json', 'bower.json'],
		    updateConfigs: ["pkg"],
		    commit: true,
		    commitMessage: 'Release v%VERSION%',
		    commitFiles: ['package.json'], // '-a' for all files
		    createTag: true,
		    tagName: 'v%VERSION%',
		    tagMessage: 'Version %VERSION%',
        	commitFiles: ["-a"],
        	push: false
		  }
		},
		watch: {
			css: {
				files: 'source/**/*.scss',
				tasks: ['sass'],
				options: { 
					spawn: false,
					livereload: true 
				},
			},
			scripts: {
			    files: 'js/**/*.js',
			    tasks: ['newer:uglify'],
			    options: { 
					spawn: false,
					livereload: true 
				},
			},
			images: {
		      files: ['images/**/*.{png,jpg,gif}'],
		      tasks: ['imagemin'],
		      options: {
		      spawn: false,
		      }
		    }
		}
	});
	//grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-bump');
	grunt.registerTask('default',['watch']);
}