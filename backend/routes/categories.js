const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all categories for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id }).sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new category
router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ user: req.user.id, name });

        if (existingCategory) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        const newCategory = new Category({
            user: req.user.id,
            name
        });

        const category = await newCategory.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a category by ID
router.put('/:id', auth, async (req, res) => {
    const { name } = req.body;

    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Ensure user owns the category
        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        category.name = name;

        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a category by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // Ensure user owns the category
        if (category.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await category.remove();

        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
