const mongoose = require('mongoose');

const pillSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
doza: {
        type: String,
        required: true
    },
start_date:{
    type: Date,
    required: true
},
condition:{
    type: String,
    required: true
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',//связь между двумя таблицами
}
});

const Pill = mongoose.model('Pill', pillSchema);
module.exports = Pill; 