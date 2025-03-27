const mongoose = require('mongoose'); // ❌ Fix typo: 'requier' → 'require'

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
