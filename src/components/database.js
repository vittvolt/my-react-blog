'use strict';

const fs = require('fs');
const path = require('path');

// The database instance
class Database {
    constructor() {
        // Currently in-memory only
        // let Datastore = require('nedb');
        // this.db = new Datastore();

        // Array of actual
        // {title : ... , content : ...}
        this.posts = [];    // for now used for temporary storage

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

            let temp = { 'title': title, 'content': content, 'id': i };
            this.posts.push(temp);
        }
    }

    // The order is reversed in the posts array
    getPostContent(index) {
        return this.posts[this.posts.length - index - 1].content;
    }

    getPostTitle(index) {
        return this.posts[this.posts.length - index - 1].title;
    }

    getPostTitles() {
        var titles = [];
        this.posts.forEach((value, index) => {
            let temp = { 'title': value.title, 'index': value.id };
            titles.push(temp);
        });
        return titles;
    }
}

module.exports = Database;