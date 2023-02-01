const { Post } = require("../models");

const postData = [
    {
    title: "1 Music Near Me",
    content: "1 A mobile app that will send you notifications whenever a concert is playing in your area.",
    user_id: 1,
    },
    {
    title: "2 Music Near Me",
    content: "2 A mobile app that will send you notifications whenever a concert is playing in your area.",
    user_id: 2,
    },
    {
    title: "3 Music Near Me",
    content: "3 A mobile app that will send you notifications whenever a concert is playing in your area.",
    user_id: 3,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;