const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    password: { 
        type: String,
        required: true,
        validate: [
            {
                validator: function(value) {
                    return validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 1
                    });
                },
                message: 'Password must be stronger. It should have at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.'
            }
        ]
    },
    role: {
        type: String,
        default: 'user'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    }
});

// Hash the password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;