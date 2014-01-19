App.Post = DS.Model.extend({
  title         : DS.attr('string'),
  article       : DS.attr('string'),
  dateCreated   : DS.attr('date'),
  dateModified  : DS.attr('date')
});