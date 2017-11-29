const axios = require('axios');
const dotenv = require('dotenv').load();
var key = process.env.TWITTER_CONSUMER_KEY;
var secret = process.env.TWITTER_CONSUMER_SECRET;
var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');
var token_url = 'https://api.twitter.com/oauth2/token';
let data_url = "https://api.twitter.com/1.1/search/tweets.json?q=%23webdev";
let bearerToken = "";
let tweetObj = {};


module.exports = {
  getBearer: axios({
    url:token_url,
    method:'POST',
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    data: "grant_type=client_credentials"
  }),
  getTweets: function(bearer) {
    return axios({
        url:data_url,
        method:'GET',
        headers: {
          "Authorization":"Bearer " + bearer
        }
      })
  }
}
