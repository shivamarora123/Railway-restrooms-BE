const Nexmo = require('nexmo')
const config = require(__base + 'system/config.js')

const nexmo = new Nexmo({
  apiKey: config.details.Nexmo.key,
  apiSecret: config.details.Nexmo.secret
})

const sendSMS = (number, message) => {
  nexmo.message.sendSms(
    config.details.Nexmo.number, number, message, {type: 'unicode'},
    (err, responseData) => {if (responseData) {
      console.log(responseData)
    }
  });
}

module.exports = sendSMS
