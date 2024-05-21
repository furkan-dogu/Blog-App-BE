"use strict"

const router = require("express").Router()

// User
router.use("/users", require("./user"))

// Token
router.use("/tokens", require("./token"))

// Auth
router.use("/auth", require("./auth"))

// Auth
router.use("/categories", require("./category"))

module.exports = router