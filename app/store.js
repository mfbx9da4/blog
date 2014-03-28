DS.Store.create({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    namespace: ''
  })
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id',
});

