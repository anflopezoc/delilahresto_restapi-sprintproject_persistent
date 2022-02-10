const express = require('express');
const router = express.Router();
const passport = require('passport');
const strategy_name = 'google';
require('dotenv').config()

router.get(`/${strategy_name}/auth`, passport.authenticate(strategy_name, { session:false,  scope: ['profile', 'email'] }));

router.get(`/${strategy_name}/callback`, 
  passport.authenticate(strategy_name, { session:false, failureRedirect: '/failed' }),
  function(req, res) {
    
    console.log(`Peticion get /${strategy_name}/callback `);
    const data = req.user
    console.log('Data:')
    console.log(data)
    const token = "hgjsd8fs6g7s7df67g6sdf43sdg2s3df5sg6s7df7"

    const url_front = process.env.URL_FRONT+`/?token=${token}`;

    res.redirect(301, url_front);

  });

module.exports = router;