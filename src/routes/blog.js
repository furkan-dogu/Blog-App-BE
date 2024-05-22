"use strict"

const router = require("express").Router()

const blog = require("../controllers/blog");
const { isLogin } = require("../middlewares/permissions")

router.route("/")
    .get(blog.list)
    .post(isLogin, blog.create)

router.route("/:id")
    .get(isLogin, blog.read)
    .put(isLogin, blog.update)
    .patch(isLogin, blog.update)
    .delete(isLogin, blog.delete)

module.exports = router