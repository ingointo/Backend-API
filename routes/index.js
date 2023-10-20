var express = require('express');
var router = express.Router();
const { Medicine } = require('../models/medicine')

/* GET home page. */
router.get('/', function (req, res, next) {
  Medicine.find({}).then((medicines) => {
    // console.log (medicines)
    res.json(medicines);
  })
});
router.post('/add', (req, res) => {
  let medicine = new Medicine({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })
  console.log(req.body)
  medicine.save().then(function (doc) {
    console.log(doc._id)
  }).then(() => {
    res.json({ messge: 'Mediciine Added Succesfully' })
  }).catch(function (error) {
    console.log(error);
  });
})
router.put('/edit/:id', (req, res) => {
  let medicine = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }
  let query = {
    _id: req.params.id
  }
  Medicine.updateOne(query, medicine).then((doc) => {
    console.log(doc)
    res.json({ message: 'Medicine Updated successfully' })
  }).catch(err => console.log(err))
})
router.delete('/delete/:id', (req, res) => {
  let query = {
    _id: req.params.id
  }
  Medicine.deleteOne(query).then(() => {
    console.log('Deleted Successfully')
  }).then(() => {
    res.json({ message: "Medicine delete succesfully" })
  })
})
router.get('/search', (req, res) => {
  console.log('*************')
  let searchQuery = req.query.search
  console.log(searchQuery)
  Medicine.find({
    $or: [{ name: { $regex: searchQuery, $options: 'i' } },
    { description: { $regex: searchQuery, $options: 'i' } },
    { price: { $regex: searchQuery, $options: 'i' } }]
  }).then((searchResults) => {
    res.json(searchResults)
    console.log(searchResults)
  }).catch(err => console.log(err))
})

module.exports = router;
