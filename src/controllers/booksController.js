const booksModel = require('../models/booksModel')

async function insertMultipleBooks(req, res) {
  try {
    const booksList = req.body
    const newBookIds = await booksModel.insertMultipleBooks(booksList)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ newBookIds: newBookIds })
  } catch {
    res.status(500).json({ error: 'Failed to add books' })
  }
}

/**
 * update item in the db based on id and collection
 */
async function updateBook(req, res) {
  try {
    const { id } = req.params
    const data = req.body
    const result = await booksModel.updateBook(id, data)
    if (result === 0) {
      res.status(404).json({ error: 'Book not found' })
    } else {
      res.status(201).json({ message: 'Book updated.' })
    }
  } catch {
    res.status(500).json({ error: 'Failed to update book.' })
  }
}

module.exports = { insertMultipleBooks, updateBook }
