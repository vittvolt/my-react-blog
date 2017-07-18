'use strict';

const fs = require('fs');
const path = require('path');

// The database instance
class Database {
    constructor() {
        // Currently in-memory only
        let Datastore = require('nedb');
        this.db = new Datastore();

        // Map of posts meta info
        this.posts = new Map();    // for now used for temporary storage

        // Load the posts
        this.countPosts();
        this.loadPosts();
    }

    countPosts() {
        var self = this;
        let postsDir = path.resolve('dist', 'posts');
        let files = fs.readdirSync(postsDir);
        this.numOfPosts = files.length;
    }

    loadPosts() {
        for (var i = this.numOfPosts - 1; i >= 0; i--) {
            let mdfile = path.resolve('dist', 'posts', 'post' + i.toString() + ".md");
            let content = fs.readFileSync(mdfile, "utf8");

            let first_line = content.split('\n')[0];
            let title = first_line.substr(2);

            let temp = { 'title': title, 'brief': '...', 'index' : i };
            this.posts.set(i, temp);

            let postDbObj = { 'content': content, _id : i };
            this.db.insert(postDbObj, function(err, newDoc) {
                if (err) {
                    console.log('=== Boom! ===');
                    throw err;
                }
            });
        }
    }

    // The order is reversed in the posts array
    getPostContent(index, callback) {
        var self = this;
        this.db.find({ _id : parseInt(index) }, function(err, docs) {
            callback(docs[0].content);
        })
    }

    getPostTitle(index) {
        return this.posts.get(index).title;
    }

    getPostTitles() {
        var titles = [];
        for (var i = this.numOfPosts - 1; i >= 0; i--) {
            titles.push(this.posts.get(i))
        }
        return titles;
    }
}

module.exports = Database;