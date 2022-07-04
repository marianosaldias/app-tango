var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    idUser          : { type: String, required: true },
    state           : { type: String, required: true },
    city            : { type: String, required: true },
    profile         : { 
        type: String, 
        required: true, 
        enum: ['Master', 'Artist', 'Orchestra', 'Musician', 'Dj', 'Danceroom', 'School'] 
    },
    name            : { type: String, required: true },
    // Subtitle ex.: pianist, sculptor, photographer, etc.
    subtitle        : { type: String, required: false },
    phone           : { type: String, required: true },
    email           : { type: String, required: true },
    website         : { type: String, required: false },
    socialLink      : { type: String, required: false },
    resume          : { type: String, required: false },
    tags            : { type: String, required: false }
}, 
{
  timestamps: true
});

//Export function to create "Profile" model class
module.exports = mongoose.model('Profile', ProfileSchema);
