App.PostsCreateController = Ember.ObjectController.extend({
	actions: {
		save: function() {
			var cont = this

			// just before saving, we set the creationDate
			this.get('model').set('dateCreated', new Date());
			this.get('model').set('dateModified', new Date());

			// create a record and save it to the store
			var newPost = this.store.createRecord('post', this.get('model'));
			// console.log(this.get('model.length'))
			newPost.save().then(function () {
				cont.transitionToRoute('post', newPost)
			});
		}
	}
});