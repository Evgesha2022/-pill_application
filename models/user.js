import mongoose  from 'mongoose';
const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
surname: {
        type: String,
        required: true
    },
birthday:{
    type: Date,
    required: true
}
}, {timestamps:true});
 


export default mongoose.model('User', userSchema);