"use strict"

const router = require("express").Router()

const category = require("../controllers/category");
const { isAdmin } = require("../middlewares/permissions")

router.route("/")
    .get(category.list)
    .post(isAdmin, category.create)

router.route("/:id")
    .get(category.read)
    .put(isAdmin, category.update)
    .patch(isAdmin ,category.update)
    .delete(isAdmin ,category.delete)

module.exports = router