const { readdirSync } = require('fs')
const router        = require('express').Router();
const Strategy      = require("../oAuth2").Strategy;
const passport      = require("passport");
const session       = require("express-session");
const fetch         = require('node-fetch')
const config        = require('../Json/Config.json');
const DiscordOauth2 = require("discord-oauth2")
const oauth         = new DiscordOauth2();
const request       = require('request');
const Discord       = require('discord.js')
const socket        = require('socket.io-client')('https://canary.rooby.xyz')

passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

router.use(passport.initialize());
router.use(passport.session());

passport.use(new Strategy({ clientID: config.oauth2.clientID, clientSecret: config.oauth2.clientSecret, callbackURL: config.oauth2.callbackURL, scope: config.oauth2.scope, prompt: config.oauth2.prompt },
                          
    function(accessToken, refreshToken, profile, done) {
  
      process.nextTick(function() {

        return done(null, profile);
        
      });
    }
));

router.get("/discord/oauth2", passport.authenticate("discord", { scope: config.oauth2.scope, prompt: config.oauth2.prompt }), function(req, res) { });

router.get("/discord/callback", passport.authenticate("discord", { failureRedirect: "/" }), async function(req, res) {

  /*oauth.addMember({
    accessToken: req.user.accessToken,
    botToken: client.token,
    guildId: '733493162479452160',
    userId: req.user.id
  })*/

  res.redirect('/dashboard')

});

router.get('/', async(req, res) => {

  let info = await fetch("https://api-mutanin.gr14.repl.co/status")
  let avatar = await fetch('https://api-mutanin.gr14.repl.co/users/@me/avatar')
  let userm = await fetch('https://api-mutanin.gr14.repl.co/users/@me')

      info = await info.json()
      avatar = await avatar.json()
      userm = await userm.json()
      
  let user = req.user || null;

  let bot = {
    avatar: avatar,
    user: userm
  }

  res.render('index.ejs', { user, bot, info })

})

router.get('/convite', async(req, res) => {

  let info = await fetch("https://api-mutanin.gr14.repl.co/status")
  let avatar = await fetch('https://api-mutanin.gr14.repl.co/users/@me/avatar')
  let userm = await fetch('https://api-mutanin.gr14.repl.co/users/@me')

      info = await info.json()
      avatar = await avatar.json()
      userm = await userm.json()
      
  let user = req.user || null;

  let bot = {
    avatar: avatar,
    user: userm
  }

  res.render('invite.ejs', { user, bot, info })
})

router.get('/discord', async(req, res) => {

  let info = await fetch("https://api-mutanin.gr14.repl.co/status")
  let avatar = await fetch('https://api-mutanin.gr14.repl.co/users/@me/avatar')
  let userm = await fetch('https://api-mutanin.gr14.repl.co/users/@me')

      info = await info.json()
      avatar = await avatar.json()
      userm = await userm.json()
      
  let user = req.user || null;

  let bot = {
    avatar: avatar,
    user: userm
  }

  res.render('discord.ejs', { user, bot, info })
})

router.get('/comandos', async(req, res) => {

  let user = req.user || null;
  
  let avatar = await fetch('https://api-mutanin.gr14.repl.co/users/@me/avatar')
      avatar = await avatar.json()
      
  let userm = await fetch('https://api-mutanin.gr14.repl.co/users/@me')
      userm = await userm.json()
      
  let bot = {
    avatar: avatar,
    user: userm
  }
  
  let commands = await fetch('https://api-mutanin.gr14.repl.co/commands')
      commands = await commands.json()

  res.render('commands.ejs', { bot, user, commands, i: 0 })

})

router.get("/dashboard", async(req, res) => {

  let user = req.user || null;

  let avatar = await fetch('https://api-mutanin.gr14.repl.co/users/@me/avatar')
      avatar = await avatar.json()
      
  let userm = await fetch('https://api-mutanin.gr14.repl.co/users/@me')
      userm = await userm.json()
      
  let bot = {
    avatar: avatar,
    user: userm
  }
      
  if(user) {
    
    let guilds = await fetch(`https://api-mutanin.gr14.repl.co/users/${user.id}/guilds`, {
      method: "POST",
      body: JSON.stringify(user.guilds)
    })
        guilds = await guilds.json()

    res.render('guilds.ejs', { bot, user, guilds })

  } else {
    
    res.render('guilds.ejs', { bot, user })
    
  }
  
})

router.get("*", async(req, res) => {

  res.render('404.ejs')

})



module.exports = router;