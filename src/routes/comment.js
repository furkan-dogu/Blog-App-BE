"use strict"

const router = require("express").Router()

const comment = require("../controllers/comment");
const { isLogin } = require("../middlewares/permissions");

router.route("/")
    .get(comment.list)
    .post(isLogin, comment.create);

router.route("/:id")
    .get(comment.read)
    .put(isLogin, comment.update)
    .patch(isLogin, comment.update)
    .delete(isLogin, comment.delete);

module.exports = router