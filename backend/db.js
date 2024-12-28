const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://rishisulakhe:HuOo5OhvipdrNYOr@cluster0.6yvqu.mongodb.net/");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


const User = mongoose.model('User', userSchema);

module.exports = {
	User
};