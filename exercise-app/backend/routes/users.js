const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age)? Number(req.body.age): 10;
    const role = req.body.role?req.body.role:"user"; 
    
    console.log("has req")
    const newUser = new User({
      name,
      age,
      role
    });
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log(newUser)
});

module.exports = router;