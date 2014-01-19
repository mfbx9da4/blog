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
});