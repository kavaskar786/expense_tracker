const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Tag', TagSchema);
