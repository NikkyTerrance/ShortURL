const router = require('express').Router();
const User = require("../models/user.model");
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');



//register new user
router.post("/", async (req, res) => {
   try {
      const { name, password, passwordverify } = req.body;

      if (!name || !password || !passwordverify)
         return res.status(400).json({errorMessage:"Please enter all the required fields."});
      
      if (password.length < 8 )
         return res.status(400).json({errorMessage:"Password should be more than 8 characters."});

      if (password !== passwordverify )
         return res.status(400).json({errorMessage:"Passwords do not match"});

      const existingUser = await User.findOne({name});

      if(existingUser)
         return res.status(400).json({errorMessage: "Username not available"});

      //hash passwords
      const salt = await bcrypt.genSalt();  
      const passwordHash = await bcrypt.hash(password,salt) ;

      //save new user to db

      const newUser = new User({
         name, passwordHash
      });

      const savedUser = await newUser.save();

      //sign token
      const token = jwt.sign({
         user: savedUser._id
      },process.env.JWT_SECRET);

      console.log(token);

      //send http only cookie with token

      res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "none"
      }).send();

      }
   catch (err) {
      console.error(err);
      res.status(500).send();
   }
});


//login existing user

router.post("/login", async(req,res)=>{
   try{
      const { name, password } = req.body;

      //validate credentials
      if (!name || !password )
         return res.status(400).json({errorMessage:"Please enter all the required fields."});

      const existingUser = await User.findOne({name});
      if(!existingUser)
         return res.status(401).json({errorMessage:"Wrong Username or password"});

      const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
      if(!passwordCorrect)
         return res.status(401).json({errorMessage:"Wrong Username or password"});
          
      //sign token
      const token = jwt.sign({
         user: existingUser._id
      },process.env.JWT_SECRET);

      console.log(token);

      //send http only cookie with token

      res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "none"
      }).send();

   }
   catch (err) {
      console.error(err);
      res.status(500).send();
   }

});


//logout user

router.get("/logout", (req,res)=>{
   res.cookie("token","",{
      httpOnly : true,
      secure: true,
         sameSite: "none",
      expires : new Date(0)
   }).send();
});

router.get("/loggedin" ,(req,res)=>{
   try{
      const token = req.cookies.token;

      if(!token) return res.json(false);
      
      jwt.verify(token, process.env.JWT_SECRET);
      res.send(true);
  }
  catch(err){
      console.error(err);
      res.json(false);
  }
});


module.exports = router; 
