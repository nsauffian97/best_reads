/*
This is this "Controller" in the MVC setup

We will add our routes here so the server knows what to render
*/

const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// Setting up route for the root - it takes the request and response
router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({createAt: 'desc'}).limit(10).exec()
    } catch {
        books = []
    }
    res.render('index', { books: books})
})

module.exports = router