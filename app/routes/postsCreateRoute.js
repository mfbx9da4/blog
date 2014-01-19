App.PostsCreateRoute = Ember.Route.extend({
	model: function() {
		// the model for this route is a new empty Ember.Object
		return Em.Object.create({});
	},
	// in this case (the create route), we can reuse the post/edit template
	// associated with the postsCreateController
	renderTemplate: function() {
		this.render('post.edit', {
			controller: 'postsCreate'
		});
	}
});