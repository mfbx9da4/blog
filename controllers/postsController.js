App.PostsController = Ember.ArrayController.extend({
    sortProperties: ['id'],
    sortAscending: true, // false = descending
    postsCount: function(){
        return this.get('model.length');
    }.property('@each')
});