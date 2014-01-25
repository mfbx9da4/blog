Ember.Handlebars.helper('formatDate', function(date) {
    return moment(date).fromNow();
});
Ember.Handlebars.helper('formatMarkdown', function(text) {
    window.converter = new Markdown.Converter();
    html = window.converter.makeHtml(text);
    return new Handlebars.SafeString(html);
});
