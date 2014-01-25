App.CvPtView = Ember.View.extend({
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
