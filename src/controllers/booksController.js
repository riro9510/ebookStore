const booksModel = require('../models/booksModel')

async function insertMultipleBooks (req, res) {
  try {
    const booksList = req.body
    const newBookIds = await booksModel.insertMultipleBooks(booksList)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newBookIds: newBookIds })
  } catch {
    res.status(500).json({ error: 'Failed to add books' })
  }
}

module.exports = { insertMultipleBooks }