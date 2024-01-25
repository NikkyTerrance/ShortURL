const router = require('express').Router();
const ShortUrl = require("../models/urls.model");
const Users = require("../models/user.model")
const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;

router.get('/:shortUrl',async (req, res)=> {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if (shortUrl == null ) return res.sendStatus(404);
  
    // shortUrl.clicks++
    // shortUrl.save();
  
    res.redirect(shortUrl.full)
  });

module.exports = router;
