const router = require('express').Router();
const Urls = require("../models/urls.model");
const Users = require("../models/user.model")
const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;


router.post('/', auth, async (req,res)=>{

    const id = req.userid;
    
    
    const newUrl = new Urls({full:req.body.fullURL, user: id})
    const savedUrl = await newUrl.save();
    console.log(savedUrl);

    res.json(savedUrl);
    
});

router.get('/', auth , async(req, res)=>{

    const id = req.userid;

    const allurl = await Urls.find({user : id});
    console.log(allurl)

    res.json(allurl)

});

router.get('/:shortUrl',auth, async (req, res)=> {
    const shortUrl = await Urls.findOne({short: req.params.shortUrl})
    if (shortUrl == null ) return res.sendStatus(404);
    res.json(shortUrl.full);
  
    // shortUrl.clicks++
    // shortUrl.save();
    // res.redirect(shortUrl.full);
  });





module.exports = router;