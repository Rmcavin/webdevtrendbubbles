let tweets = require("./tweets")
let wordBank = {
                'React':0,
                'JQuery':0,
                'Angular':0,
                'Node':0,
                'Express':0,
                'D3':0,
                'Mongodb':0,
                'PostgresQL':0,
                'graphQL':0,
                'CSS':0,
                'HTML':0,
                'Javascript':0,
                'PHP':0,
                'Vue':0,
                'Ember':0,
                'Backbone':0}

module.exports = {
  getFreq: function() {
    return tweets.getBearer.then(response => {
      let bearerToken = response.data.access_token
      return tweets.getTweets(bearerToken).then(response => {
        let tweetCollection = {};
        for (tweet of response.data.statuses) {
          tweetCollection[tweet.id] = tweet.text
          for (word in wordBank) {
            let regex = new RegExp(word, "gi")
            let str = tweet.text;
            let count = str.match(regex);
            if (count !== null) {
              wordBank[word] += count.length;
            }
          }
        }
        return wordBank;
      }).catch( error => {
        console.error(error.message)
      })
    }).catch( error => {
      console.error(error.message)
    });
  }
}
