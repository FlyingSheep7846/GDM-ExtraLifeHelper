'use strict'
const fs = require("fs")
const express = require('express')
const TiltifyClient = require("tiltify-api-client");

const CLIENT_ID = "5b104a563a40e71435b09a7f72fe5c8e311e8d312804612de63662c73af7e855";
const CLIENT_SECRET = "5966dc509b09128cb187613e79b3f8cdff96ff6fd5c981870ce3e42fc09927a6";
const FUNDRAISING_EVENT_ID = "5508e685-29f9-41fd-a5c3-ae94f0d5ede9";

const client = new TiltifyClient(CLIENT_ID, CLIENT_SECRET)
async function tiltify() {
    if (client.apiKey) return client;
    await client.initialize();
    return client;
};

// Create the express app
const app = express()

app.use(express.static(__dirname));

app.get("/", (req, res) => [
  res.sendFile(__dirname + "/ExtraLifeHelper.html")
])

app.get("/api", async (req, res) => {
  const client = await tiltify()
  client.Campaigns.get(FUNDRAISING_EVENT_ID, (data) => {
    res.json(data)
  })
})

// Start server
app.listen(3000, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:3000')
})
