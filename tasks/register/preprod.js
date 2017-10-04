module.exports = function (grunt) {
	grunt.registerTask('heroku:preprod', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'rename',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);

	grunt.registerTask('preprod',[])
};
