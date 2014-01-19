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

var express = require('express');

var app = express();

app.configure(function() {
    app.use(express.urlencoded());
    app.use(express.json());
});

var debug = require('debug')
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/nodetest1');
var db = monk('mongodb://david:dave_adler123@linus.mongohq.com:10027/nodetest1');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(allowCrossDomain);

app.use(express.static(__dirname));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

get_posts = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        collection.find({}, {}, function(e, docs) {
            res.send(200, {
                'posts': docs
            });
        });
    };
}

// list of post
app.get('/posts', get_posts(db));

get_post = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        collection.find({
            id: Number(req.params.id)
        }, {}, function(e, docs) {
            res.send(200, {
                'post': docs
            });
        });
    }
}


// get post by id
app.get('/posts/:id', get_post(db));

var add_post = function(db) {
    return function(req, res) {
        var complete_insert = function(err, doc) {
            if (err) {
                // If it failed, return error
                res.send(403, 'There was a problem adding the information to the database.');
            } else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.send(201, {
                    'post': doc
                });
            }
        };
        var insert_post = function(count) {
            // Submit to the DB
            collection.insert({
                'title': title,
                'article': article,
                'dateCreated': dateCreated,
                'dateModified': dateModified,
                'id': count
            }, complete_insert);
        };
        var complete_count = function(err, count) {
            insert_post(count)
        };

        // Get our form values. These rely on the 'name' attributes
        var title = req.body.post.title;
        var article = req.body.post.article;
        var dateCreated = req.body.post.dateCreated;
        var dateModified = req.body.post.dateModified;

        if (!title || !article || !dateCreated || !dateModified) {
            res.send(404, 'hey, I am missing some info')
        }

        // Set our collection
        var collection = db.get('postcollection');
        var promise = collection.count({})
        promise.on('complete', complete_count);

    }
};

// new post
app.post('/posts', add_post(db));

var update_post = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        var post = req.body.post;
        var id = Number(req.params.id)
        post.id = id;
        collection.findAndModify({id: id}, post, function(e, doc) {res.send(200, {'post': doc})});
    }
}

// update post
app.put('/posts/:id', update_post(db));



app.delete('/posts/:id', function(req, res) {
    var collection = db.get('postcollection');
    var id = Number(req.params.id)
    collection.remove({id: id}, {}, function(e, doc) {res.send(200)});
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
    debug('listening');
});