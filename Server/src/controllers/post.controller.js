const Post = require('../models/post.model'); 

//Function to create a post
const createPost = async (req, res) => {
    console.log(req.body);
    const { title, content, author } = req.body; 
    const newPost = new Post({
        title,
        content,
        author  
    });
    try {
        const savedPost = await newPost.save(); 
        res.status(201).json(savedPost); 
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error: error.message });
    }
};

//Function to get all posts:
async function getAllPosts(req, res) {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
        } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

//Function to get on post:
async function getPost(req, res) {
    const postId = req.params.id; 
    try {
        const post = await Post.findById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

//Function to delete a post:
async function deletePost(req, res) {
    const { id } = req.params;
    try {
        const result = await Post.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

//function to update a post:
async function updatePost(req, res) {
    const { id } = req.params; 
    const { body } = req;  
    if (!id || !body) {
        return res.status(400).json({
            error: "Please input both body and id"
        });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });
        if (updatedPost) {
            res.status(200).json({
                message: "Post updated successfully",
                updated_Post: updatedPost
            });
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    
};