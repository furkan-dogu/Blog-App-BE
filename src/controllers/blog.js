"use strict"

const Blog = require("../models/blog")

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Blog)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Blog),
            data
        })
    },

    create: async (req, res) => {
        const data = await Blog.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        const data = await Blog.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        const data = await Blog.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Blog.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        const data = await Blog.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },

    getLike: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Like Info"
        */

        const blog = await Blog.findOne({ _id: req.params.id });
    
        res.status(200).send({
            error: false,
            didUserLike: false,
            countOfLikes: blog.likes.length,
            likes: blog.likes,
        });
    },

    postLike: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Add/Remove Like"
        */
    
        const blog = await Blog.findOne({ _id: req.params.id });
        const didUserLike = blog.likes.includes(req.user.id);
    
        if (!didUserLike) {
            blog.likes.push(req.user.id);
            await blog.save();
    
            res.status(200).send({
                error: false,
                didUserLike: true,
                countOfLikes: blog.likes.length,
                likes: blog.likes,
            });
        } else {
            const likeUserId = blog.likes.find((item) => item == req.user.id);
            blog.likes.remove(likeUserId);
            await blog.save();
    
            res.status(200).send({
                error: false,
                didUserLike: false,
                countOfLikes: blog.likes.length,
                likes: blog.likes,
            });
        }
    }
}