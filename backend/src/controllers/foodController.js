const { sample_foods, sample_tags } = require("../data.js");
const asyncHandler = require('express-async-handler');
const Food = require("../models/Food.js");
const router = require("express").Router();

router.get('/seed', asyncHandler(
    async (req, res) => {
        const foodsCount = await Food.countDocuments();
        if(foodsCount > 0) {
         res.send('Seed already done!')
         return;
        }
        await Food.create(sample_foods)
        res.send('Seed is done!')
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await Food.find()
      res.send(foods);
     }
));

router.get("/search/:searchTerm",asyncHandler(
    async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const foods = await Food.find({name: {$regex:searchRegex}})
      res.send(foods);   
}
));

router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await Food.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await Food.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))
  

  router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
      const foods = await Food.find({tags: req.params.tagName})
      res.send(foods);
    }
  ))
  
  router.get("/:foodId", asyncHandler(
    async (req, res) => {
      const food = await Food.findById(req.params.foodId);
      res.send(food);
    }
  ))


  router.post('/create', asyncHandler(
    async (req, res) => {
      const {name, price, tags, favorite,imageUrl,origins,cookTime} = req.body; 
      const newFood = {
        name,
        price,
        tags,
        favorite,
        imageUrl,
        origins,
        cookTime,
      }
      
     
       await Food.create(newFood);
    }
  ))
  


module.exports = router;