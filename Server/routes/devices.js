var express = require('express');
var router = express.Router();
const Devices = require("../models/device")  //acquiring the schema 
var base64 = require('base-64');
var fs = require('fs'); 

//Get API for listing all the images
router.get('/',(req,res,next)=>{
    Devices.getDevices((err, devices)=>{
        if(err){
            console.error(err)
            res.json({
                success:false,
                msg:"Some error"
            });
        }
        else {
            res.json({
                success:true,
                devices:devices
            });
        }
        
    });
});

//Post API to save the image
router.post('/',(req, res,next)=>{
    var newDevice = req.body;
    Devices.addDevice(newDevice, (err, device)=> {
        console.log("helloo - adding")
        if(err){
            console.error(err);
            res.json({
                success:false,
                msg: "some error"
            });
        }
        else
        {
            res.json({
                success:true,
                device:device
        });
        //This code is to check weather the image is coming correct or not 
        var encoded = newDevice.Image;
        var bytes = new Buffer(encoded, 'base64');

        fs.writeFile('public/images/receive_image.jpg', bytes,  function(err, callback) {
            if (err) {
               return console.error(err);
            }
            console.log("Data written successfully!");
           });
        }
    }); 
});  
 
module.exports = router;
