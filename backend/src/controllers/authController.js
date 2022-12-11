const { sample_users } = require("../data.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt')

const router = require("express").Router();

router.get('/seed', asyncHandler(
    async (req, res) => {
        const userCount = await User.countDocuments();
        if(userCount > 0) {
         res.send('Seed already done!')
         return;
        }
        await User.create(sample_users)
        res.send('Seed is done!')
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email, password})
      
        if (user) {
          res.send(generateTokenResponse(user));
        } else {
          res.status(400).send({ message: "Incorrect email or password." });
        }
      }
      ));

      router.post('/register', asyncHandler(
        async (req, res) => {
          const {name, email, password, address} = req.body;
          const user = await User.findOne({email});
          if(user){
            res.status(HTTP_BAD_REQUEST)
            .send('User is already exist, please login!');
            return;
          }
      
          const encryptedPassword = await bcrypt.hash(password, 10);
      
          const newUser = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
          }
      
          const dbUser = await User.create(newUser);
          res.send(generateTokenResponse(dbUser));
        }
      ))
    
  
  const generateTokenResponse = (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "SECRET!",
      {
        expiresIn: "30d",
      }
    );
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  
  };
  

module.exports = router;