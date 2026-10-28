const express = require('express');
const router = express.Router();
const Library = require("../models/librarySchema");


router.get('/api/books', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const santPage = page < 1 ? 1 : page;
    const santLimit = limit < 1 ? 10 : limit;

    const skip = (santPage - 1) * santLimit;

    const books = await Library.find()
      .skip(skip)
      .limit(santLimit);

    const totalRecords = await Library.countDocuments();
    const records = Math.ceil(totalRecords / santLimit);

    if (books.length === 0) {
      return res.status(404).json({
        message: 'Records not found'
      });
    }

    res.status(200).json({
      success: true,
      metadata: {
        page: santPage,
        limit: santLimit,
        records,
        totalRecords
      },
      books
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching books',
      error: error.message
    });
  }
});


router.post('/api/books', async (req, res) => {
  try {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({
        message: 'Title, author, and category are necessary'
      });
    }

    const book = await Library.create({
      title,
      author,
      category
    });

    res.status(201).json({
      message: 'Book added successfully',
      book
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error adding book',
      error: error.message
    });
  }
});


router.patch('/api/books/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { available } = req.body;

    if (typeof available !== 'boolean') {
      return res.status(400).json({
        message: 'Available should be a boolean'
      });
    }

    const book = await Library.findByIdAndUpdate(
      id,
      { available },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        message: 'Book with that ID was not found'
      });
    }

    res.status(200).json({
      message: 'Book availability updated successfully',
      book
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error updating book availability',
      error: error.message
    });
  }
});


module.exports = router;