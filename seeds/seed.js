const sequelize = require('../config/connection');
const { User, Blog, Comment, CommentTag } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
const commentTagData = require('./commentTagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  for (const commentTag of commentTagData) {
    await CommentTag.create({
      ...commentTag,
    });
  }

  process.exit(0);
};

seedDatabase();
