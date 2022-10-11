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

//comment belong to users
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//a user hasMany comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});



//THROUGH CommentTag to join the tables as needed
Comment.belongsToMany(User, { through: CommentTag, foreignKey: "comment_id" });
User.belongsToMany(Comment, { through: CommentTag, foreignKey: "user_id" });

Comment.belongsToMany(Blog, { through: CommentTag, foreignKey: "comment_id" });
Blog.belongsToMany(Comment, { through: CommentTag, foreignKey: "blog_id" });

module.exports = { User, Blog, Comment, CommentTag };
