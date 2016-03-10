module.exports = function (settings) {
	var outputFile = settings.htmlRunnerFile || './js-unit-tests.html',
		templateFile = './js-unit-tests.html.template',
		templateModel = {
			testFiles: settings.files || [],
			initialScripts: settings.initialScripts || []
		},
		fs = require('fs'),
		exec = require('child_process').exec,
		handlebars = require('handlebars');
		
	var handlebars.registerHelper('toJSON', function(object){
		return new handlebars.SafeString(JSON.stringify(object));
	});
	
	fs.readFile(
		templateFile,
		'utf8',
		function (err, templateContent) {
			if (err)
				throw new Error('could not read template at: ' + templateFile);
			var template = handlebars.compile(templateContent);
			fs.writeFile(
				outputFile,
				template(templateModel),
				'utf8',
				function (err) {
					if (err)
						throw new Error('Could not write file ' + outputFile);
					exec(outputFile);
				});
		}
	)
}