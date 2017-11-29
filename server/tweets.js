const axios = require('axios');
const dotenv = require('dotenv').load();
var key = process.env.TWITTER_CONSUMER_KEY; //'DuSVSiZZXrTN0wSckfs7F4HFD'
var secret = process.env.TWITTER_CONSUMER_SECRET; //'RHbZp4TU7tR2TTWyXxhQH5W4KFqSvGSzPyLqpIW9F0TNdsLDSX'
var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');
var token_url = 'https://api.twitter.com/oauth2/token';
let data_url = "https://api.twitter.com/1.1/search/tweets.json?q=%23webdev";
let bearerToken = "";
let tweetObj = {};

// const tweets = {
//   getTweets:
//
// axios({
//   url:token_url,
//   method:'POST',
//   headers: {
//     "Authorization": "Basic " + credentials,
//     "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
//   },
//   data: "grant_type=client_credentials"
// }).then( (response) => {
//   bearerToken = response.data.access_token;
//   axios({
//     url:data_url,
//     method:'GET',
//     headers: {
//       "Authorization":"Bearer " + bearerToken
//     }
//   }).then( (response) => {
//     tweetObj = response.data;
//     //console.log(tweetObj);
//     return tweetObj;
//     }, (reason) => {
//     console.error(reason.message)
//   })
// }, (reason) => {
//   console.error(reason.message)
// })
//
// console.log(tweetObj);

// for (tweet of tweetObj.statuses) {
//   console.log(tweet.text);
// }

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
