"use strict"

const User = require("../models/user")
const Token = require("../models/token")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {
    
    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                    "image": "https://wwww......",
                    "bio": "test"
                }
            }
        */
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
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
        const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        const data = await User.findOne(customFilter)

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                    "image": "https://wwww......",
                    "bio": "test"
                }
            }
        */
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
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
        const data = await User.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}