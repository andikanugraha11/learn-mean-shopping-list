const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/item.model');

// @route   GET api/items
// @desc    get all Items
// @access  Public
router.get('/', (req,res)=>{
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create a post
// @access  Public
router.post('/', (req,res)=>{
    console.log(req.body.name)
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    delete an item
// @access  public
router.delete('/:id', (req,res)=>{
    Item.findById(req.params.id)
        .then(item => {
            item.remove().then(()=> res.json({
                success:true
            }))
        })
        .catch(err=> res.status(404).json({
            success: false,
            message : err
        }))
});
module.exports = router;