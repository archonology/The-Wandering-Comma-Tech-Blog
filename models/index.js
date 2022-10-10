const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//blogs belong to users
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

//a user hasMany blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//comments belong to blogs
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

//a blog hasMany comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment };
