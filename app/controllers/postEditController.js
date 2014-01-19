App.PostEditController = Ember.ObjectController.extend({
	actions: {
		save: function(){
			var cont = this;
			var post = this.get('model');
			this.get('model').set('dateModified', new Date());

			// this will tell Ember-Data to save/persist the new record
			post.save().then(function (data) {
				console.log(data);
				cont.transitionToRoute('post', post);
			});
		}
	}
});
