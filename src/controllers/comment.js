"use strict"

const Comment = require("../models/comment")
const Blog = require("../models/blog")

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Comment, {}, [{ path: "userId", select: "username image createdAt updatedAt" }])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Comment, {}, [{ path: "userId", select: "username image createdAt updatedAt" }]),
            data
        })
    },

    create: async (req, res) => {
        const data = await Comment.create(req.body)

        const blog = await Blog.findOne({ _id: data.blogId })
        blog.comments.push(data._id)
        await blog.save()

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        const data = await Comment.findOne({ _id: req.params.id }).populate([{ path: "userId", select: "username image createdAt updatedAt" }])

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        const data = await Comment.updateOne(customFilter, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Comment.findOne({ _id: req.params.id }).populate([{ path: "userId", select: "username image createdAt updatedAt" }])
        })
    },

    delete: async (req, res) => {
        const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        const data = await Comment.deleteOne(customFilter)

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}