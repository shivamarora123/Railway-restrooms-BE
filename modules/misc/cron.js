const cron = require('node-cron')
const config = require(__base + 'system/config.js')
const request = require('request')

const task = cron.schedule('*/29 * * * *', () => {
  request(config.settings.protocol+'://'+config.settings.host, (error, response, body) => {
    if(error) {
      console.log(error)
    }
    let current = {
      "body":body
    }
  }, false);
})

const runner = () => {
  if(process.env.host == 'heroku') {
    task.start()
  }
}

module.exports = runner()
