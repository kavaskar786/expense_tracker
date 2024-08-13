const express = require('express');
const Tag = require('../models/Tag');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tags for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const tags = await Tag.find({ user: req.user.id }).sort({ name: 1 });
        res.json(tags);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new tag
router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    try {
        const existingTag = await Tag.findOne({ user: req.user.id, name });

        if (existingTag) {
            return res.status(400).json({ msg: 'Tag already exists' });
        }

        const newTag = new Tag({
            user: req.user.id,
            name
        });

        const tag = await newTag.save();
        res.json(tag);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a tag by ID
router.put('/:id', auth, async (req, res) => {
    const { name } = req.body;

    try {
        let tag = await Tag.findById(req.params.id);

        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }

        // Ensure user owns the tag
        if (tag.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        tag.name = name;

        await tag.save();
        res.json(tag);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a tag by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);

        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }

        // Ensure user owns the tag
        if (tag.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await tag.remove();

        res.json({ msg: 'Tag removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
