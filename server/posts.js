exports.get_posts = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        collection.find({}, {}, function(e, docs) {
            res.send(200, {
                'posts': docs
            });
        });
    };
};

exports.get_post = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        collection.find({
            id: Number(req.params.id)
        }, {}, function(e, docs) {
            res.send(200, {
                'post': docs
            });
        });
    };
};

exports.add_post = function(db) {
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
        this.insert_post = function(count) {
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
            insert_post(count);
        };

        // Get our form values. These rely on the 'name' attributes
        var title = req.body.post.title;
        var article = req.body.post.article;
        var dateCreated = req.body.post.dateCreated;
        var dateModified = req.body.post.dateModified;

        if (!title || !article || !dateCreated || !dateModified) {
            res.send(404, 'hey, I am missing some info');
        }

        // Set our collection
        var collection = db.get('postcollection');
        var promise = collection.count({});
        promise.on('complete', complete_count);
    };
};

exports.update_post = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        var post = req.body.post;
        var id = Number(req.params.id);
        post.id = id;
        collection.findAndModify({
            id: id
        }, post, function(e, doc) {
            res.send(200, {
                'post': post
            });
        });
    };
};

exports.delete_post = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');
        var id = Number(req.params.id);
        collection.remove({
            id: id
        }, {}, function(e, doc) {
            res.send(200);
        });
    };
};
