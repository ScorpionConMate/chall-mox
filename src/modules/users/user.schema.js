const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
    cedula: Schema.Types.String,
    fullName: Schema.Types.String,
    career: Schema.Types.String,
    university: Schema.Types.String,
    state: Schema.Types.String,
    graduationYear: Schema.Types.Number,
    // Schema Mixed type allows to store any kind of data
    extraInfo: Schema.Types.Mixed,
    createdAt: Schema.Types.Date,
    updatedAt: Schema.Types.Date
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserSchema, UserModel };
