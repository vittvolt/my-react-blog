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
        this.posts = [];

        // Load the posts
        this.countPosts();
        this.loadPosts();
    }

    countPosts() {
        var self = this;
        let postsDir = path.resolve('dist', 'posts');
        console.log(postsDir.toString());
        let files = fs.readdirSync(postsDir);
        this.numOfPosts = files.length;
    }

    loadPosts() {
        for (var i = 0; i < this.numOfPosts; i++) {
            let mdfile = path.resolve('dist', 'posts', 'post' + i.toString() + ".md");
            console.log(mdfile.toString());
            let content = fs.readFileSync(mdfile, "utf8");

            let first_line = content.split('\n')[0];
            let title = first_line.substr(2);

            let temp = { 'title': title, 'content': content };
            this.posts.push(temp);
        }
    }

    getPostContent(index) {
        return this.posts[index].content;
    }

    getPostTitle(index) {
        return this.posts[index].title;
    }

    getPostTitles() {
        var titles = [];
        this.posts.forEach((value, index) => {
            let temp = { 'title': value.title, 'index': index };
            titles.push(temp);
        });
        return titles;
    }
}

module.exports = Database;