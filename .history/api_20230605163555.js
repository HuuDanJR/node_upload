var express = require('express')
var body_parser = require('body-parser')
var cors = require('cors')
var app = express();
var router = express.Router();
var fs = require('fs');
var cmd = require('node-cmd');
var app = express();
var router = express.Router();
var path = require('path');
import ScreenConfigurator from '@novastar/screen';
import net, { findNetDevices } from '@novastar/net';
import serial, { findSendingCards } from '@novastar/serial';


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())
app.use(cors())
app.use('/api', router)

router.use((request, response, next) => {
    console.log('middleware!');
    next();
});

router.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log('app running port ' + port);


const ctrl = new ScreenConfigurator(session);
await ctrl.reload();

//FRONT END VIEw
app.use('/ui', router)
app.use(express.static('web_new/web'));
app.use(express.static('web_new/web/assets'));
app.use(express.static('web_new/web-staff'));
app.use(express.static('web_new/web-staff/assets'));
router.get('/client', (request, response) => {
    response.sendFile(path.resolve('./web_new/web/index.html'));
})





//Customer date frame 
router.route('/').get((req, res, next) => {
    try {
    // Call the `main()` function or execute other relevant code
    await main();
    
    // Send a response or perform other actions as needed
    res.json('/home');
  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
})


