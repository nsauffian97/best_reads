/*
This is this "Controller" in the MVC setup

We will add our routes here so the server knows what to render
*/

const express = require('express')
const router = express.Router()

// Setting up route for the root - it takes the request and response
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router