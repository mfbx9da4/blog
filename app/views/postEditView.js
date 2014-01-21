App.PostEditView = Ember.TextField.extend({
	formBlurred: null, // passed to the view helper as formBlurred=controllerPropertyName
	change: function(evt) {
		// should save on ctrl + s
	},
	didInsertElement: function() {
		this.set('elementIsInserted', true);
		this._super();
	},
});
// {{view PostEdit value=article}}