"use strict"

const Comment = require("../models/comment")
const Blog = require("../models/blog")

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Comment, {}, [{ path: "userId", select: "username image createdAt updatedAt" }])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Comment, {}, [{ path: "userId", select: "username image createdAt updatedAt" }]),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "jdkv52acav633sdv9s332v6s6",
                    "blogId": "jdkv52acav633sdv9s332v789",
                    "comment": "Test Comment"
                }
            }
        */
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
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */
        const data = await Comment.findOne({ _id: req.params.id }).populate([{ path: "userId", select: "username image createdAt updatedAt" }])

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "jdkv52acav633sdv9s332v6s6",
                    "blogId": "jdkv52acav633sdv9s332v789",
                    "comment": "Test Comment"
                }
            }
        */
        const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        const data = await Comment.updateOne(customFilter, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Comment.findOne({ _id: req.params.id }).populate([{ path: "userId", select: "username image createdAt updatedAt" }])
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */
        // const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        // const data = await Comment.deleteOne(customFilter)
        const data = await Comment.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}