const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//blogs belong to users
Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: 'CASCADE'
});

//a user hasMany blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//comment belong to users
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//a user hasMany blogs
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//comment belong to users
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: 'CASCADE'
});

//a user hasMany blogs
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Blog, Comment };
