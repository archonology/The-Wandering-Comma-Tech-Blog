const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
const CommentTag = require('./CommentTag');

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
// Comment.belongsTo(Blog, {
//   foreignKey: "blog_id",
// });

//a blog hasMany comments
// Blog.hasMany(Comment, {
//   foreignKey: 'blog_id',
//   onDelete: 'CASCADE'
// });

//Blog belongs to many comments
Comment.belongsToMany(User, { through: CommentTag, foreignKey: "comment_id" });
User.belongsToMany(Comment, { through: CommentTag, foreignKey: "user_id" });

Comment.belongsToMany(Blog, { through: CommentTag, foreignKey: "comment_id" });
Blog.belongsToMany(Comment, { through: CommentTag, foreignKey: "blog_id" });

module.exports = { User, Blog, Comment, CommentTag };
