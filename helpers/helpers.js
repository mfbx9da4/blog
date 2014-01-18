Ember.Handlebars.helper('formatDate', function(date) {
	return moment(date).fromNow();
});
Ember.Handlebars.helper('formatMarkdown', function(text) {
	window.converter = new Markdown.Converter();
	html = window.converter.makeHtml(text);
	return new Handlebars.SafeString(html);
});
Ember.Handlebars.helper('aceEditor', function() {
	setTimeout(function() {
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		var MarkdownMode = require("ace/mode/markdown").Mode;
	    editor.getSession().setMode(new MarkdownMode());
		var textarea = $('textarea[name="editor"]').hide();
		editor.getSession().setValue(textarea.val());
		editor.getSession().on('change', function() {
			textarea.val(editor.getSession().getValue()).trigger('change');
		});
	}, 2000)
});