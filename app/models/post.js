App.Post = DS.Model.extend({
  title         : DS.attr('string'),
  article       : DS.attr('string'),
  filePath      : DS.attr('string'),
  urlTitle      : DS.attr('string'),
  public		: DS.attr('boolean'),
  dateCreated   : DS.attr('date'),
  dateModified  : DS.attr('date')
});