const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Admin'
  }
}, { timestamps: true });

// Generate slug before saving
postSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();

  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Post', postSchema);