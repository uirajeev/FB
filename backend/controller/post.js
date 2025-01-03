import Post from '../models/post.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      'user',
      'first_name last_name picture username gender'
    ).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
