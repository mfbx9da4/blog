App.Router.map(function() {
	this.resource('posts', function() {
		this.resource('post', {
				path: '/:post_id'
			}, function() {
				this.route('edit');
		});
		this.route('create');
	});
	this.resource('cv', function () {
		this.route('pt');
	});
	this.resource('about');
});