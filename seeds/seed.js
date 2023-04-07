const sequelize = require('../config/connection');
const { Post, User, Comments } = require('../models');
const postData = require('./postData.json');
const userData = require('./userData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
    });
  }

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
    });
  }

  process.exit(0);
};

seedDatabase();

module.exports = seedDatabase;