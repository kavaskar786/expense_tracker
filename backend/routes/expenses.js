const express = require('express');
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new expense
router.post('/', auth, async (req, res) => {
    const { summary, description, date, category, tags } = req.body;

    try {
        // Create a new expense
        const newExpense = new Expense({
            user: req.user.id,
            summary,
            description,
            date: date || Date.now(),
            category,
            tags
        });

        // Save the expense
        const expense = await newExpense.save();

        // Save category and tags if not already saved
        await Category.updateOne(
            { user: req.user.id, name: category },
            { user: req.user.id, name: category },
            { upsert: true }
        );

        await Promise.all(tags.map(tag => 
            Tag.updateOne(
                { user: req.user.id, name: tag },
                { user: req.user.id, name: tag },
                { upsert: true }
            )
        ));

        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all expenses for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get expense by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // Ensure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update an expense
router.put('/:id', auth, async (req, res) => {
    const { summary, description, date, category, tags } = req.body;

    try {
        let expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // Ensure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update the expense
        expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: { summary, description, date, category, tags } },
            { new: true }
        );

        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete an expense
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // Ensure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await expense.remove();

        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Duplicate an expense
router.post('/:id/duplicate', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // Ensure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const newExpense = new Expense({
            user: req.user.id,
            summary: expense.summary,
            description: expense.description,
            date: Date.now(),
            category: expense.category,
            tags: expense.tags
        });

        const duplicatedExpense = await newExpense.save();

        res.json(duplicatedExpense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Search expenses by summary, category, tags, or date range
router.get('/search', auth, async (req, res) => {
    const { summary, category, tags, startDate, endDate } = req.query;

    try {
        let query = { user: req.user.id };

        if (summary) {
            query.summary = { $regex: summary, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (tags) {
            query.tags = { $in: tags.split(',') };
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const expenses = await Expense.find(query).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
