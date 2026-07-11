import ForumPost from '../models/ForumPost.js';

//Sabhi forum posts fetch karo,author ka naam aur role bhi
export const getForumPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().populate('author', 'name role');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Naya forum post create karna hai
export const createForumPost = async (req, res) => {
  try {
    const { author, content } = req.body;

    const post = new ForumPost({
      author,
      content
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
