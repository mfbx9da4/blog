var express = require('express');

var app = express();

app.configure(function() {
    app.use(express.urlencoded());
    app.use(express.json());
});

var posts = require('./server/posts');
var debug = require('debug');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
// must export mongohq url
var db_url = process.env.MONGOHQ_URL || 'localhost:27017/nodetest1'
var db = monk(db_url);

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// CORS
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/posts', posts.get_posts(db));
app.get('/posts/:id', posts.get_post(db));
app.post('/posts', posts.add_post(db));
app.put('/posts/:id', posts.update_post(db));
app.delete('/posts/:id', posts.delete_post());


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
    debug('listening');
});