const Comment = require('../models/comment.model');
const Post = require('../models/post.model');  


//Function to create a comment:
const createComment = async (req, res) => {
    const { content, post, author } = req.body;
    if (!await Post.findById(post)) {
        return res.status(404).json({ message: "Post not found" });
    }
    const newComment = new Comment({
        content,
        post,
        author
    });
    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating comment', error: error.message });
    }
};


//function to get all comments:
async function getAllComments(req, res) {
    try {
        const allComments = await Comment.find();
        res.json(allComments);
        } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

//function to get one comment:
async function getComment(req, res) {
    const commentId = req.params.id; 
    try {
        const comment = await Comment.findById(commentId);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ message: "Comment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

//function to delete a comment:
async function deleteComment(req, res) {
    const { id } = req.params;
    try {
        const result = await Comment.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

//function to update a comment:
async function updateComment(req, res) {
    const { id } = req.params;
    const { body } = req;
    if (!id || !body) {
        return res.status(400).json({
            error: "Please input both body and id"
        });
    }
        try {
            const updatedComment = await Comment.findByIdAndUpdate(id, body, { new: true });
            if (updatedComment) {
                res.status(200).json({
                    message: "Comment updated successfully",
                    updated_Comment: updatedComment
                });
            } else {
                res.status(404).json({ error: "Comment not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};

//function to get comment on specifik post:
async function getCommentsByPost(req, res) {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({ post: postId }).populate('author', 'firstName lastName');
        res.json(comments);  
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: "Error fetching comments", error: error });
    }
}


module.exports = {
    createComment,
    getAllComments,
    deleteComment,
    getComment,
    updateComment,
    getCommentsByPost,

};