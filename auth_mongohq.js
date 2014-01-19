var _posts = [{
    id: 0,
    title: 'Julien Knebel',
    article: 'Freelance web & print designer + front-end developer',
    dateCreated: 'Fri Aug 09 2013 15:13:16 GMT+0200 (CEST)',
    dateModified: 'Fri Aug 09 2013 15:13:16 GMT+0200 (CEST)'
}, {
    id: 1,
    title: 'Sponge Bob',
    article: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    dateCreated: 'Fri Aug 07 2013 10:10:10 GMT+0200 (CEST)',
    dateModified: 'Fri Aug 07 2013 10:10:10 GMT+0200 (CEST)'
}, {
    id: 2,
    title: 'Sponge Bob',
    article: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    dateCreated: 'Fri Aug 07 2013 10:10:10 GMT+0200 (CEST)',
    dateModified: 'Fri Aug 07 2013 10:10:10 GMT+0200 (CEST)'
}, {
    id: 3,
    title: 'Julien Knebel',
    article: 'Freelance web & print designer + front-end developer',
    dateCreated: 'Mon Aug 17 2012 15:43:12 GMT+0200 (CEST)',
    dateModified: 'Mon Aug 17 2012 15:43:12 GMT+0200 (CEST)'
}, {
    id: 4,
    title: 'Sponge Bob',
    article: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    dateCreated: 'Tue May 22 2013 12:12:12 GMT+0200 (CEST)',
    dateModified: 'Tue May 22 2013 12:12:12 GMT+0200 (CEST)'
}, {
    id: 5,
    title: 'Dean Winchester',
    article: ':)',
    dateCreated: 'Mon Jan 30 2013 12:12:12 GMT+0200 (CEST)',
    dateModified: 'Mon Jan 30 2013 12:12:12 GMT+0200 (CEST)'
}]

var insert_fixture_data = function () {
    var mongodb = require('mongodb');
    var monk = require('monk');
    var MONGOHQ_URL = 'mongodb://david:dave_adler123@linus.mongohq.com:10027/nodetest1';
    var db = monk(MONGOHQ_URL);
    var collection = db.get('postcollection');

    for (var i = 0; i < _posts; i ++) {
        var post = _posts[i];
        collection.insert(post, function (e, docs) {console.log(docs); console.log(e)});
    }
    
}
