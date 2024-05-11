
const Express = require("express");
const cors = require("cors");
const app = Express();
const authRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");


app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comments", commentRouter);



module.exports = app 