"use strict"

const router = require("express").Router()

const user = require("../controllers/user");
const { isLogin, isAdmin } = require("../middlewares/permissions")

router.route("/")
    .get(isAdmin, user.list)
    .post(user.create)

router.route("/:id")
    .get(isLogin, user.read)
    .put(isLogin, user.update)
    .patch(isLogin, user.update)
    .delete(isAdmin, user.delete)

module.exports = router