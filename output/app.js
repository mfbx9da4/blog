window.App = Ember.Application.create();App.Router.map(function() {
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
});// App.ApplicationAdapter = DS.LSAdapter;
DS.Store.create({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    namespace: '',

    serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        },
        serializeId: function(id) {
            return id.toString();
        }
    })
  })
});

App.PostController = Ember.ObjectController.extend({
    // the deleteMode property is false by default
    deleteMode: false,
    actions: {
        delete: function() {
            // our delete method now only toggles deleteMode's value
            this.toggleProperty('deleteMode');
        },
        cancelDelete: function() {
            // set deleteMode back to false
            this.set('deleteMode', false);
        },
        confirmDelete: function() {
            // this tells Ember-Data to delete the current post
            this.get('model').deleteRecord();
            this.get('model').save();
            // and then go to the posts route
            this.transitionToRoute('posts');
            // set deleteMode back to false
            this.set('deleteMode', false);
        },
        // the edit method remains the same
        edit: function() {
            this.transitionToRoute('post.edit');
        }
    }
});App.PostEditController = Ember.ObjectController.extend({
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
App.PostsController = Ember.ArrayController.extend({
    sortProperties: ['id'],
    sortAscending: true, // false = descending
    postsCount: function(){
        return this.get('model.length');
    }.property('@each')
});App.PostsCreateController = Ember.ObjectController.extend({
	actions: {
		save: function() {
			var cont = this;

			// just before saving, we set the creationDate
			this.get('model').set('dateCreated', new Date());
			this.get('model').set('dateModified', new Date());

			// create a record and save it to the store
			var newPost = this.store.createRecord('post', this.get('model'));
			// console.log(this.get('model.length'))
			newPost.save().then(function () {
				cont.transitionToRoute('post', newPost);
			});
		}
	}
});Ember.Handlebars.helper('formatDate', function(date) {
    return moment(date).fromNow();
});
Ember.Handlebars.helper('formatMarkdown', function(text) {
    window.converter = new Markdown.Converter();
    html = window.converter.makeHtml(text);
    return new Handlebars.SafeString(html);
});
App.Post = DS.Model.extend({
  title         : DS.attr('string'),
  article       : DS.attr('string'),
  dateCreated   : DS.attr('date'),
  dateModified  : DS.attr('date')
});App.IndexRoute = Ember.Route.extend({
	redirect: function(){
		this.transitionTo('posts');
	}
});
App.PostEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('post');
    }
});App.PostRoute = Ember.Route.extend({
	model: function(params) { 
		return this.store.find('post', params.post_id);
	}
});
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
});App.PostsRoute = Ember.Route.extend({
    model: function() {
        var posts = this.store.find('post');
        return posts;
    }
});App.CvPtView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent: function() {
        $('.navbar-nav').find('.active').removeClass('active');
        $('.navbar-nav').find('.nav-cv').addClass('active');
    },
    templateName: 'cv/pt'
});
App.PostsView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent: function() {
        $('.navbar-nav').find('.active').removeClass('active');
        $('.navbar-nav').find('.nav-blog').addClass('active');
    },
    templateName: 'posts'
});
App.AboutView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent: function() {
        $('.navbar-nav').find('.active').removeClass('active');
        $('.navbar-nav').find('.nav-about').addClass('active');
    },
    templateName: 'about'
});
App.PostEditView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent: function() {
        setTimeout(function() {
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            var MarkdownMode = require("ace/mode/markdown").Mode;
            editor.getSession().setMode(new MarkdownMode());
            var textarea = $('textarea[name="editor"]').hide();
            editor.getSession().setValue(textarea.val());
            editor.getSession().setUseWrapMode(true);
            editor.getSession().on('change', function() {
                textarea.val(editor.getSession().getValue()).trigger('change');
            });
        }, 0);
        $('.post-container').removeClass('col-md-12');
        $('.post-container').addClass('col-md-6');
    },
    templateName: 'post/edit',
    willDestroyElement: function () {
        $('.post-container').addClass('col-md-12');
        $('.post-container').removeClass('col-md-6');
    }
});
