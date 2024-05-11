const Express = require("express");
const { 
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    
 } = require("../controllers/post.controller");

const postRouter = Express.Router();

postRouter.post("/post", createPost)
postRouter.get("/getAllPosts", getAllPosts)
postRouter.get("/:id", getPost)
postRouter.delete("/:id", deletePost)
postRouter.put("/:id", updatePost)


module.exports = postRouter;