const sequelize = require('../config/connection');

const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('DB syced')

  await seedUsers();
    console.log('users seeded')

  await seedPosts();
    console.log('posts seeded')

  await seedComments();
   console.log('comments seeded')

  process.exit(0);
};

seedAll();
