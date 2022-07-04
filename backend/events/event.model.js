var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    idUser          : { type: String, required: true },
    state           : { type: String, required: true },
    city            : { type: String, required: true },
    zipCode         : { type: String, required: false },
    addressLat      : { type: Number, required: false },
    addressLng      : { type: Number, required: false },
    eventType       : { 
        type: String, 
        required: true, 
        enum: ['Milonga', 'Event', 'Fest', 'Class', 'MasterClass'] 
    },
    title           : { type: String, required: true },
    address         : { type: String, required: true },
    addressNumber   : { type: String, required: true },
    phone           : { type: String, required: true },
    email           : { type: String, required: true },
    website         : { type: String, required: false },
    socialLink      : { type: String, required: false },
    program         : { type: String, required: false },
    organizer       : { type: String, required: true },
    typeDate        : { type: String, required: false },
    eventDay        : { type: String, required: false },
    dateInit        : { type: String, required: false },
    dateEnd         : { type: String, required: false },
    timeInit        : { type: String, required: false },
    timeEnd         : { type: String, required: false }
}, 
{
  timestamps: true
});

//Export function to create "Event" model class
module.exports = mongoose.model('Event', EventSchema);
