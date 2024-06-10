"use strict"

const { mongoose } = require('../configs/dbConnection')
const User = require("../models/user")
const Category = require("../models/category")
const Blog = require("../models/blog")
require("dotenv").config()

module.exports = async function() {

    return null

    // Deleted All Records:
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')

    /* Example Data */

    // Example User:
    const user = await User.create({
        username: "Admin",
        password: process.env.ADMIN_PASSWORD,
        email: process.env.ADMIN_EMAIL,
        firstName: process.env.ADMIN_FIRSTNAME,
        lastName: process.env.ADMIN_LASTNAME,
        isAdmin: true,
        image: "https://cdn.pixabay.com/photo/2023/07/04/19/43/man-8106958_1280.png",
        bio: "MERN Stack Developer"
    })

    // Example Categories:
    const categories = [
        'World',
        'Technology',
        'Design',
        'Culture',
        'Business',
        'Politics',
        'Science',
        'Health',
        'Style',
        'Travel',
    ]

    const now = new Date()
    for (let category of categories) {
        const categoryName = await Category.create({
            name: category
        })
    
        // Example Blogs
        for (let key in [...Array(1)]) {
            await Blog.create({
                userId: user._id,
                categoryId: categoryName._id,
                title: `Sample ${category} Post -${key}`,
                content: `
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique labore repellendus quibusdam consequuntur quae illum excepturi maxime expedita voluptatum, numquam rem distinctio pariatur magnam, voluptas odit reiciendis amet praesentium qui.
                Fugit dicta quos porro dolor, assumenda aperiam magnam sit eaque voluptate corporis. Facilis voluptatem ea aperiam eveniet hic atque ducimus doloribus, dolorem, vero labore porro earum, nostrum dolore vitae suscipit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique labore repellendus quibusdam consequuntur quae illum excepturi maxime expedita voluptatum, numquam rem distinctio pariatur magnam, voluptas odit reiciendis amet praesentium qui.
                Fugit dicta quos porro dolor, assumenda aperiam magnam sit eaque voluptate corporis. Facilis voluptatem ea aperiam eveniet hic atque ducimus doloribus, dolorem, vero labore porro earum, nostrum dolore vitae suscipit. </p>
                <div class="p-4 text-center"><img class="w-100" src="https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg"></div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique labore repellendus quibusdam consequuntur quae illum excepturi maxime expedita voluptatum, numquam rem distinctio pariatur magnam, voluptas odit reiciendis amet praesentium qui.
                Fugit dicta quos porro dolor, assumenda aperiam magnam sit eaque voluptate corporis. Facilis voluptatem ea aperiam eveniet hic atque ducimus doloribus, dolorem, vero labore porro earum, nostrum dolore vitae suscipit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique labore repellendus quibusdam consequuntur quae illum excepturi maxime expedita voluptatum, numquam rem distinctio pariatur magnam, voluptas odit reiciendis amet praesentium qui.
                Fugit dicta quos porro dolor, assumenda aperiam magnam sit eaque voluptate corporis. Facilis voluptatem ea aperiam eveniet hic atque ducimus doloribus, dolorem, vero labore porro earum, nostrum dolore vitae suscipit. </p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique labore repellendus quibusdam consequuntur quae illum excepturi maxime expedita voluptatum, numquam rem distinctio pariatur magnam, voluptas odit reiciendis amet praesentium qui.
                Fugit dicta quos porro dolor, assumenda aperiam magnam sit eaque voluptate corporis. Facilis voluptatem ea aperiam eveniet hic atque ducimus doloribus, dolorem, vero labore porro earum, nostrum dolore vitae suscipit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique labore repellendus quibusdam consequuntur quae illum excepturi maxime expedita voluptatum, numquam rem distinctio pariatur magnam, voluptas odit reiciendis amet praesentium qui.
                Fugit dicta quos porro dolor, assumenda aperiam magnam sit eaque voluptate corporis. Facilis voluptatem ea aperiam eveniet hic atque ducimus doloribus, dolorem, vero labore porro earum, nostrum dolore vitae suscipit. </p>
                `,
                image: "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg",
                isPublish: true,
                createdAt: now.getTime()
            })
        }
    }
    

    // End:
    console.log('* Synchronized *')
    /* Finished */

}