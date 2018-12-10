const express = require('express');
const router = express.Router();

const Snippet = require('../models/Snippet');

router.get('/', async (req, res) => {
    const snippets = await Snippet.find();
    res.json(snippets);
});

router.get('/:id', async (req, res) => {
    const snippet = await Snippet.findById(req.params.id);
    res.json(snippet);
});

router.post('/', async (req, res) => {
    const snippet = new Snippet(req.body);
    await snippet.save();
    res.json({
        status: 'Snippet saved'
    });
});

router.put('/:id', async(req, res) => {
    await Snippet.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Snippet Updated'
    });
});

router.delete('/:id', async(req, res) => {
    await Snippet.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Snippet Deleted'
    })
});

module.exports = router;
