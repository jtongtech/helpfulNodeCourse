var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var md5 = require('md5');
var validator = require('validator');
var mongodbErrorHandler = require('mongoose-mongodb-errors');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        require: 'Please supply an email address'
    },
    name: {
        type: String,
        required: 'Please Supply a name!',
        trim: true
    },
    restPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.virtual('gravatar').get(function() {
    var hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);