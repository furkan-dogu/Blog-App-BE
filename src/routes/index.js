"use strict"

const router = require("express").Router()

// User
router.use("/users", require("./user"))

// Token
router.use("/tokens", require("./token"))

// Auth
router.use("/auth", require("./auth"))

// Category
router.use("/categories", require("./category"))

// Blog
router.use("/blogs", require("./blog"))

// Comment
router.use("/comments", require("./comment"))

module.exports = router