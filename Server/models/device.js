const mongoose = require('mongoose');

//Schema of the images coming from RPI
const DeviceSchema = mongoose.Schema({
        Image: {
        type: String,
        required: true,
    },

        Image_ID: {
        type: String,
        required: true
    },

    create_data: {
        type: Date,
        default: Date.now
    }
});

const Device = module.exports = mongoose.model('Device',DeviceSchema);

module.exports.addDevice = (device, callback)=> {
    Device.create(device, callback);
}

module.exports.getDevices = (callback,limit) => {
    Device.find(callback).limit(limit);
}
