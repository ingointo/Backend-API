var express = require("express");
var router = express.Router();
var { User } = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json('you must be logged in');
});
router.post("/signup", (req, res) => {
  console.log('&&&&&')
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.json('User Registration Successfully');
    });
});

router.post("/login", (req, res) => {
  console.log(req.body)
  let query = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne(query).then((login) => {
    // console.log(login)
    if (login) {
      req.session.username=login.username
      res.json('You successfully loggedIn You can go homepage now localhost:3000');
    } else {
      res.json('Your Logged in failed You Must logged in again');
    }
  });
});
router.get('/logout',(req,res)=>{
  req.session.username = null
  res.json('You logout successfully')
})

module.exports = router;
