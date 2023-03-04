const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const controller = require('./controller');

const router =express();
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname,'public')));

router.get('/',controller.get);
router.post('/submit',controller.submit);

const server = router.listen(3000,'0.0.0.0',()=>{
    console.log('app running...');
})