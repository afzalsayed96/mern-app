const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// collection and schema for Users
let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    collection: 'User'
});
UserSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('User', UserSchema);