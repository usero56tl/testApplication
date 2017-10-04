/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */

 global.timestamp = global.timestamp || new Date().getTime();
 global.productionJSNameTimestamp = '.tmp/public/min/production-' + global.timestamp + '.min.js';
 global.productionJSName = '.tmp/public/min/production.min.js';
 global.productionJSNameStar = '.tmp/public/min/**.min.js';
 global.productionCSSNameTimestamp = '.tmp/public/min/production-' + global.timestamp + '.min.css';
 global.productionCSSName = '.tmp/public/min/production.min.css';
 global.productionCSSNameStar = '.tmp/public/min/**.min.css';
 var toBeAdded = '?v=' + global.timestamp;

 module.exports = function(grunt) {

 	grunt.config.set('sails-linker', {
 		devJs: {
 			options: {
 				startTag: '<!--SCRIPTS-->',
 				endTag: '<!--SCRIPTS END-->',
 				fileTmpl: '<script src="%s"></script>',
 				appRoot: '.tmp/public'
 			},
 			files: {
 				'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
 				'views/**/*.html': require('../pipeline').jsFilesToInject,
 				'views/**/*.ejs': require('../pipeline').jsFilesToInject
 			}
 		},

 		devJsRelative: {
 			options: {
 				startTag: '<!--SCRIPTS-->',
 				endTag: '<!--SCRIPTS END-->',
 				fileTmpl: '<script src="%s"></script>',
 				appRoot: '.tmp/public',
 				relative: true
 			},
 			files: {
 				'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
 				'views/**/*.html': require('../pipeline').jsFilesToInject,
 				'views/**/*.ejs': require('../pipeline').jsFilesToInject
 			}
 		},

 		prodJs: {
 			options: {
 				startTag: '<!--SCRIPTS-->',
 				endTag: '<!--SCRIPTS END-->',
 				fileTmpl: '<script src="%s'+toBeAdded+'"></script>',
 				appRoot: '.tmp/public'
 			},
 			files: {
 				'.tmp/public/**/*.html': [productionJSNameStar],
 				'views/**/*.html': [productionJSNameStar],
 				'views/**/*.ejs': [productionJSNameStar]
 			}
 		},

 		prodJsRelative: {
 			options: {
 				startTag: '<!--SCRIPTS-->',
 				endTag: '<!--SCRIPTS END-->',
 				fileTmpl: '<script src="%s'+toBeAdded+'"></script>',
 				appRoot: '.tmp/public',
 				relative: true
 			},
 			files: {
 				'.tmp/public/**/*.html': [productionJSNameStar],
 				'views/**/*.html': [productionJSNameStar],
 				'views/**/*.ejs': [productionJSNameStar]
 			}
 		},

 		devStyles: {
 			options: {
 				startTag: '<!--STYLES-->',
 				endTag: '<!--STYLES END-->',
 				fileTmpl: '<link rel="stylesheet" href="%s">',
 				appRoot: '.tmp/public'
 			},

 			files: {
 				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
 				'views/**/*.html': require('../pipeline').cssFilesToInject,
 				'views/**/*.ejs': require('../pipeline').cssFilesToInject
 			}
 		},

 		devStylesRelative: {
 			options: {
 				startTag: '<!--STYLES-->',
 				endTag: '<!--STYLES END-->',
 				fileTmpl: '<link rel="stylesheet" href="%s">',
 				appRoot: '.tmp/public',
 				relative: true
 			},

 			files: {
 				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
 				'views/**/*.html': require('../pipeline').cssFilesToInject,
 				'views/**/*.ejs': require('../pipeline').cssFilesToInject
 			}
 		},

 		prodStyles: {
 			options: {
 				startTag: '<!--STYLES-->',
 				endTag: '<!--STYLES END-->',
 				fileTmpl: '<link rel="stylesheet" href="%s'+toBeAdded+'">',
 				appRoot: '.tmp/public'
 			},
 			files: {
 				'.tmp/public/index.html': [productionCSSNameStar],
 				'views/**/*.html': [productionCSSNameStar],
 				'views/**/*.ejs': [productionCSSNameStar]
 			}
 		},

 		prodStylesRelative: {
 			options: {
 				startTag: '<!--STYLES-->',
 				endTag: '<!--STYLES END-->',
 				fileTmpl: '<link rel="stylesheet" href="%s'+toBeAdded+'">',
 				appRoot: '.tmp/public',
 				relative: true
 			},
 			files: {
 				'.tmp/public/index.html': [productionCSSNameStar],
 				'views/**/*.html': [productionCSSNameStar],
 				'views/**/*.ejs': [productionCSSNameStar]
 			}
 		},

		// Bring in JST template object
		devTpl: {
			options: {
				startTag: '<!--TEMPLATES-->',
				endTag: '<!--TEMPLATES END-->',
				fileTmpl: '<script type="text/javascript" src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/jst.js'],
				'views/**/*.html': ['.tmp/public/jst.js'],
				'views/**/*.ejs': ['.tmp/public/jst.js']
			}
		},

		devJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		prodJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': [productionJSName]
			}
		},

		prodJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': [productionJSName]
			}
		},

		devStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		prodStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': [productionCSSName]
			}
		},

		prodStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': [productionCSSName]
			}
		},

		// Bring in JST template object
		devTplJade: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: 'script(type="text/javascript", src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/jst.js']
			}
		}
	});

grunt.loadNpmTasks('grunt-sails-linker');
};
