const express = require('express');
const router = express.Router();

const Colour = require('../models/Colour');

router.get('/', async (req, res) => {
    const colours = await Colour.find();
    res.json(colours);
});

router.get('/:id', async (req, res) => {
    const colour = await Colour.findById(req.params.id);
    res.json(colour);
});

router.post('/', async (req, res) => {
    const colour = new Colour(req.body);
    await colour.save();
    res.json({
        status: 'Colour saved'
    });
});

router.put('/:id', async(req, res) => {
    await Colour.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Colour Updated'
    });
});

router.delete('/:id', async(req, res) => {
    await Colour.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Colour Deleted'
    })
});

module.exports = router;
