"use strict"

const { mongoose } = require("../configs/dbConnection")

const BlogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            unique: true
        },

        title: {
            type: String,
            trim: true,
            required: true
        },

        content: {
            type: String,
            trim: true,
            required: true
        },

        image: {
            type: String,
            trim: true,
            required: true
        },

        isPublish: {
            type: Boolean,
            default: true
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],

        countOfVisitors: {
            type: Number,
            default: 0
        }
    },
    {
        collection: "blogs",
        timestamps: true
    }
)

BlogSchema.post('findOne', async function(doc) {
    if (doc) {
        doc.countOfVisitor += 1;
        await doc.save();
    }
});

BlogSchema.post('findById', async function(doc) {
    if (doc) {
        doc.countOfVisitor += 1;
        await doc.save();
    }
});

module.exports = mongoose.model("Blog", BlogSchema);