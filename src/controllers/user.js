"use strict"

const User = require("../models/user")
const Token = require("../models/token")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },

    create: async (req, res) => {
        req.body.isAdmin = false
        const data = await User.create(req.body)

        const tokenData = await Token.create({
            userId: data._id,
            token: passwordEncrypt(data._id + Date.now())
        })

        res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        })
    },

    read: async (req, res) => {
        const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        const data = await User.findOne(customFilter)

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        if(!req.user?.isAdmin) {
            delete req.body.isActive
            delete req.body.isAdmin
        }
        
        const data = await User.updateOne(customFilter, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await User.findOne(customFilter)
        })
    },

    delete: async (req, res) => {
        const data = await User.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}