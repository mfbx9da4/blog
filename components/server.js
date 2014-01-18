var express = require('express');


var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

var posts = {
    0: {
        id: 0,
        title: 'Julien Knebel',
        article: 'Freelance web & print designer + front-end developer',
        dateCreated: 'Fri Aug 09 2013 15:13:16 GMT+0200 (CEST)'
    },
    2: {
        id: 2,
        title: 'Sponge Bob',
        article: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
        dateCreated: 'Fri Aug 07 2013 10:10:10 GMT+0200 (CEST)'
    },
    3: {
        id: 3,
        title: 'Julien Knebel',
        article: 'Freelance web & print designer + front-end developer',
        dateCreated: 'Mon Aug 17 2012 15:43:12 GMT+0200 (CEST)'
    },
    4: {
        id: 4,
        title: 'Sponge Bob',
        article: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
        dateCreated: 'Tue May 22 2013 12:12:12 GMT+0200 (CEST)'
    },
    5: {
        id: 5,
        title: 'Dean Winchester',
        article: ':)',
        dateCreated: 'Mon Jan 30 2013 12:12:12 GMT+0200 (CEST)'
    }
}


app.use(express.static(__dirname));


// list of post
app.get('/posts', function(req, res) {
    var postInArray = [];
    for (var postId in posts){
        postInArray.push(posts[postId])
    }
    res.send({posts:postInArray});
});


// get post by id
app.get('/posts/:id', function(req, res) {
    res.send({post:posts[req.params.id]});
});


// new post
app.post('/posts', function(req, res) {
    if (!!req.body.post.id && posts[req.body.post.id] == null){
        posts[req.body.post.id] = req.body.post;
        res.send("ok");
    }
    res.send("ko");
});


// update post
app.put('/posts/:id', function(req, res) {
    if (!!req.body.post.id && posts[req.body.post.id] != null){
        posts[req.body.post.id] = req.body.post;
        res.send("ok");
    }
    res.send("ko");
});

app.delete('/posts/:id', function(req, res) {
    if (!!req.params.id && posts[req.params.id] != null){
        delete posts[req.params.id];
        res.send("ok");
    }
    res.send("ko");
});


app.listen(8000);
console.log('Listening on port 8000...');