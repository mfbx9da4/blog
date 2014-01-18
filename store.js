// App.ApplicationAdapter = DS.LSAdapter;
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

