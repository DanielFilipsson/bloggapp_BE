const Express = require("express");
const { 
    registerUser,
    getAllUsers,
    getUser,
    deleteUser,
    loginUser,

} = require("../controllers/user.controller");

const authRouter = Express.Router();

authRouter.post("/register", registerUser)
authRouter.get("/getAllUsers", getAllUsers)
authRouter.get("/:id", getUser)
authRouter.delete("/:id", deleteUser)
authRouter.post("/login", loginUser)

module.exports = authRouter;