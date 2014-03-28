exports.get_posts = function(db) {
    return function(req, res) {
        var collection = db.get('postcollection');

        collection.find({}, {}, function(e, docs) {
            if (docs.length) {
                docs.map(function (doc) {
                    fs.readFile(doc.filePath, {
                            encoding: 'utf-8'
                        }, function(err, data) {
                            if (err) throw err;
                            file_data = data.toString();
                            // sequentially delete temp, add it to db and then respond
                            // delete_temporary(add_to_db, respond);
                    });
                }
            }
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
            collection.insert(post, complete_insert);
        };
        var complete_count = function(err, count) {
            insert_post(count);
        };

        var post = req.body.post;

        if (!post.title || !post.article || !post.dateCreated || !post.dateModified) {
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
