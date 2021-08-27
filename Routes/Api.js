const router = require('express').Router();
const fetch  = require('node-fetch')

router.get("/set/prefixo", async(req, res) => {

  let { prefix, guildID } = req.query;

  fetch(`https://api-mutanin.gr14.repl.co/guilds/${guildID}/prefixo`, {
    method: "POST",
    body: JSON.stringify({ prefix, guildID })
  }).then(result => {

    console.log(result)

  }).catch(err => {

    console.log(err)

  })
  
  res.status(200)

})

module.exports = router;