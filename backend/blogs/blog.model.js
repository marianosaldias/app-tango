var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    idUser            : { type: String, required: true },
    state             : { type: String, required: true },
    city              : { type: String, required: true },
    title             : { type: String, required: true },
    introParagraph    : { type: String, required: true },
    paragraphs        : { type: String, required: true },
    date              : { type: String, required: false },
    lan               : { type: String, required: false },
    writer            : { type: String, required: true },
    email             : { type: String, required: true },
    tags              : { type: String, required: false }
}, 
{
  timestamps: true
});

//Export function to create "Blog" model class
module.exports = mongoose.model('Blog', BlogSchema);
