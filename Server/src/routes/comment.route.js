const Express = require("express");
const { 
    createComment,
    getAllComments,
    deleteComment,
    getComment,
    updateComment,
    getCommentsByPost,

} = require("../controllers/comment.controller");

const commentRouter = Express.Router();

commentRouter.post("/", createComment);
commentRouter.get("/getAllComments", getAllComments)
commentRouter.delete("/:id", deleteComment)
commentRouter.get("/:id", getComment)
commentRouter.put("/:id", updateComment)
commentRouter.get("/post/:postId", getCommentsByPost);

module.exports = commentRouter;