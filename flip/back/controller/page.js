const Page = require('../model/page');
const { reset } = require('nodemon');
const shortid = require('shortid');
const Category = require('../model/category');

exports.createPage = async (req, res) => {
  console.log('Received data:', req.body); // Log received data

  const { banner, product } = req.files;
  const { title, description, category, type, createdBy } = req.body;

  let bannerImages = [];
  let productImages = [];
  if (banner && banner.length > 0) {
    bannerImages = banner.map((ban, index) => ({
      img: process.env.APP_API + '/public/pics/' + ban.filename,
      navigateTo: `/bannerClicked?categoryId=${category}&type=${type}`,
    }));
  }

  if (product && product.length > 0) {
    productImages = product.map((prod, index) => ({
      img: process.env.APP_API + '/public/pics/' + prod.filename,
      navigateTo: `/productClicked?categoryId=${category}&type=${type}`,
      name: req.body[`productName${index + 1}`], // Assuming the input field name is productName1, productName2, etc.
      price: req.body[`productPrice${index + 1}`], // Assuming the input field name is productPrice1, productPrice2, etc.
      description: req.body[`productPrice${index + 1}`],
    }));
  }

  try {
    // Check if a page with the same title and category already exists
    const existingPage = await Page.findOne({ title, category });

    if (existingPage) {
      return res.status(400).json({ message: 'Page with the same title and category already exists' });
    }

    // Create a new Page instance and save it to the database
    const newPage = new Page({
      title: title,
      description: description,
      banner: bannerImages,
      product: productImages,
      category,
      type,
      createdBy: req.user.userId,
    });

    const savedPage = await newPage.save();

    if (savedPage) {
      res.status(201).json({ page: savedPage });
    } else {
      res.status(400).json({ message: 'Failed to save page' });
    }
  } catch (error) {
    console.error('Error saving page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
exports.deleteAllPages = async (req, res) => {
    try {
        // Delete all pages from the database
        await Page.deleteMany({});

        res.status(200).json({ message: 'All pages deleted successfully' });
    } catch (error) {
        console.error('Error deleting all pages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getPageByCategoryAndType = async (req, res) => {
  try {
    const { category, type } = req.params;

    // Find the page with the specified category and type
    const foundPage = await Page.findOne({ category, type });

    if (foundPage) {
      res.status(200).json({ page: foundPage });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};