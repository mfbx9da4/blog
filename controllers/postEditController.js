App.PostEditController = Ember.ObjectController.extend({
	actions: {
		save: function(){
			var post = this.get('model');
			this.get('model').set('dateModified', new Date());

			// this will tell Ember-Data to save/persist the new record
			post.save();
			// then transition to the current post
			this.transitionToRoute('post', post);
		}
	}
});
