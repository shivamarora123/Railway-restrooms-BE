var details={
     "database":{
    "url":"mongodb://test:test@ds145039.mlab.com:45039/railway-restrooms"

     },
    "Mail": {
    "host":"gmail",
        "username":"pietraman@piet.co.in",
        "password":"envisionsih18"
     }

}
const settings = {
    "protocol":"https",
    "host":"railway-restrooms.herokuapp.com",
    "port":3000,
    "verification":{
        "sms":false,
        "email":true
    },
    "salt":10
}


var config={
    details:details,
    settings:settings
}
module.exports=config